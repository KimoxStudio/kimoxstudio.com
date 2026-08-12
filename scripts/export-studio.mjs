// One-shot migration: dumps the Studio posts stored in Upstash Redis
// (`kimox:studio:posts`) into kx-studio's file store, one JSON per post.
//
// Talks to Redis over REST directly so it keeps working after lib/studio-store
// is removed. Credentials come from .env.local (or --env <file>), reading the
// same variable names the app did.
//
//   node scripts/export-studio.mjs --out ../kx-studio/projects/kimoxstudio [--env .env.local] [--dry]

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const dry = args.includes("--dry");
const envFile = resolve(flag("env", ".env.local"));
const outDir = resolve(flag("out", "../kx-studio/projects/kimoxstudio"));

/** Minimal dotenv: KEY=VALUE lines, optional quotes, # comments. */
function loadEnv(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const m = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/.exec(line);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = value;
  }
}
loadEnv(envFile);

const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const hasFile = args.includes("--file");
if (!hasFile && (!url || !token)) {
  console.error(
    `No Upstash credentials in ${envFile}. Set UPSTASH_REDIS_REST_URL/_TOKEN (or KV_REST_API_URL/_TOKEN).`,
  );
  process.exit(1);
}

// `--file <path>` reads posts from a JSON dump ({ posts: [...] } or a bare
// array) instead of Redis — used when the REST creds are Vercel-sensitive and
// the array was fetched through the live /api/studio/posts endpoint instead.
const fileArg = flag("file", "");
let posts;
if (fileArg) {
  const parsed = JSON.parse(readFileSync(resolve(fileArg), "utf8"));
  posts = Array.isArray(parsed) ? parsed : parsed.posts;
} else {
  const res = await fetch(`${url.replace(/\/$/, "")}/get/kimox:studio:posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    console.error(`Redis GET failed: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const body = await res.json();
  const raw = body.result;
  posts = raw ? (typeof raw === "string" ? JSON.parse(raw) : raw) : [];
}
if (!Array.isArray(posts)) {
  console.error("Stored value is not an array of posts.");
  process.exit(1);
}

/**
 * Template keys are namespaced in kx-studio: the shared library already owns
 * `post-tip`, `post-cita`, `banner`… and resolves before a project's extras,
 * so Kimox's own posters would be shadowed under their original keys.
 */
const TEMPLATE_KEYS = {
  "post-manifiesto": "kimox-post-manifiesto",
  "post-servicio": "kimox-post-servicio",
  "post-proyecto": "kimox-post-proyecto",
  "post-tip": "kimox-post-tip",
  "post-cita": "kimox-post-cita",
  "story-manifiesto": "kimox-story-manifiesto",
  "story-tip": "kimox-story-tip",
  "story-promo": "kimox-story-promo",
  banner: "kimox-banner",
  "avatar-mark": "kimox-avatar-mark",
  "avatar-word": "kimox-avatar-word",
};

/** Old studio platform ids → kx-studio's vocabulary. */
const PLATFORMS = { in: "li", ig: "ig", x: "x", tt: "tiktok" };

const STATUSES = new Set(["idea", "draft", "ready", "published"]);

function slugify(text) {
  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

const now = new Date().toISOString();
const map = {};
const used = new Set();
const files = [];

for (const p of posts) {
  const templateKey = TEMPLATE_KEYS[p.templateKey] ?? p.templateKey;
  const date = typeof p.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(p.date) ? p.date : "";
  const base = [date, slugify(p.title || templateKey)].filter(Boolean).join("-");
  let id = base || slugify(p.id);
  let n = 2;
  while (used.has(id)) id = `${base}-${n++}`;
  used.add(id);
  map[p.id] = id;

  const platforms = [...new Set((p.platforms ?? []).map((x) => PLATFORMS[x] ?? x))];
  const post = {
    id,
    templateKey,
    title: p.title ?? "",
    status: STATUSES.has(p.status) ? p.status : "idea",
    kind: "organic",
    platforms,
    caption: p.caption ?? "",
    hashtags: p.hashtags ?? "",
    notes: p.notes ?? "",
    date,
    medium: "static",
    createdAt: now,
    updatedAt: now,
  };
  if (p.advice) post.advice = p.advice;
  files.push(post);
}

if (dry) {
  console.log(JSON.stringify({ count: files.length, map }, null, 2));
  process.exit(0);
}

mkdirSync(join(outDir, "posts"), { recursive: true });
for (const post of files) {
  writeFileSync(join(outDir, "posts", `${post.id}.json`), `${JSON.stringify(post, null, 2)}\n`);
}
writeFileSync(join(outDir, "export-map.json"), `${JSON.stringify(map, null, 2)}\n`);
console.log(`Exported ${files.length} posts to ${join(outDir, "posts")}`);
