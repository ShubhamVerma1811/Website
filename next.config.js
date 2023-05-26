// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DOMAIN: process.env.DOMAIN
  },
  experimental: {
    appDir: true
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'cdn.sanity.io',
      'source.unsplash.com',
      'images.unsplash.com'
    ]
  }
};

module.exports = withBundleAnalyzer(nextConfig);
