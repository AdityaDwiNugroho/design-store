import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/checkout/',
          '/success',
          '/_next/',
          '/private/',
          '*.json',
          '/_vercel',
          '/uploads/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/products/',
          '/categories',
          '/featured',
          '/new',
          '/help',
          '/contact',
          '/repository-access',
          '/articles/',
          '/faq/',
          '/privacy',
          '/terms',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/checkout/',
          '/success',
          '/cart',
          '/uploads/',
        ],
      },
    ],
    sitemap: 'https://design-store-one.vercel.app/sitemap.xml',
    host: 'https://design-store-one.vercel.app',
  }
}
