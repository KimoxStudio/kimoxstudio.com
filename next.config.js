/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Transpile the link:-ed @kx workspace packages through SWC — safety net
  // for stale dist/ output (kimox-fw chassis). The kx admin SPA mounts at
  // /admin (app/admin); the old Decap CMS that used to own /admin has been
  // removed, so no rewrite is needed.
  transpilePackages: ['@kx/admin', '@kx/renderer', '@kx/nextjs'],
};

module.exports = nextConfig;
