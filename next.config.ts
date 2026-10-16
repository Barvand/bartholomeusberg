import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `next dev` and `next build` both write to `.next`; running them at the
  // same time corrupts the build. Set NEXT_DIST_DIR to build elsewhere.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
