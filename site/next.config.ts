import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Compress responses for smaller payloads
  compress: true,

  // Production browser source maps disabled (smaller bundles, no source leak)
  productionBrowserSourceMaps: false,

  // Image optimization — minimumCacheTTL prevents re-processing the same image on every cache miss.
  // Fewer size variants reduces cold-start memory spikes on a constrained instance.
  images: {
    formats: ["image/webp", "image/avif"],
    // Single variant per category — absolute minimum cache entries, lowest memory.
    deviceSizes: [1920],
    imageSizes: [256],
    minimumCacheTTL: 604800, // 7 days
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
