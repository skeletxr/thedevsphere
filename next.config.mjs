import withImages from 'next-images';

/** @type {import('next').NextConfig} */
const nextConfig = withImages({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all image domains with https
      },
      {
        protocol: 'http',
        hostname: '**', // Allows all image domains with http
      },
    ],
  },
  // Add other Next.js configurations here if needed
});

export default nextConfig;
