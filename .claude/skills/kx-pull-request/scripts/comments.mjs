// The part of pr-comments.mjs that has no side effects: what counts as a
// comment to act on, which of them are still pending, what a reply looks
// like, and how a failure is read. Kept apart so it can be tested without
// GitHub.
//
// There is no state of our own. A comment is in progress when it carries our
// 👀, and handled when our reply to it exists — both on GitHub, so a run
// that starts after a crash, on another machine, or a week later sees the
// same picture as the one that stopped.

/** The first word decides; nothing else about the comment does. */
const PREFIXES = [
  ['change:', 'change'],
  ['refactor:', 'refactor'],
  ['doubt:', 'doubt'],
]

/**
 * `'change' | 'refactor' | 'doubt' | null` for a comment body.
 *
 * Case-insensitive and tolerant of leading whitespace, because a reviewer
 * types on a phone. Strict about the colon: "changes:" and "change -" are
 * not a request, and reading them as one would act on words nobody meant
 * as an instruction.
 */
export function classify(body) {
  const head = String(body ?? '').trimStart().toLowerCase()
  for (const [prefix, kind] of PREFIXES) {
    if (head.startsWith(prefix)) return kind
  }
  return null
}

/**
 * One shape for the two kinds GitHub has: a comment on the conversation
 * (`issues/{n}/comments`) and a comment on the diff (`pulls/{n}/comments`).
 * `type` says which, because they are reacted to and replied to through
 * different endpoints. `eyes` is the count GitHub sends with the comment,
 * enough to know whether the reactions are worth a second call.
 */
export function normalise(raw, type) {
  const out = {
    id: raw.id,
    type,
    kind: classify(raw.body),
    author: raw.user?.login ?? '',
    body: raw.body ?? '',
    createdAt: raw.created_at ?? '',
    url: raw.html_url ?? '',
    eyes: raw.reactions?.eyes ?? 0,
  }
  if (type === 'review') {
    if (raw.path) out.path = raw.path
    if (raw.line != null) out.line = raw.line
    if (raw.in_reply_to_id != null) out.inReplyTo = raw.in_reply_to_id
  }
  return out
}

/** The first non-empty line, which is what a conversation reply quotes. */
export const firstLine = (body) =>
  String(body ?? '').split('\n').map((l) => l.trim()).find(Boolean) ?? ''

/**
 * The mark a conversation reply carries, naming what it answers. An HTML
 * comment, so it renders as nothing and reads as a fact: the quoted line
 * alone was ambiguous the moment two reviewers asked for the same thing in
 * the same words.
 */
export const marker = (id) => `<!-- kx-pr-comments: reply-to ${id} -->`

/**
 * Our reply to a comment, if it is there.
 *
 * On the diff a reply names its parent. On the conversation there are no
 * threads, so ours is the comment of ours carrying the mark `replyBody`
 * writes — this reads what that wrote.
 */
export function replyTo(comment, comments, me) {
  const ours = comments.filter((c) => c.author === me && c.id !== comment.id)
  if (comment.type === 'review') {
    return ours.find((c) => c.type === 'review' && c.inReplyTo === comment.id) ?? null
  }
  const mark = marker(comment.id)
  return ours.find((c) => c.type === 'issue' && c.body.includes(mark)) ?? null
}

/**
 * The picture, from GitHub alone: what is still to be done, oldest first,
 * and what was answered.
 *
 * Left out of both: comments with no prefix, our own — a reply of ours that
 * quotes a `change:` line would otherwise be picked up as a new request —
 * and replies inside a thread, which are conversation rather than
 * instruction.
 */
export function reconcile(comments, me) {
  const requests = comments
    .filter((c) => c.kind !== null)
    .filter((c) => c.author !== me)
    .filter((c) => c.inReplyTo == null)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))

  const pending = []
  const handled = []
  for (const c of requests) {
    const reply = replyTo(c, comments, me)
    if (reply) handled.push({ ...c, reply: { id: reply.id, url: reply.url, createdAt: reply.createdAt } })
    else pending.push(c)
  }
  return { pending, handled }
}

