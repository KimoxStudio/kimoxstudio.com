import { NextResponse } from 'next/server';
import { isAuthed } from '../../../../lib/studio-auth';
import { listPosts, upsertPost, replaceAll } from '../../../../lib/studio-store';

export const runtime = 'nodejs';

async function gate() {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const g = await gate(); if (g) return g;
  const posts = await listPosts();
  return NextResponse.json({ ok: true, posts });
}

export async function POST(req) {
  const g = await gate(); if (g) return g;
  let body; try { body = await req.json(); } catch { body = {}; }
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, error: 'invalid body' }, { status: 400 });
  }
  // Bulk replace: { replace: true, posts: [...] }
  if (body.replace && Array.isArray(body.posts)) {
    const saved = await replaceAll(body.posts);
    return NextResponse.json({ ok: true, posts: saved });
  }
  // Single upsert: post object
  if (!body.id || !body.templateKey) {
    return NextResponse.json({ ok: false, error: 'missing id/templateKey' }, { status: 400 });
  }
  const saved = await upsertPost(body);
  return NextResponse.json({ ok: true, post: saved });
}
