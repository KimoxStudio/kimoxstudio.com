import "server-only";
import { randomBytes } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { createCredentialsAuthProvider, createMemoryRateLimiter } from "@kimoxstudio/auth";
import { createMemoryCache } from "@kimoxstudio/cache-memory";
import type { GitProvider, KxConfig } from "@kimoxstudio/core";
import { createGitHubProvider } from "@kimoxstudio/git-provider-github";
import { createStubGitProvider } from "@kimoxstudio/git-provider-stub";
import { registry } from "./registry";

// globalThis singletons — Next dev/HMR bundles each route handler as its own
// module instance; without this, every endpoint gets separate in-memory state.
type GlobalKx = {
  __kxGit?: GitProvider;
  __kxCache?: ReturnType<typeof createMemoryCache>;
  __kxRateLimiter?: ReturnType<typeof createMemoryRateLimiter>;
  __kxAuth?: ReturnType<typeof createCredentialsAuthProvider>;
};
const g = globalThis as unknown as GlobalKx;

// Secrets. The dev fallbacks below are public (they live in this repo), so in
// production a missing value is a hard error rather than a silently-forgeable
// admin session. Locally they fall back so `pnpm dev` just works.
// `next build` evaluates modules with NODE_ENV=production but serves nothing,
// so the guard must not fire there — only on a running server.
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";
const isProd = process.env.NODE_ENV === "production" && !isBuildPhase;

/**
 * Secret resolution.
 *
 * The dev fallbacks below are public (they live in this repo), so accepting
 * them in production would let anyone forge an admin session. But hard-failing
 * would take the whole marketing site down over a missing env var, which is a
 * worse trade for a public site. Instead we degrade precisely: in production a
 * missing secret becomes a random per-boot value. The public site keeps
 * serving; sessions become unforgeable, and (because the admin password is
 * resolved the same way) nobody can log into /admin until the real values are
 * set. Sessions won't survive a restart — that's the intended nudge.
 */
function requiredSecret(name: string, devFallback: string): string {
  const v = process.env[name];
  if (v && v.length > 0) return v;
  if (isProd) {
    console.warn(
      `[kx] ${name} is not set. Using a random per-boot value: the public site ` +
        "works, but /admin is effectively disabled until you set it.",
    );
    return randomBytes(24).toString("base64url");
  }
  return devFallback;
}

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

/**
 * GitHub when credentials are present, in-memory stub otherwise.
 *
 * The stub is seeded from the committed `content/` tree, so the PUBLIC site
 * renders correctly either way. What the stub cannot do is persist admin
 * edits — they live in process memory (and on serverless, each instance has
 * its own). To make `/admin` a real CMS, run `pnpm kx setup` and set the
 * `KX_GITHUB_*` vars; this switches over on the next boot with no code change.
 */
function resolveGitProvider(): GitProvider {
  const owner = process.env.KX_GITHUB_OWNER;
  const repo = process.env.KX_GITHUB_REPO;
  const appId = process.env.KX_GITHUB_APP_ID;
  const privateKey = process.env.KX_GITHUB_APP_PRIVATE_KEY;
  const installationId = process.env.KX_GITHUB_INSTALLATION_ID;
  const token = process.env.KX_GITHUB_ACCESS_TOKEN;

  if (owner && repo && appId && privateKey && installationId) {
    return createGitHubProvider({
      appId,
      privateKey,
      installationId: Number(installationId),
      owner,
      repo,
    });
  }
  if (owner && repo && token) {
    return createGitHubProvider({ owner, repo, token });
  }
  return createStubGitProvider({
    branches: { main: readTree(join(process.cwd(), "content"), "content") },
  });
}

const git = g.__kxGit ?? (g.__kxGit = resolveGitProvider());
const cache = g.__kxCache ?? (g.__kxCache = createMemoryCache({ maxItems: 200 }));
const rateLimiter =
  g.__kxRateLimiter ??
  (g.__kxRateLimiter = createMemoryRateLimiter({ points: 10, durationMs: 60_000 }));

const sessionSecrets = [
  { id: "v1", value: requiredSecret("KX_SESSION_SECRET", "dev-session-secret-do-not-use-in-prod") },
];
const cookieSecrets = [
  { id: "v1", value: requiredSecret("KX_COOKIE_SECRET", "dev-cookie-secret-do-not-use-in-prod") },
];

const auth =
  g.__kxAuth ??
  (g.__kxAuth = createCredentialsAuthProvider({
    user: process.env.KX_ADMIN_USER ?? "admin",
    password: requiredSecret("KX_ADMIN_PASSWORD", "admin"),
    sessionSecrets,
    rateLimiter,
  }));

export const config: KxConfig = {
  git,
  cache,
  registry,
  auth,
  content: {
    // Branch the public site reads from. Overridable so you can point at a
    // branch whose content/ tree isn't on main yet (e.g. while the migration
    // still lives on migrate/kimox-fw-v2 — otherwise every route 404s because
    // the GitHub provider looks for content/pages/*.json on main).
    productionBranch: process.env.KX_PRODUCTION_BRANCH ?? "main",
    paths: { pages: "content/pages", globals: "content/globals" },
    variationBranchPrefix: "kx/",
  },
  cookies: { name: "kx-variation", secrets: cookieSecrets, maxAgeSeconds: 60 * 60 * 8 },
};
