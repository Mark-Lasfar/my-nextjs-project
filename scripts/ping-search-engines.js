const https = require('https')

const SITE_URL = 'https://hager-zon.vercel.app'
const SITEMAPS = [
  `${SITE_URL}/sitemap.xml`,
  `${SITE_URL}/sitemap-products.xml`,
  `${SITE_URL}/sitemap-news.xml`,
  `${SITE_URL}/sitemap-blog.xml`,
  `${SITE_URL}/sitemap-images.xml`
]

const pingSearchEngine = (url) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`Pinged ${url} - Status: ${res.statusCode}`)
      resolve(res.statusCode)
    }).on('error', (e) => {
      console.error(`Error pinging ${url}: ${e.message}`)
      resolve(500)
    })
  })
}

const pingAll = async () => {
  const results = []
  
  for (const sitemap of SITEMAPS) {
    const googleUrl = `https://www.google.com/ping?sitemap=${sitemap}`
    const bingUrl = `https://www.bing.com/ping?sitemap=${sitemap}`
    
    results.push(await pingSearchEngine(googleUrl))
    results.push(await pingSearchEngine(bingUrl))
  }

  return results
}

pingAll().then(results => {
  const successCount = results.filter(code => code === 200).length
  console.log(`Successfully pinged ${successCount}/${results.length} endpoints`)
})