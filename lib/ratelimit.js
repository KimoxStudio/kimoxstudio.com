import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let hourlyLimiter = null;
let dailyLimiter = null;

function buildLimiters() {
  if (hourlyLimiter && dailyLimiter) return { hourlyLimiter, dailyLimiter };
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return { hourlyLimiter: null, dailyLimiter: null };
  const redis = new Redis({ url, token });
  hourlyLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 h'),
    analytics: true,
    prefix: 'kimox:contact:hour',
  });
  dailyLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '24 h'),
    analytics: true,
    prefix: 'kimox:contact:day',
  });
  return { hourlyLimiter, dailyLimiter };
}

/**
 * Returns { ok: true } on success or { ok: false, retryAfter: seconds }
 * if the caller has hit either window. When Upstash credentials are not
 * configured, returns { ok: true, skipped: true } so local dev still works.
 */
export async function checkContactLimit(ip) {
  const { hourlyLimiter, dailyLimiter } = buildLimiters();
  if (!hourlyLimiter || !dailyLimiter) return { ok: true, skipped: true };
  const key = ip || 'anonymous';
  const [hourly, daily] = await Promise.all([
    hourlyLimiter.limit(`h:${key}`),
    dailyLimiter.limit(`d:${key}`),
  ]);
  if (!hourly.success) {
    return { ok: false, retryAfter: Math.ceil((hourly.reset - Date.now()) / 1000), window: 'hourly' };
  }
  if (!daily.success) {
    return { ok: false, retryAfter: Math.ceil((daily.reset - Date.now()) / 1000), window: 'daily' };
  }
  return { ok: true };
}
