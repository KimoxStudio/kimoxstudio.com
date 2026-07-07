import { NextResponse } from 'next/server';
import { verifyPassword, sessionCookie, clearedCookie } from '../../../../lib/studio-auth';

export const runtime = 'nodejs';

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { body = {}; }
  if (!verifyPassword(body?.password)) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookie());
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(clearedCookie());
  return res;
}
