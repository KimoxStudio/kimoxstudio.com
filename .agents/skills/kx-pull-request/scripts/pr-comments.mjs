#!/usr/bin/env node
// Watch a pull request for review comments that ask for something, and
// answer them — through `gh`, so the agent spends its turns on the code and
// not on the API.
//
//   status [--pr n]                   the request, what is pending, what was answered, the rate limit
//   list   [--pr n]                   pending comments, as JSON
//   wait   [--pr n] [--timeout s]     block until one is pending; react 👀; print it
//   done   --id <id> --reply <file|-> post the reply, remove the 👀 (safe to repeat)
//
// Nothing is kept locally. In progress is our 👀 on the comment; handled is
// our reply under it. Both are read back from GitHub every time, so a run
// started after a crash, on another machine or a week later reports the
// same state — and `wait` hands back the comment that was in progress before
// anything new. A rate limit is waited out until it resets; a network
// failure is retried with a growing pause; both are said on stderr.
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import {
  normalise, reconcile, ourReaction, next, replyBody, classifyError, backoff, untilReset, parseArgs,
} from './comments.mjs'

const opts = parseArgs(process.argv.slice(2))
if (opts.help) fail(opts.usage, 0)
if (opts.error) fail(opts.error, 2)

/** One `gh` call, its failure read rather than thrown. */
function gh(args, input) {
  try {
    const output = execFileSync('gh', args, {
      encoding: 'utf8',
      stdio: [input === undefined ? 'ignore' : 'pipe', 'pipe', 'pipe'],
      timeout: 30_000,
      ...(input === undefined ? {} : { input }),
    }).trim()
    return { ok: true, output }
  } catch (err) {
    const output = `${err.stderr ?? ''}${err.stdout ?? ''}${err.message ?? ''}`.trim()
    return { ok: false, kind: classifyError(output), detail: output.split('\n')[0] ?? 'failed' }
  }
}

const parse = (r) => (r.ok ? { ok: true, data: JSON.parse(r.output || 'null') } : r)
const api = (method, path, body) =>
  parse(gh(['api', '-X', method, path, '--input', '-'], JSON.stringify(body ?? {})))
const paged = (path) => {
  const r = parse(gh(['api', '--paginate', '--slurp', path]))
  return r.ok ? { ok: true, data: r.data.flat() } : r
}

function fail(message, code = 1) {
  process.stderr.write(message + '\n')
  process.exit(code)
}
const say = (message) => process.stderr.write(`pr-comments: ${message}\n`)
const print = (value) => process.stdout.write(JSON.stringify(value) + '\n')
const sleep = (s) => new Promise((r) => setTimeout(r, s * 1000))

/** Where and who. Wrong once is wrong forever, so these are not retried. */
function must(r, what) {
  if (!r.ok) fail(`${what}: ${r.detail}`, r.kind === 'auth' ? 5 : 1)
  return r.output
}
const repo = must(gh(['repo', 'view', '--json', 'nameWithOwner', '-q', '.nameWithOwner']), 'not in a GitHub repository')
const pr = opts.pr ?? Number(must(gh(['pr', 'view', '--json', 'number', '-q', '.number']), 'no pull request for this branch; pass --pr'))
const me = must(gh(['api', 'user', '-q', '.login']), 'gh is not signed in')

const commentPath = (c) =>
  c.type === 'review' ? `repos/${repo}/pulls/comments/${c.id}` : `repos/${repo}/issues/comments/${c.id}`

/**
 * The whole picture, from GitHub: the request's state, what is pending
 * (with whether our 👀 is on it) and what was answered. One failure anywhere
 * is the snapshot's failure — half a picture would be read as "nothing
 * pending".
 */
function snapshot() {
  const state = api('GET', `repos/${repo}/pulls/${pr}`)
  if (!state.ok) return state
  const issue = paged(`repos/${repo}/issues/${pr}/comments`)
  if (!issue.ok) return issue
  const review = paged(`repos/${repo}/pulls/${pr}/comments`)
  if (!review.ok) return review

  const comments = [
    ...issue.data.map((c) => normalise(c, 'issue')),
    ...review.data.map((c) => normalise(c, 'review')),
  ]
  const { pending, handled } = reconcile(comments, me)

  // Whether the 👀 is ours needs the reactions themselves, and only for the
  // few pending comments that have any.
  for (const c of pending) {
    c.reaction = null
    if (c.eyes > 0) {
      const reactions = paged(`${commentPath(c)}/reactions`)
      if (!reactions.ok) return reactions
      c.reaction = ourReaction(reactions.data, me)
    }
    c.inProgress = c.reaction != null
  }

  return {
    ok: true,
    state: state.data.merged ? 'merged' : state.data.state,
    pending,
    handled,
  }
}

