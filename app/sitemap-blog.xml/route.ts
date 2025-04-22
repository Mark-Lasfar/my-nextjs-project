import { NextResponse } from 'next/server'
import { getSetting } from '@/lib/actions/setting.actions'

export async function GET() {
  try {
    const { site: { url } } = await getSetting()
    // استخدم الدومين الرسمي فقط
    const baseUrl = (url && url.startsWith('https://hager-zon.vercel.app'))
      ? url.replace(/\/+$/, '')
      : 'https://hager-zon.vercel.app'
    const nowIso = new Date().toISOString()

    // Example blog entries.
    const blogs = [
      {
        slug: 'first-blog-post',
        updatedAt: nowIso,
      },
      {
        slug: 'another-blog-post',
        updatedAt: nowIso,
      }
    ]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${blogs
    .map(
      (blog) => `
    <url>
      <loc>${baseUrl}/blog/${blog.slug}</loc>
      <lastmod>${new Date(blog.updatedAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`
    )
    .join('\n')}
</urlset>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml'
      }
    })
  } catch (error) {
    console.error('Error generating blog sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}