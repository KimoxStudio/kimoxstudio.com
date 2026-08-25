import "server-only";
import type { GitProvider } from "@kimoxstudio/core";

// How long to keep skipping the primary provider after it fails once, before
// trying it again. Avoids doubling request latency by re-attempting a call
// we already know is broken (e.g. a bad credential) on every single page hit
// while GitHub is down, but still self-heals shortly after it recovers —
// without needing a redeploy.
const RETRY_AFTER_FAILURE_MS = 30_000;

/**
 * Wraps a primary `GitProvider` (real GitHub) with a fallback (the on-disk
 * content stub, see `readTree` in `./config.ts`) so that when the primary
 * fails to *read* — bad/expired credentials, GitHub outage, rate limit,
 * network error — the PUBLIC site keeps rendering from the last-committed
 * content bundled in the deployment instead of 500ing.
 *
 * Deliberately asymmetric: only the read methods (`listBranches`,
 * `getBranch`, `readFile`, `listFiles`, `getCommitSha`) fall back. Every
 * write / mutation method (`createBranch`, `deleteBranch`, `writeFile`,
 * `openPR`, `mergeBranch`) always goes straight to the primary and is left
 * to fail loudly — `/admin` publishing edits must never appear to succeed
 * against the read-only, in-memory fallback. It genuinely needs a working
 * GitHub connection; that requirement does not get weaker here.
 */
export function createResilientGitProvider(primary: GitProvider, fallback: GitProvider): GitProvider {
  let retryAt = 0;

  function useFallback(where: string, err: unknown): void {
    retryAt = Date.now() + RETRY_AFTER_FAILURE_MS;
    console.warn(
      `[kx] git provider '${primary.id}' ${where} failed — serving the on-disk content ` +
        `fallback for public reads instead of a 500. This does NOT mean credentials are ` +
        `fine: the underlying GitHub connection still needs fixing (re-checking in ` +
        `${RETRY_AFTER_FAILURE_MS / 1000}s). Error:`,
      err,
    );
  }

  async function readWithFallback<T>(where: string, run: (p: GitProvider) => Promise<T>): Promise<T> {
    if (Date.now() < retryAt) return run(fallback);
    try {
      return await run(primary);
    } catch (err) {
      useFallback(where, err);
      return run(fallback);
    }
  }

  // Captured in a local so TS keeps the narrowed (non-optional) type inside
  // the closure below — `primary.onChange` accessed directly there would
  // still be typed as possibly-undefined.
  const primaryOnChange = primary.onChange;

  return {
    id: `resilient(${primary.id})`,

    listBranches: (opts) => readWithFallback("listBranches", (p) => p.listBranches(opts)),
    getBranch: (name) => readWithFallback("getBranch", (p) => p.getBranch(name)),
    readFile: (branch, path) => readWithFallback("readFile", (p) => p.readFile(branch, path)),
    listFiles: (branch, prefix) => readWithFallback("listFiles", (p) => p.listFiles(branch, prefix)),
    getCommitSha: (branch) => readWithFallback("getCommitSha", (p) => p.getCommitSha(branch)),

    // Writes: always the primary, never the fallback. See doc comment above.
    createBranch: (name, fromBranch) => primary.createBranch(name, fromBranch),
    deleteBranch: (name) => primary.deleteBranch(name),
    writeFile: (branch, path, content, opts) => primary.writeFile(branch, path, content, opts),
    openPR: (opts) => primary.openPR(opts),
    mergeBranch: (opts) => primary.mergeBranch(opts),

    onChange: primaryOnChange ? (callback) => primaryOnChange(callback) : undefined,
  };
}