/** The id of our 👀 among a comment's reactions, or null. */
export function ourReaction(reactions, me) {
  return reactions.find((r) => r.content === 'eyes' && r.user?.login === me)?.id ?? null
}

/** The one pending comment to hand over: one already in progress first, so a restart resumes rather than skips. */
export function next(pendingList) {
  return pendingList.find((c) => c.inProgress) ?? pendingList[0] ?? null
}

/**
 * The body to post. A comment on the diff gets a threaded reply, so the body
 * stands alone. A comment on the conversation has no thread, so the reply
 * opens by quoting the line it answers — for the people reading — and ends
 * with the mark naming it — for the next run, which has to know what was
 * answered without anybody's memory.
 */
export function replyBody(comment, text) {
  const body = String(text).trim()
  if (comment.type === 'review') return body
  return `> ${firstLine(comment.body)}\n\n${body}\n\n${marker(comment.id)}`
}

/**
 * What a failed `gh` call means, from what it printed. Each answer is a
 * different wait: a rate limit ends at a known time, a network failure at an
 * unknown one, and the last two do not end on their own.
 */
export function classifyError(output) {
  const text = String(output ?? '')
  if (/rate limit|HTTP 429|abuse detection/i.test(text)) return 'rate-limit'
  if (/gh auth login|not logged|authentication|HTTP 401|Bad credentials/i.test(text)) return 'auth'
  if (/HTTP 404|Not Found|could not resolve to/i.test(text)) return 'not-found'
  if (/ENOTFOUND|ECONNRESET|ECONNREFUSED|ETIMEDOUT|timed out|no such host|TLS|network|HTTP 5\d\d|socket hang up/i.test(text)) return 'network'
  return 'other'
}

/** Seconds to wait before the next try after `attempt` failures, doubling from `base` up to `cap`. */
export const backoff = (attempt, base = 30, cap = 300) => Math.min(cap, base * 2 ** attempt)

/**
 * Seconds to sleep for a rate limit: until it resets, plus a little, and
 * never beyond what is left of the timeout. Sixty when the reset is unknown.
 */
export function untilReset(resetEpochSeconds, nowMs, deadlineMs) {
  const left = Math.max(0, Math.floor((deadlineMs - nowMs) / 1000))
  if (!resetEpochSeconds) return Math.min(60, left)
  const wait = Math.max(0, resetEpochSeconds - Math.floor(nowMs / 1000)) + 5
  return Math.min(wait, left)
}

const USAGE = `usage: pr-comments.mjs <status|list|wait|done> [--pr <n>] [--id <comment>] [--reply <file|->]
                       [--interval <s>] [--timeout <s>]

  status  the request, what is pending, what was answered, the rate limit
  list    what is pending, as JSON
  wait    block until one is pending; react 👀; print it   (exit 3 on timeout, 4 when the request is closed)
  done    post the reply, remove the 👀                    (safe to repeat)`

export function parseArgs(argv) {
  if (argv.includes('--help') || argv.includes('-h')) return { help: true, usage: USAGE }
  const [command, ...rest] = argv
  const opts = { command: command ?? '', pr: null, id: null, reply: null, interval: 30, timeout: 1800 }
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i]
    const value = rest[i + 1]
    if (arg === '--pr') { opts.pr = Number(value); i++ }
    else if (arg === '--id') { opts.id = Number(value); i++ }
    else if (arg === '--reply') { opts.reply = value ?? null; i++ }
    else if (arg === '--interval') { opts.interval = Number(value); i++ }
    else if (arg === '--timeout') { opts.timeout = Number(value); i++ }
    else return { error: `unknown argument: ${arg}\n${USAGE}` }
  }
  if (!['status', 'list', 'wait', 'done'].includes(opts.command)) return { error: USAGE }
  if (opts.command === 'done' && (!opts.id || !opts.reply)) return { error: `done needs --id and --reply\n${USAGE}` }
  return opts
}