const shown = ({ id, type, kind, author, body, createdAt, url, path, line, inProgress }) => ({
  id, type, kind, author, body, createdAt, url,
  ...(path ? { path } : {}), ...(line != null ? { line } : {}), inProgress: inProgress === true,
})

function rateLimit() {
  const r = api('GET', 'rate_limit')
  if (!r.ok) return null
  const core = r.data.resources?.core ?? {}
  return { remaining: core.remaining, limit: core.limit, resetAt: core.reset ? new Date(core.reset * 1000).toISOString() : null }
}

if (opts.command === 'status') {
  const s = snapshot()
  if (!s.ok) fail(`could not read ${repo}#${pr} (${s.kind}): ${s.detail}`, s.kind === 'auth' ? 5 : 1)
  print({
    repo, pr, state: s.state, me,
    pending: s.pending.map(shown),
    handled: s.handled.map((c) => ({ id: c.id, kind: c.kind, author: c.author, url: c.url, reply: c.reply })),
    rateLimit: rateLimit(),
  })
}

if (opts.command === 'list') {
  const s = snapshot()
  if (!s.ok) fail(`could not read ${repo}#${pr} (${s.kind}): ${s.detail}`, s.kind === 'auth' ? 5 : 1)
  print(s.pending.map(shown))
}

if (opts.command === 'wait') {
  const deadline = Date.now() + opts.timeout * 1000
  let failures = 0

  for (;;) {
    const s = snapshot()

    if (!s.ok) {
      if (s.kind === 'auth' || s.kind === 'not-found') fail(`${s.kind}: ${s.detail}`, s.kind === 'auth' ? 5 : 1)
      let pause
      if (s.kind === 'rate-limit') {
        const reset = api('GET', 'rate_limit')
        pause = untilReset(reset.ok ? reset.data.resources?.core?.reset : null, Date.now(), deadline)
        say(`rate limited; waiting ${pause}s for it to reset`)
      } else {
        pause = Math.min(backoff(failures++, opts.interval), Math.max(0, Math.floor((deadline - Date.now()) / 1000)))
        say(`${s.kind}: ${s.detail}; retrying in ${pause}s`)
      }
      if (Date.now() >= deadline) { print({ timeout: true, lastError: s.detail }); process.exit(3) }
      await sleep(pause)
      continue
    }
    failures = 0

    if (s.state !== 'open') {
      print({ closed: true, state: s.state })
      process.exit(4)
    }

    const comment = next(s.pending)
    if (comment) {
      if (!comment.inProgress) {
        const reacted = api('POST', `${commentPath(comment)}/reactions`, { content: 'eyes' })
        if (!reacted.ok) {
          // Read again next round: the reaction may have landed despite the
          // answer, and reacting twice is what the snapshot exists to prevent.
          say(`could not react (${reacted.kind}): ${reacted.detail}; retrying`)
          await sleep(backoff(failures++, opts.interval))
          continue
        }
        comment.inProgress = true
      }
      print(shown(comment))
      process.exit(0)
    }

    if (Date.now() >= deadline) { print({ timeout: true }); process.exit(3) }
    await sleep(opts.interval)
  }
}

if (opts.command === 'done') {
  const text = opts.reply === '-' ? readFileSync(0, 'utf8') : readFileSync(opts.reply, 'utf8')
  if (!text.trim()) fail('the reply is empty')

  const s = snapshot()
  if (!s.ok) fail(`could not read ${repo}#${pr} (${s.kind}): ${s.detail}`, s.kind === 'auth' ? 5 : 1)

  // Safe to repeat: a reply already there is not posted twice, and a 👀
  // already gone is not looked for. A run that died between the two steps
  // finishes here.
  const already = s.handled.find((c) => c.id === opts.id)
  const comment = already ?? s.pending.find((c) => c.id === opts.id)
  if (!comment) fail(`no request ${opts.id} on ${repo}#${pr}`)

  let reply = already?.reply ?? null
  if (!reply) {
    const posted =
      comment.type === 'review'
        ? api('POST', `repos/${repo}/pulls/${pr}/comments/${comment.id}/replies`, { body: replyBody(comment, text) })
        : api('POST', `repos/${repo}/issues/${pr}/comments`, { body: replyBody(comment, text) })
    if (!posted.ok) fail(`could not reply (${posted.kind}): ${posted.detail}`, posted.kind === 'rate-limit' ? 6 : 1)
    reply = { id: posted.data.id, url: posted.data.html_url }
  }

  const reactions = paged(`${commentPath(comment)}/reactions`)
  const reaction = reactions.ok ? ourReaction(reactions.data, me) : null
  if (reaction != null) {
    const removed = gh(['api', '-X', 'DELETE', `${commentPath(comment)}/reactions/${reaction}`])
    if (!removed.ok) say(`replied, but the 👀 could not be removed (${removed.kind}); run done again`)
  }
  print({ id: comment.id, replied: reply.url, alreadyReplied: already != null })
}
