const withCSS = require('@zeit/next-css');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withCSS(
  withPWA({
    pwa: {
      dest: 'public',
      disable: false,
      register: true,
      scope: '/',
      sw: 'service-worker.js',
      runtimeCaching
    },
  }),
);
