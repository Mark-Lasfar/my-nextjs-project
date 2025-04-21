import { NextResponse } from 'next/server'
import { getSetting } from '@/lib/actions/setting.actions'

export async function GET() {
  const { site: { url } } = await getSetting()
  const baseUrl = url || 'https://hager-zon.vercel.app'
  const now = new Date().toISOString()

  const pages = [
    '',
    'about-us',
    'contact-us',
    'products',
    'categories',
    'cart',
    'checkout',
    'account',
    'orders',
    'wishlist',
    'privacy-policy',
    'terms-of-service',
    'shipping-policy',
    'return-policy',
    'faq',
    // Add more static pages if needed
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${baseUrl}${page ? `/${page}` : ''}</loc>
      <lastmod>${now}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page === '' ? '1.0' : '0.7'}</priority>
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