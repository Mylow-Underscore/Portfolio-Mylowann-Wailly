module.exports = {
  siteUrl: process.env.SITE_URL || 'https://wailly-mylowann.fr',
  generateRobotsTxt: true, // (optional)
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin/*', '/login', '/register', '/dashboard/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', disallow: ['private'] },
    ],
  },
}