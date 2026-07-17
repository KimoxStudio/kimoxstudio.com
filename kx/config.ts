import "server-only";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { createCredentialsAuthProvider, createMemoryRateLimiter } from "@kx/auth";
import { createMemoryCache } from "@kx/cache-memory";
import type { KxConfig } from "@kx/core";
import { createStubGitProvider } from "@kx/git-provider-stub";
import { registry } from "./registry";

// globalThis singletons — Next dev/HMR bundles each route handler as its own
// module instance; without this, every endpoint gets separate in-memory state.
type GlobalKx = {
  __kxGit?: ReturnType<typeof createStubGitProvider>;
  __kxCache?: ReturnType<typeof createMemoryCache>;
  __kxRateLimiter?: ReturnType<typeof createMemoryRateLimiter>;
  __kxAuth?: ReturnType<typeof createCredentialsAuthProvider>;
};
const g = globalThis as unknown as GlobalKx;

// Seed the in-memory stub from the on-disk content/ tree at boot, so
// documents are normal files in the repo and survive restarts. NOTE: this
// reads the WHOLE content/ dir, which also contains the blog's markdown
// posts (content/posts/*.md) and content/site/*.json — harmless extra keys
// the kx loader ignores; only content/pages/* and content/globals/* are read.
function readTree(dir: string, prefix: string): Record<string, string> {
  const out: Record<string, string> = {};
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    const rel = `${prefix}/${entry}`;
    const s = statSync(full);
    if (s.isDirectory()) Object.assign(out, readTree(full, rel));
    else if (s.isFile()) out[rel] = readFileSync(full, "utf8");
  }
  return out;
}
const seedFiles = readTree(join(process.cwd(), "content"), "content");

const git = g.__kxGit ?? (g.__kxGit = createStubGitProvider({ branches: { main: seedFiles } }));
const cache = g.__kxCache ?? (g.__kxCache = createMemoryCache({ maxItems: 200 }));
const rateLimiter =
  g.__kxRateLimiter ??
  (g.__kxRateLimiter = createMemoryRateLimiter({ points: 10, durationMs: 60_000 }));

const sessionSecrets = [
  { id: "v1", value: process.env.KX_SESSION_SECRET ?? "dev-session-secret-do-not-use-in-prod" },
];
const cookieSecrets = [
  { id: "v1", value: process.env.KX_COOKIE_SECRET ?? "dev-cookie-secret-do-not-use-in-prod" },
];

const auth =
  g.__kxAuth ??
  (g.__kxAuth = createCredentialsAuthProvider({
    user: process.env.KX_ADMIN_USER ?? "admin",
    password: process.env.KX_ADMIN_PASSWORD ?? "admin",
    sessionSecrets,
    rateLimiter,
  }));

export const config: KxConfig = {
  git,
  cache,
  registry,
  auth,
  content: {
    productionBranch: "main",
    paths: { pages: "content/pages", globals: "content/globals" },
    variationBranchPrefix: "kx/",
  },
  cookies: { name: "kx-variation", secrets: cookieSecrets, maxAgeSeconds: 60 * 60 * 8 },
};
