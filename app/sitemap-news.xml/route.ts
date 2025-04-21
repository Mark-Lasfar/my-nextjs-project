import { NextResponse } from 'next/server'
import { getSetting } from '@/lib/actions/setting.actions'

export async function GET() {
  try {
    const {
      site: { url },
    } = await getSetting()
    const baseUrl = url || 'https://hager-zon.vercel.app'
    const currentDate = new Date().toISOString()

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>${baseUrl}/blog</loc>
    <news:news>
      <news:publication>
        <news:name>MGZon E-commerce</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${currentDate}</news:publication_date>
      <news:title>Latest Updates and News</news:title>
    </news:news>
  </url>
</urlset>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=59',
      },
    })
  } catch (error) {
    console.error('Error generating news sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}