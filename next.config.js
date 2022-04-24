// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'cdn.hashnode.com',
      'source.unsplash.com',
      'images.unsplash.com',
    ],
  },
};

module.exports = nextConfig;
