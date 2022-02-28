module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'project-images.gitconnectedcontent.com',
      'res.cloudinary.com',
      's3.us-west-2.amazonaws.com',
      'cdn.hashnode.com',
    ],
  },
};
