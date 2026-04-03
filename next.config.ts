import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  // v2 — cache bust
};

export default nextConfig;
