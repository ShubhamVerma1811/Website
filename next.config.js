const withCSS = require('@zeit/next-css');
const withPWA = require('next-pwa');

module.exports = withCSS(
  withPWA({
    pwa: {
      dest: 'public',
      disable: false,
      register: true,
      scope: '/',
      sw: 'service-worker.js',
    },
  }),
);
