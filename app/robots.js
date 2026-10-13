import { BASE_URL } from '@/lib/urls';

export default function robots() {
  // Non-production deployments (staging, previews) are closed to crawlers;
  // next.config.js also sends X-Robots-Tag: noindex on every response there.
  if (process.env.VERCEL_ENV !== 'production') {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
