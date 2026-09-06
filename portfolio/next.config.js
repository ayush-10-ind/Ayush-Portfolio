/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers (no X-Frame-Options so the hosted preview can embed).
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [375, 768, 1024, 1280, 1600],
  },
};

module.exports = nextConfig;
