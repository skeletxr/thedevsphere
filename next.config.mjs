import withImages from "next-images";
import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = withImages({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all image domains with https
      },
      {
        protocol: "http",
        hostname: "**", // Allows all image domains with http
      },
    ],
  },
  // Additional Next.js configurations if needed
});

const config =
  process.env.NODE_ENV === "production"
    ? withPWA({
        dest: "public", // Specifies where the service worker and assets will be output
      })(nextConfig)
    : nextConfig;

export default config;
