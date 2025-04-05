import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/hotels',
        destination:
          'https://e91a-2601-801-1-110-990d-748f-90b5-cf2f.ngrok-free.app/api/hotels',
      },
      {
        source: '/api/hotels/:path*',
        destination:
          'https://e91a-2601-801-1-110-990d-748f-90b5-cf2f.ngrok-free.app/api/hotels/:path*',
      },
    ];
  },
};

export default nextConfig;
