/**
 * Debug-only: reports which Redis/Resend-related env vars are present
 * in the runtime. Returns booleans + key names only — never values.
 * Remove this route once we've identified the right variable names.
 */
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const PATTERNS = /^(KV_|REDIS|UPSTASH|RESEND|STORAGE_)/i;

export async function GET() {
  const matching = Object.keys(process.env)
    .filter((k) => PATTERNS.test(k))
    .sort();
  const seen = {};
  for (const k of matching) {
    seen[k] = (process.env[k] || '').length > 0;
  }
  return Response.json({
    runtime: 'nodejs',
    matchedCount: matching.length,
    vars: seen,
  });
}
