import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import NewsletterSignUp from '@/components/NewsletterSignUp';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Premium Digital Design Resources & UI Kits - DesignStore",
  description: "Discover the best collection of premium UI kits, design templates, icons, and code snippets. High-quality digital products for designers and developers. Download instantly and boost your productivity.",
  keywords: [
    "premium UI kits", "design templates", "digital design resources", "web design",
    "mobile design", "dashboard templates", "landing page templates", "react components",
    "figma templates", "sketch files", "design assets", "icons", "code snippets"
  ],
  openGraph: {
    title: "Premium Digital Design Resources & UI Kits - DesignStore",
    description: "Discover the best collection of premium UI kits, design templates, icons, and code snippets for designers and developers.",
    type: "website",
    url: "https://design-store-one.vercel.app",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DesignStore - Premium Digital Design Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Digital Design Resources & UI Kits - DesignStore",
    description: "Discover the best collection of premium UI kits, design templates, icons, and code snippets for designers and developers.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://design-store-one.vercel.app",
  },
};

export default function Home() {
  return (
    <>
      {/* Structured Data for Homepage */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "DesignStore",
            "description": "Premium digital design resources marketplace for designers and developers",
            "url": "https://design-store-one.vercel.app",
            "logo": "https://design-store-one.vercel.app/logo.png",
            "image": "https://design-store-one.vercel.app/og-image.jpg",
            "telephone": "+1-555-DESIGN",
            "priceRange": "$10-$200",
            "currenciesAccepted": "USD",
            "paymentAccepted": ["Credit Card", "PayPal", "Stripe"],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "247"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Digital Design Products",
              "itemListElement": [
                {
                  "@type": "OfferCatalog",
                  "name": "UI Kits",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Product",
                        "name": "Premium UI Kits",
                        "description": "Professional UI components and design systems"
                      }
                    }
                  ]
                },
                {
                  "@type": "OfferCatalog", 
                  "name": "Templates",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Product",
                        "name": "Design Templates",
                        "description": "Ready-to-use website and app templates"
                      }
                    }
                  ]
                }
              ]
            }
          })
        }}
      />
      
      <div className="bg-white">
        <Hero />
        <FeaturedProducts />
        <NewsletterSignUp />
      </div>
    </>
  );
}
