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
    remotePatterns: [
      { hostname: 'https', hostname: 'avatars.githubusercontent.com' },
      { hostname: 'https', hostname: 'cdn.sanity.io' },
      { hostname: 'https', hostname: 'source.unsplash.com' },
      { hostname: 'https', hostname: 'images.unsplash.com' },
      { hostname: 'https', hostname: 'i.scdn.co' }
    ]
  }
};

module.exports = withBundleAnalyzer(nextConfig);
