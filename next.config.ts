import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `next dev` and `next build` both write to `.next`; running them at the
  // same time corrupts the build. Set NEXT_DIST_DIR to build elsewhere.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    // Next's built-in optimizer fails on Netlify ("isn't a valid image"),
    // so serve images directly as before.
    unoptimized: true,
  },
};

export default nextConfig;
