import type { NextConfig } from "next";

// Link previews (Discord, X, WhatsApp...) need absolute URLs, so a production build without a public domain would
// point every embed at localhost. Say so loudly at build time instead of shipping broken previews.
const hasDomain = ["NEXT_PUBLIC_SITE_URL", "VERCEL_PROJECT_PRODUCTION_URL", "URL", "RENDER_EXTERNAL_URL", "CF_PAGES_URL"].some(
  (k) => process.env[k],
);
if (process.argv.includes("build") && !hasDomain) {
  console.warn(
    "\n⚠  NEXT_PUBLIC_SITE_URL is not set, so canonical links, the sitemap and link-preview images will point to localhost.\n" +
      "   Set it to the live domain (e.g. NEXT_PUBLIC_SITE_URL=https://example.com) in your host's environment variables.\n",
  );
}

// The whole site is static, so it builds to plain files in `out/` that any static host (Cloudflare Pages, Netlify,
// GitHub Pages, Vercel) can serve. Response headers live in public/_headers, which Cloudflare Pages and Netlify read.
const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  images: {
    // Static hosting has no image optimiser; the screenshots are small PNGs already.
    unoptimized: true,
  },
};

export default nextConfig;
