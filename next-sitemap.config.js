/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.washingtoninsider.org",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 100,
  exclude: [],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },

  transform: async (config, path) => {
    const topPaths = [
      "/",
      "/business",
      "/business/Julio-Herrera-Velutini-and-His-Business-Investments-in-the-Global-Market"
    ];

    if (!topPaths.includes(path)) {
      return null; // Exclude all other pages
    }

    const priority = path === "/business" ? 0.9 : 1.0;

    return {
      loc: new URL(path, config.siteUrl).toString(),
      lastmod: new Date().toISOString(),
      priority,
      
    };
  }
};
