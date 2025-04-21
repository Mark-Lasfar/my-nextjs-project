import { MetadataRoute } from 'next'
import { getSetting } from '@/lib/actions/setting.actions'
import Product from '@/lib/db/models/product.model'
import { connectToDatabase } from '@/lib/db'
import { routing } from '@/i18n/routing'

type SitemapEntry = {
  url: string
  lastModified: Date
  changeFrequency:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority: number
}

const STATIC_PAGES = [
  { path: '', priority: 1.0 },
  { path: '/search', priority: 0.8 },
  { path: '/cart', priority: 0.6 },
  { path: '/categories', priority: 0.8 },
  { path: '/blog', priority: 0.9 },
] as const

const DEFAULT_BASE_URL = 'https://hager-zon.vercel.app'

const getBaseUrl = (url?: string): string => {
  if (url) return url.replace(/\/+$/, '') // Remove trailing slashes
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/\/+$/, '')}`
  return DEFAULT_BASE_URL.replace(/\/+$/, '') // Default base URL without trailing slashes
}

const createStaticRoutes = (baseUrl: string): SitemapEntry[] => {
  const routes: SitemapEntry[] = []

  for (const locale of routing.locales) {
    for (const { path, priority } of STATIC_PAGES) {
      routes.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority,
      })
    }
  }

  return routes
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    await connectToDatabase()

    const {
      site: { url },
    } = await getSetting()
    const baseUrl = getBaseUrl(url)

    const products = await Product.find({
      isPublished: true,
      deletedAt: { $exists: false },
    })
      .select('slug updatedAt')
      .lean()

    const productUrls: SitemapEntry[] = []

    for (const product of products) {
      for (const locale of routing.locales) {
        productUrls.push({
          url: `${baseUrl}/${locale}/product/${product.slug}`,
          lastModified: product.updatedAt || new Date(),
          changeFrequency: 'daily',
          priority: 0.8,
        })
      }
    }

    const staticRoutes = createStaticRoutes(baseUrl)
    return [...staticRoutes, ...productUrls]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    const baseUrl = DEFAULT_BASE_URL
    return createStaticRoutes(baseUrl).map((route) => ({
      ...route,
      priority: Math.max(route.priority - 0.2, 0),
    }))
  }
}

export const revalidate = 3600