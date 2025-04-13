import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cedric-pronzola.dev',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
