import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true, // ensures routes are exported as folders with index.html
  images: {
    unoptimized: true,
  },
  // experimental: {
  //   appDir: true,
  // },
};

export default nextConfig;
