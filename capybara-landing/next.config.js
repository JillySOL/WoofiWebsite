/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Add the output configuration for static export
  output: 'export',
};

module.exports = nextConfig; 