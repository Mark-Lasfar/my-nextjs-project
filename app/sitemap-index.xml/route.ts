import { getSetting } from '@/lib/actions/setting.actions'


export async function GET(): Promise<Response> {
  try {
    const { site: { url } } = await getSetting()
    const baseUrl = url || 'https://hager-zon.vercel.app'
    const now = new Date().toISOString()

    const sitemapFiles = [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-products.xml`,
      `${baseUrl}/sitemap-news.xml`,
      `${baseUrl}/sitemap-blog.xml`,
      `${baseUrl}/sitemap-images.xml`,
    ]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles.map(loc => `
  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
`).join('')}
</sitemapindex>`

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      }
    })
  } catch (error) {
    console.error('Error generating sitemap index:', error)
    return new Response('Error generating sitemap index', { status: 500 })
  }
}