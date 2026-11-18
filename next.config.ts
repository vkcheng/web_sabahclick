import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/vkscanner/privacy", destination: "/vkscanner/privacy-policy.html" },
    ];
  },
};

export default nextConfig;
