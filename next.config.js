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
  // TODO: Remove this when figured out.
  typescript: {
    ignoreBuildErrors: true
  },
  env: {
    DOMAIN: process.env.DOMAIN,
    SHOWBANNER: process.env.SHOWBANNER
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'cdn.sanity.io',
      'source.unsplash.com',
      'images.unsplash.com',
      'i.scdn.co'
    ]
  }
};

module.exports = withBundleAnalyzer(nextConfig);
