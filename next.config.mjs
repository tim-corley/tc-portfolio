/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Add SVGR for SVG imports
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;