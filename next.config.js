/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Unmatched URLs (/nope, /en/nope) cannot render inside app/[locale]/layout.jsx,
  // so app/global-not-found.jsx renders the localized 404 as a full document.
  experimental: { globalNotFound: true },
  // Anything that is not the production deployment (staging, previews, local)
  // tells crawlers to stay out, so staging.kimoxstudio.com never competes with
  // www.kimoxstudio.com in search results.
  async headers() {
    if (process.env.VERCEL_ENV === 'production') return [];
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
  // Locale routing: pages live under app/[locale] (es/en/ja) so each
  // language is pre-rendered server-side, but Spanish — the default locale —
  // keeps the site's historical unprefixed URLs:
  //   - rewrites serve the /es pages at /, /blog and /blog/<slug>
  //   - redirects send any direct /es/* hit back to the unprefixed URL, so
  //     each Spanish page has exactly one public URL (no duplicate content).
  async redirects() {
    return [
      { source: '/es', destination: '/', permanent: true },
      { source: '/es/:path*', destination: '/:path*', permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: '/', destination: '/es' },
      { source: '/blog', destination: '/es/blog' },
      { source: '/blog/:path*', destination: '/es/blog/:path*' },
    ];
  },
};

module.exports = nextConfig;
