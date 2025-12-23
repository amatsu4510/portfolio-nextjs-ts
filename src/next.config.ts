import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
      remotePatterns: [
        // もし自分のドメイン (shoat-portfolio.com) でも配信しているなら、それも追加しておくと安全です
        {
          protocol: 'https',
          hostname: 'shoat-portfolio.com',
          pathname: '/**',
        },
        {
          protocol: 'http', // 万が一HTTPでリクエストが飛んでいる場合のため
          hostname: 'shoat-portfolio.com',
        },
      ],
    },
};

export default nextConfig;
