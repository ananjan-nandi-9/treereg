/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
  images: {
    unoptimized: true,  // <=== disables image optimization for static exports
  },
};

module.exports = nextConfig;
