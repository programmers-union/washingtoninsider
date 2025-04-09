/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://www.washingtoninsider.org/", 
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    sitemapSize: 5000,
    changefreq: "weekly",
    priority: 1.0,
    exclude: [],
  
    robotsTxtOptions: {
      policies: [
        {
          userAgent: "*",
          allow: "/",
        },
      ],
    },
  
    transform: async (config, url) => {
      return {
        loc: url,
        lastmod: new Date().toISOString().split("T")[0],
        changefreq: "weekly",
        priority: 1.0,
      };
    },
  };
  