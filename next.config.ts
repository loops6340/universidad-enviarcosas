import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    "domains": ["cdn.discordapp.com"]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4.5mb"
    }
  }
};

export default nextConfig;
