'use client'

import Head from 'next/head'
import { usePathname } from 'next/navigation'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product'
  canonical?: string
}

export default function SEO({
  title = 'MGZon - Your Ultimate Shopping Destination',
  description = 'Discover amazing products at great prices. Shop electronics, fashion, home goods and more at MGZon.',
  keywords = 'ecommerce, online shopping, electronics, fashion, home goods',
  ogImage = '/images/og-image.png',
  ogType = 'website',
  canonical,
}: SEOProps) {
  const pathname = usePathname()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mgzon.vercel.app'
  const canonicalUrl = canonical || `${siteUrl}${pathname}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MGZon',
    url: siteUrl,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="MGZon" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      <link rel="canonical" href={canonicalUrl} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  )
}