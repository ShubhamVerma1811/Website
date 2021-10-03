const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: false,
    register: true,
    scope: '/',
    sw: 'service-worker.js',
  },
  images: {
    domains: ['project-images.gitconnectedcontent.com'],
  },
});
