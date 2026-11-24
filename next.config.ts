import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/web-design", destination: "/", permanent: true }];
  },
  async rewrites() {
    return [
      { source: "/vkscanner/privacy", destination: "/vkscanner/privacy-policy.html" },
    ];
  },
};

export default nextConfig;
