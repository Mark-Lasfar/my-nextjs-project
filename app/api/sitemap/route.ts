import { NextResponse } from 'next/server'
import { getSetting } from '@/lib/actions/setting.actions'
import Product from '@/lib/db/models/product.model'
import { connectToDatabase } from '@/lib/db'
import { routing } from '@/i18n/routing'

export async function GET() {
  try {
    await connectToDatabase()
    const {
      site: { url },
    } = await getSetting()
    const baseUrl = url || 'https://hager-zon.vercel.app'

    const products = await Product.find({
      isPublished: true,
      deletedAt: { $exists: false },
    })
      .select('slug updatedAt')
      .lean()

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${routing.locales
    .map(
      (locale) => `
    <url>
      <loc>${baseUrl}/${locale}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
      ${routing.locales
        .map(
          (altLocale) => `
        <xhtml:link 
          rel="alternate" 
          hreflang="${altLocale}" 
          href="${baseUrl}/${altLocale}"
        />`
        )
        .join('')}
    </url>
  `
    )
    .join('')}
  ${products
    .map((product) =>
      routing.locales
        .map(
          (locale) => `
    <url>
      <loc>${baseUrl}/${locale}/product/${product.slug}</loc>
      <lastmod>${product.updatedAt?.toISOString() || new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
      ${routing.locales
        .map(
          (altLocale) => `
        <xhtml:link 
          rel="alternate" 
          hreflang="${altLocale}" 
          href="${baseUrl}/${altLocale}/product/${product.slug}"
        />`
        )
        .join('')}
    </url>
  `
        )
        .join('')
    )
    .join('')}
</urlset>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}