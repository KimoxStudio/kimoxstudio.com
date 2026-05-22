'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { Resend } from 'resend';
import { checkContactLimit } from '../../lib/ratelimit';

const Payload = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  budget: z.string().trim().max(40).optional().default(''),
  message: z.string().trim().min(8).max(4000),
  // Honeypot — must be empty.
  website: z.string().max(0).optional().default(''),
  // Client timestamp of when the page mounted, set on form load.
  loadedAt: z.coerce.number().int().positive(),
  lang: z.enum(['es', 'en', 'ja']).optional().default('es'),
});

const MIN_FILL_SECONDS = 2;

function getClientIp(headerList) {
  const xff = headerList.get('x-forwarded-for') || '';
  if (xff) return xff.split(',')[0].trim();
  return headerList.get('x-real-ip') || headerList.get('cf-connecting-ip') || 'unknown';
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function submitContact(_prevState, formData) {
  const headerList = await headers();
  const ip = getClientIp(headerList);

  // 1. Parse + validate (also catches the honeypot via z.max(0)).
  const parsed = Payload.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    budget: formData.get('budget') ?? '',
    message: formData.get('message'),
    website: formData.get('website') ?? '',
    loadedAt: formData.get('loadedAt'),
    lang: formData.get('lang') ?? 'es',
  });
  if (!parsed.success) {
    return { ok: false, error: 'invalid', issues: parsed.error.flatten().fieldErrors };
  }
  const data = parsed.data;

  // 2. Time gate — humans take more than ~2s to fill the form.
  const elapsed = (Date.now() - data.loadedAt) / 1000;
  if (elapsed < MIN_FILL_SECONDS) {
    return { ok: false, error: 'too_fast' };
  }

  // 3. Rate limit per IP (3/hour, 10/day).
  const limit = await checkContactLimit(ip);
  if (!limit.ok) {
    return { ok: false, error: 'rate_limited', retryAfter: limit.retryAfter, window: limit.window };
  }

  // 4. Send via Resend, or log to console if not configured (dev mode).
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddr = process.env.RESEND_FROM || 'Kimox Studio <onboarding@resend.dev>';
  const toAddr = process.env.RESEND_TO || 'kimoxstudio@gmail.com';

  const subject = `[Web] ${data.name} — ${data.budget || 'sin presupuesto'}`;
  const text = [
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    `Presupuesto: ${data.budget || '—'}`,
    `Idioma de envío: ${data.lang}`,
    `IP: ${ip}`,
    '',
    'Mensaje:',
    data.message,
  ].join('\n');
  const html = `
    <table style="font-family: -apple-system, system-ui, sans-serif; font-size:14px; line-height:1.5;">
      <tr><td><b>Nombre</b></td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td><b>Email</b></td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
      <tr><td><b>Presupuesto</b></td><td>${escapeHtml(data.budget || '—')}</td></tr>
      <tr><td><b>Idioma</b></td><td>${escapeHtml(data.lang)}</td></tr>
      <tr><td><b>IP</b></td><td>${escapeHtml(ip)}</td></tr>
    </table>
    <hr style="margin:16px 0; border:0; border-top:1px solid #ddd;" />
    <pre style="font-family: ui-monospace, monospace; white-space: pre-wrap; font-size:14px;">${escapeHtml(data.message)}</pre>
  `;

  if (!apiKey) {
    console.log('[contact] RESEND_API_KEY missing — logging instead of sending');
    console.log(text);
    return { ok: true, mode: 'logged' };
  }

  const resend = new Resend(apiKey);
  try {
    const result = await resend.emails.send({
      from: fromAddr,
      to: [toAddr],
      replyTo: data.email,
      subject,
      text,
      html,
    });
    if (result.error) {
      console.error('[contact] resend error', result.error);
      return { ok: false, error: 'send_failed' };
    }
    return { ok: true, mode: 'sent' };
  } catch (err) {
    console.error('[contact] resend threw', err);
    return { ok: false, error: 'send_failed' };
  }
}
