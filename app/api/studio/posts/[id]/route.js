import { NextResponse } from 'next/server';
import { isAuthed } from '../../../../../lib/studio-auth';
import { patchPost, deletePost } from '../../../../../lib/studio-store';

export const runtime = 'nodejs';

async function gate() {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  return null;
}

export async function PATCH(req, { params }) {
  const g = await gate(); if (g) return g;
  const { id } = await params;
  let patch; try { patch = await req.json(); } catch { patch = {}; }
  const updated = await patchPost(id, patch || {});
  if (!updated) return NextResponse.json({ ok: false, error: 'not found' }, { status: 404 });
  return NextResponse.json({ ok: true, post: updated });
}

export async function DELETE(_req, { params }) {
  const g = await gate(); if (g) return g;
  const { id } = await params;
  const removed = await deletePost(id);
  if (!removed) return NextResponse.json({ ok: false, error: 'not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
