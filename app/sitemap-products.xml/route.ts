import { NextResponse } from 'next/server'
import { getSetting } from '@/lib/actions/setting.actions'
import Product from '@/lib/db/models/product.model' 

export async function GET() {
  const { site: { url } } = await getSetting()
  const baseUrl = (url && url.startsWith('https://hager-zon.vercel.app'))
    ? url.replace(/\/+$/, '')
    : 'https://hager-zon.vercel.app'
  const now = new Date().toISOString()

  const products = await Product.find({ isPublished: true })
    .select('slug updatedAt')
    .lean()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${products
    .map(
      (product) => `
    <url>
      <loc>${baseUrl}/product/${product.slug}</loc>
      <lastmod>${product.updatedAt ? new Date(product.updatedAt).toISOString() : now}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>`
    )
    .join('')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=59',
    },
  })
}