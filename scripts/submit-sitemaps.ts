import https from 'https'
import { IncomingMessage } from 'http'

interface SearchEngines {
  [key: string]: string
  google: string
  bing: string
}

type SearchEngine = keyof SearchEngines

const SITEMAPS: string[] = [
  'https://hager-zon.vercel.app/sitemap.xml',
  'https://hager-zon.vercel.app/sitemap-products.xml',
  'https://hager-zon.vercel.app/sitemap-news.xml',
  'https://hager-zon.vercel.app/sitemap-blog.xml',
  'https://hager-zon.vercel.app/sitemap-images.xml'
]

const SEARCH_ENGINES: SearchEngines = {
  google: 'https://www.google.com/ping?sitemap=',
  bing: 'https://www.bing.com/ping?sitemap='
}

/**
 * Verifies if a sitemap exists at the given URL
 * @param sitemapUrl The URL of the sitemap to verify
 * @returns Promise<boolean> True if sitemap exists and is accessible
 */
async function verifySitemapExists(sitemapUrl: string): Promise<boolean> {
  return new Promise((resolve) => {
    const request = https.get(sitemapUrl, (res: IncomingMessage) => {
      resolve(res.statusCode === 200)
    })

    request.on('error', () => {
      resolve(false)
    })

    // Set timeout to avoid hanging
    request.setTimeout(10000, () => {
      request.destroy()
      resolve(false)
    })
  })
}

/**
 * Submits a sitemap to a specific search engine
 * @param searchEngine The search engine to submit to (google or bing)
 * @param sitemapUrl The URL of the sitemap to submit
 * @returns Promise<number> HTTP status code of the submission
 */
async function submitSitemap(
  searchEngine: SearchEngine,
  sitemapUrl: string
): Promise<number> {
    const engineName = String(searchEngine).toUpperCase()  
  try {
    // First verify the sitemap exists
    const exists = await verifySitemapExists(sitemapUrl)
    if (!exists) {
      console.log(`[${engineName}] Sitemap not found: ${sitemapUrl}`)
      return 404
    }

    const url = `${SEARCH_ENGINES[searchEngine]}${encodeURIComponent(sitemapUrl)}`

    return new Promise((resolve) => {
      const request = https.get(url, (res: IncomingMessage) => {
        let data = ''

        res.on('data', (chunk) => {
          data += chunk
        })

        res.on('end', () => {
          console.log(
            `[${engineName}] Submitted ${sitemapUrl} - Status: ${res.statusCode}${
              data ? ` - Response: ${data}` : ''
            }`
          )
          resolve(res.statusCode ?? 500)
        })
      })

      request.on('error', (error: Error) => {
        console.error(`Error submitting to ${engineName}:`, error.message)
        resolve(500)
      })

      // Set timeout to avoid hanging
      request.setTimeout(10000, () => {
        request.destroy()
        console.error(`Timeout submitting to ${engineName}`)
        resolve(504)
      })
    })
  } catch (error) {
    console.error(`Error submitting to ${engineName}:`, error)
    return 500
  }
}

/**
 * Submits all sitemaps to all configured search engines
 * @returns Promise<void>
 */
async function submitAllSitemaps(): Promise<void> {
  const engines = Object.keys(SEARCH_ENGINES) as SearchEngine[]
  const results: { [key: string]: number } = {}

  console.log('Starting sitemap submission process...')
  console.log(`Timestamp: ${new Date().toISOString()}`)
  console.log('----------------------------------------')

  for (const sitemap of SITEMAPS) {
    for (const engine of engines) {
      try {
        const status = await submitSitemap(engine, sitemap)
        results[`${engine}-${sitemap}`] = status
        
        // Wait 1 second between submissions to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`Failed to submit ${sitemap} to ${engine}:`, error)
        results[`${engine}-${sitemap}`] = 500
      }
    }
  }

  console.log('----------------------------------------')
  console.log('Submission Results Summary:')
  Object.entries(results).forEach(([key, status]) => {
    const [engine, sitemap] = key.split('-')
    console.log(`${engine.toUpperCase()} - ${sitemap}: ${status}`)
  })
  console.log('----------------------------------------')
}

// Export for use in other files
export { submitSitemap, submitAllSitemaps, type SearchEngine }

// Run if called directly
if (require.main === module) {
  submitAllSitemaps()
    .then(() => {
      console.log('Sitemap submission process completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Error executing submitAllSitemaps:', error)
      process.exit(1)
    })
}