import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
  // Development performance optimizations
  reactStrictMode: false, // Reduces double-rendering in dev
  experimental: {
    // Faster refresh and builds
    optimizeCss: false, // Disable CSS optimization in dev
  },
  // Fix for Turbopack lockfile warning
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;