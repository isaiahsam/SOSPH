import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/SOSPH",
  assetPrefix: "/SOSPH",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
