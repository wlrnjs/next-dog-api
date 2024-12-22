import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.animal.go.kr",
        port: "",
        pathname: "/files/shelter/**",
      },
    ],
  },
};

export default nextConfig;