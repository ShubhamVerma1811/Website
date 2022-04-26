// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'cdn.hashnode.com',
      'source.unsplash.com',
      'images.unsplash.com',
      'avatars.githubusercontent.com',
    ],
  },
};

module.exports = nextConfig;
