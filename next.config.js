/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Transpile the link:-ed @kx workspace packages through SWC — safety net
  // for stale dist/ output (kimox-fw chassis). The kx admin SPA mounts at
  // /kx-admin (below), NOT /admin, so the existing Decap CMS rewrite is kept.
  transpilePackages: ['@kx/admin', '@kx/renderer', '@kx/nextjs'],
  async rewrites() {
    return [
      { source: '/admin', destination: '/admin/index.html' },
      { source: '/admin/', destination: '/admin/index.html' },
    ];
  },
};

module.exports = nextConfig;
