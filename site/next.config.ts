import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Compress responses for smaller payloads
  compress: true,

  // Production browser source maps disabled (smaller bundles, no source leak)
  productionBrowserSourceMaps: false,

  // unoptimized: server does zero image processing — no LRU cache, no sharp, no RAM spike.
  // Images are already <1MB each; browser/CDN caching handles the rest.
  images: {
    unoptimized: true,
  },

  // Security & perf headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
