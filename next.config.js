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
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.scdn.co' }
    ]
  }
};

module.exports = nextConfig;
