import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Turbopack root (silences the pnpm workspace warning) ───────────
  /*
  turbopack: {
    root: __dirname,
  },
  */

  // ─── Images ─────────────────────────────────────────────────────────
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    formats: ["image/avif", "image/webp"],
  },

  // ─── Performance ────────────────────────────────────────────────────
  /*
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  */
};

export default nextConfig;
