/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.washingtoninsider.org",
  generateIndexSitemap: false,
  sitemapFilename: "sitemap.xml",
  generateRobotsTxt: true,

  transform: async (config, path) => {
    const now = new Date().toISOString();
    const base = config.siteUrl;
    const JULIO_SLUG = "/business/Julio-Herrera-Velutini-and-His-Business-Investments-in-the-Global-Market";

    if (path === "/") {
      return {
        loc: `${base}/`,
        lastmod: now,
        priority: 1.0,
      };
    }
    if (path === "/business") {
      return {
        loc: `${base}/business/`,
        lastmod: now,
        priority: 0.9,
      };
    }
    if (path === JULIO_SLUG) {
      return {
        loc: `${base}${JULIO_SLUG}/`,
        lastmod: now,
        priority: 0.8,
      };
    }
    return null;
  },
};
