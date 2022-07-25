// @ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'cdn.hashnode.com',
      'source.unsplash.com',
      'images.unsplash.com',
      'avatars.githubusercontent.com',
      'i.gr-assets.com'
    ]
  },
  experimental: {
    optimizeCss: true
  }
};

module.exports = withBundleAnalyzer(nextConfig);
