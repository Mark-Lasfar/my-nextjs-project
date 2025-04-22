import { NextResponse } from 'next/server'
import { getSetting } from '@/lib/actions/setting.actions'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const { site: { url } } = await getSetting()
    // Only allow the official domain, fallback to the correct one
    const baseUrl = (url && url.startsWith('https://hager-zon.vercel.app'))
      ? url.replace(/\/+$/, '')
      : 'https://hager-zon.vercel.app'
    const nowIso = new Date().toISOString()

    const imagesDir = path.join(process.cwd(), 'public', 'images')
    const mediaDir = path.join(process.cwd(), 'public', 'media')

    function getImagesFromDir(dir: string, urlPrefix: string): { loc: string; updatedAt: string }[] {
      if (!fs.existsSync(dir)) return []
      return fs
        .readdirSync(dir)
        .filter((f) =>
          /\.(jpe?g|png|gif|webp|svg|bmp|ico|tiff?)$/i.test(f)
        )
        .map((f) => ({
          loc: `${baseUrl}/${urlPrefix}/${f}`,
          updatedAt: nowIso, 
        }))
    }

    const images = [
      ...getImagesFromDir(imagesDir, 'images'),
      ...getImagesFromDir(mediaDir, 'media'),
    ]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${images
    .map(
      (img) => `
    <url>
      <loc>${img.loc}</loc>
      <lastmod>${img.updatedAt}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
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
    console.error('Error generating images sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}   