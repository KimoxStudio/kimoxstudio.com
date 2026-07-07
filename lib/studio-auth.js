import { cookies } from 'next/headers';
import crypto from 'node:crypto';

const COOKIE_NAME = 'kimox-studio';
const DEFAULT_PASSWORD = 'kimox2026';

function password() {
  return process.env.STUDIO_PASSWORD || DEFAULT_PASSWORD;
}

function secret() {
  return process.env.STUDIO_SECRET || 'kimox-studio-dev-secret';
}

function token() {
  return crypto.createHmac('sha256', secret()).update(password()).digest('hex');
}

export async function isAuthed() {
  const store = await cookies();
  const c = store.get(COOKIE_NAME);
  if (!c?.value) return false;
  const expected = token();
  try {
    return crypto.timingSafeEqual(Buffer.from(c.value), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function verifyPassword(candidate) {
  if (typeof candidate !== 'string' || !candidate) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(password());
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function sessionCookie() {
  return {
    name: COOKIE_NAME,
    value: token(),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  };
}

export function clearedCookie() {
  return {
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  };
}
