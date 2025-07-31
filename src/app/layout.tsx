import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1f2937' }
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://design-store-one.vercel.app'),
  title: {
    default: "DesignStore - Premium Digital Design Resources & UI Kits",
    template: "%s | DesignStore - Premium Digital Design Resources"
  },
  description: "Discover premium UI kits, templates, icons, and code snippets for designers and developers. High-quality digital products to accelerate your workflow and boost productivity.",
  keywords: [
    "UI kits", "design templates", "digital products", "web design", "mobile design",
    "icons", "code snippets", "design resources", "premium templates", "design assets",
    "figma templates", "sketch files", "adobe xd", "react components", "vue components",
    "tailwind css", "bootstrap templates", "dashboard templates", "landing page templates",
    "e-commerce design", "app design", "website templates", "graphic design", "design system"
  ],
  authors: [{ name: "Aditya Dwi Nugroho", url: "https://github.com/AdityaDwiNugroho" }],
  creator: "Aditya Dwi Nugroho",
  publisher: "DesignStore",
  category: "Design & Development",
  classification: "Digital Products Marketplace",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "DesignStore",
    title: "DesignStore - Premium Digital Design Resources & UI Kits",
    description: "Discover premium UI kits, templates, icons, and code snippets for designers and developers. High-quality digital products to accelerate your workflow.",
    url: "https://design-store-one.vercel.app",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DesignStore - Premium Digital Design Resources",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ProgrammerADN",
    creator: "@ProgrammerADN",
    title: "DesignStore - Premium Digital Design Resources & UI Kits",
    description: "Discover premium UI kits, templates, icons, and code snippets for designers and developers.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://design-store-one.vercel.app",
    languages: {
      'en-US': 'https://design-store-one.vercel.app',
    },
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "DesignStore",
    "mobile-web-app-capable": "yes",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "DesignStore",
              "description": "Premium digital design resources marketplace for designers and developers",
              "url": "https://design-store-one.vercel.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://design-store-one.vercel.app/products?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "DesignStore",
                "url": "https://design-store-one.vercel.app",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://design-store-one.vercel.app/logo.png"
                }
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1" role="main">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
