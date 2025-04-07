import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true, // ensures routes are exported as folders with index.html
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
