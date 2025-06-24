import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental'
  },
  eslint: {
    // ✅ Skip ESLint during `next build` (e.g., on Vercel)
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
