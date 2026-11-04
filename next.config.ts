import type { NextConfig } from "next";

// Static export: the site is plain files, so it can be hosted on Vercel or GitHub Pages.
// Images are prepared ahead of time (WebP in /public/media), so no runtime optimiser is needed.
// NEXT_PUBLIC_BASE_PATH: set to "/<repo>" for GitHub Pages; leave unset for Vercel or a custom domain.
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
