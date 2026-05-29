import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  compress: true,
  poweredByHeader: false,
  allowedDevOrigins: [
    "space-z.ai",
    "chatglm.site",
    "sdasms.com",
    "www.sdasms.com",
    "preview-chat-78610a11-f1ad-4e52-8963-ac90b95381b6.space-z.ai",
  ],
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
    {
      source: '/(.*)\\.(jpg|jpeg|png|gif|ico|svg|webp|woff2|woff|ttf)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
};

export default nextConfig;
