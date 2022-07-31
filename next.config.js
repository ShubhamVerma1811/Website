// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
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
    images: {
      allowFutureImage: true
    }
  }
};

module.exports = withBundleAnalyzer(nextConfig);
