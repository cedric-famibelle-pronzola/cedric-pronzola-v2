import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['cedric-pronzola.re'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cedric-pronzola.re',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
