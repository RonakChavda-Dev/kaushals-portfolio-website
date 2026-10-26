import type { NextConfig } from "next";

// Link previews (Discord, X, WhatsApp...) need absolute URLs, so a production build without a public domain would
// point every embed at localhost. Say so loudly at build time instead of shipping broken previews.
const hasDomain = ["NEXT_PUBLIC_SITE_URL", "VERCEL_PROJECT_PRODUCTION_URL", "URL", "RENDER_EXTERNAL_URL"].some((k) => process.env[k]);
if (process.argv.includes("build") && !hasDomain) {
  console.warn(
    "\n⚠  NEXT_PUBLIC_SITE_URL is not set, so canonical links, the sitemap and link-preview images will point to localhost.\n" +
      "   Set it to the live domain (e.g. NEXT_PUBLIC_SITE_URL=https://example.com) in your host's environment variables.\n",
  );
}

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
