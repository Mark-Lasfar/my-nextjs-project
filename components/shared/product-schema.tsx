'use client'

interface ProductSchemaProps {
  name: string
  description: string
  image: string
  price: number
  currency: string
  sku: string
  availability: 'InStock' | 'OutOfStock'
  brand?: string
  reviews?: Array<{
    author: string
    rating: number
    content: string
    datePublished: string
  }>
}

export default function ProductSchema({
  name,
  description,
  image,
  price,
  currency,
  sku,
  availability,
  brand,
  reviews = [],
}: ProductSchemaProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hager-zon.vercel.app'
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: `${siteUrl}${image}`,
    sku,
    brand: brand ? {
      '@type': 'Brand',
      name: brand,
    } : undefined,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url: `${siteUrl}${location.pathname}`,
    },
    ...(reviews.length > 0 && {
      review: reviews.map((review) => ({
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
        },
        author: {
          '@type': 'Person',
          name: review.author,
        },
        reviewBody: review.content,
        datePublished: review.datePublished,
      })),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length,
        reviewCount: reviews.length,
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}