import { Redis } from '@upstash/redis';

let instance = null;
function getRedis() {
  if (instance) return instance;
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.REDIS_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.REDIS_TOKEN;
  if (!url || !token) return null;
  instance = new Redis({ url, token });
  return instance;
}

const KEY = 'kimox:studio:posts';

// In-memory fallback when Redis credentials are missing (local dev without
// Upstash). Not shared between server instances — fine for a single-process
// dev server, not for prod.
let memory = null;

export async function listPosts() {
  const r = getRedis();
  if (!r) {
    if (memory == null) memory = [];
    return memory;
  }
  const raw = await r.get(KEY);
  if (!raw) return [];
  if (typeof raw === 'string') {
    try { return JSON.parse(raw); } catch { return []; }
  }
  return Array.isArray(raw) ? raw : [];
}

export async function savePosts(posts) {
  const r = getRedis();
  const arr = Array.isArray(posts) ? posts : [];
  if (!r) { memory = arr; return; }
  await r.set(KEY, JSON.stringify(arr));
}

export async function upsertPost(post) {
  const posts = await listPosts();
  const idx = posts.findIndex((p) => p.id === post.id);
  const next = idx >= 0
    ? posts.map((p, i) => (i === idx ? { ...p, ...post } : p))
    : [post, ...posts];
  await savePosts(next);
  return next.find((p) => p.id === post.id);
}

export async function patchPost(id, patch) {
  const posts = await listPosts();
  let updated = null;
  const next = posts.map((p) => {
    if (p.id !== id) return p;
    updated = { ...p, ...patch };
    return updated;
  });
  if (!updated) return null;
  await savePosts(next);
  return updated;
}

export async function deletePost(id) {
  const posts = await listPosts();
  const next = posts.filter((p) => p.id !== id);
  await savePosts(next);
  return posts.length !== next.length;
}

export async function replaceAll(posts) {
  await savePosts(posts);
  return posts;
}
