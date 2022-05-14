const siteUrl = 'https://shubhamverma.me';

/**
 * @type {import("next-sitemap").IConfig}
 */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    includeNonIndexSitemaps: true,
  },
};
