import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: "Best UI Kits 2025 - Premium Design Resources | DesignStore",
  description: "Discover the best UI kits for 2025. Comprehensive collection of premium design components, templates, and resources for modern web and mobile app development.",
  keywords: [
    "best UI kits 2025", "premium UI components", "design system", "web design",
    "mobile UI", "dashboard UI", "modern UI kits", "design resources", "templates"
  ],
  openGraph: {
    title: "Best UI Kits 2025 - Premium Design Resources",
    description: "Discover the best UI kits for 2025. Premium design components and templates for modern development.",
    type: "article",
    url: "https://design-store-one.vercel.app/blog/best-ui-kits-2025",
  },
  alternates: {
    canonical: "https://design-store-one.vercel.app/blog/best-ui-kits-2025",
  },
};

export default function BestUIKits2025() {
  const uiKits = [
    {
      name: "Modern Dashboard Pro",
      description: "Complete dashboard solution with 200+ components",
      features: ["Dark/Light mode", "50+ Charts", "Responsive design"],
      rating: 4.9,
      downloads: "12K+",
      price: 89
    },
    {
      name: "Mobile First UI Kit",
      description: "Perfect for mobile app development with native feel",
      features: ["iOS/Android ready", "100+ screens", "Design system"],
      rating: 4.8,
      downloads: "8K+",
      price: 59
    },
    {
      name: "E-commerce Suite",
      description: "Everything you need for modern online stores",
      features: ["Shopping cart", "Product pages", "Checkout flow"],
      rating: 4.7,
      downloads: "15K+",
      price: 79
    }
  ];

  return (
    <>
      {/* Structured Data for Article */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Best UI Kits 2025 - Premium Design Resources",
            "description": "Discover the best UI kits for 2025. Comprehensive collection of premium design components, templates, and resources for modern web and mobile app development.",
            "author": {
              "@type": "Person",
              "name": "Aditya Dwi Nugroho",
              "url": "https://github.com/AdityaDwiNugroho"
            },
            "publisher": {
              "@type": "Organization",
              "name": "DesignStore",
              "logo": {
                "@type": "ImageObject",
                "url": "https://design-store-one.vercel.app/logo.png"
              }
            },
            "datePublished": "2025-01-01",
            "dateModified": new Date().toISOString(),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://design-store-one.vercel.app/blog/best-ui-kits-2025"
            },
            "articleSection": "Design Resources",
            "keywords": ["UI kits", "design resources", "web design", "mobile design"]
          })
        }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gray-900">Blog</Link>
            <span>/</span>
            <span className="text-gray-900">Best UI Kits 2025</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Best UI Kits 2025: Premium Design Resources for Modern Development
          </h1>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-8">
            <div className="flex items-center space-x-2">
              <Image src="/author.jpg" alt="Aditya Dwi Nugroho" width={32} height={32} className="w-8 h-8 rounded-full" />
              <span>By Aditya Dwi Nugroho</span>
            </div>
            <time dateTime="2025-01-01">January 1, 2025</time>
            <span>8 min read</span>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed">
            Discover the most comprehensive collection of premium UI kits for 2025. 
            These carefully curated design resources will accelerate your development 
            process and help you create stunning, professional interfaces.
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <h2>Why UI Kits Are Essential in 2025</h2>
          <p>
            In today&apos;s fast-paced development environment, UI kits have become indispensable 
            tools for designers and developers. They provide consistent, professional-grade 
            components that can dramatically reduce development time while ensuring high-quality results.
          </p>

          <h3>Key Benefits of Premium UI Kits:</h3>
          <ul>
            <li><strong>Time Efficiency:</strong> Pre-built components save countless hours</li>
            <li><strong>Consistency:</strong> Unified design language across your project</li>
            <li><strong>Professional Quality:</strong> Expertly crafted designs</li>
            <li><strong>Customization:</strong> Easy to adapt to your brand</li>
            <li><strong>Documentation:</strong> Clear guidelines and examples</li>
          </ul>

          <h2>Top UI Kits for 2025</h2>
          
          <div className="not-prose grid gap-8 my-12">
            {uiKits.map((kit, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{kit.name}</h3>
                  <div className="text-2xl font-bold text-blue-600">${kit.price}</div>
                </div>
                
                <p className="text-gray-600 mb-4">{kit.description}</p>
                
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{kit.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{kit.downloads} downloads</span>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {kit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/products" 
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <h2>Choosing the Right UI Kit</h2>
          <p>
            When selecting a UI kit for your project, consider these important factors:
          </p>

          <h3>Design Quality</h3>
          <p>
            Look for kits with modern, clean designs that align with current trends. 
            Pay attention to typography, spacing, and color schemes.
          </p>

          <h3>Component Variety</h3>
          <p>
            Ensure the kit includes all the components you need: buttons, forms, 
            navigation, cards, modals, and specialized elements for your use case.
          </p>

          <h3>Responsiveness</h3>
          <p>
            In 2025, mobile-first design is non-negotiable. Choose kits that 
            provide excellent responsive behavior across all devices.
          </p>

          <h3>Documentation & Support</h3>
          <p>
            Good documentation and active support can make the difference between 
            a smooth implementation and hours of frustration.
          </p>

          <h2>Conclusion</h2>
          <p>
            Investing in high-quality UI kits is one of the best decisions you can 
            make for your development workflow in 2025. They not only save time but 
            also ensure your projects maintain professional standards and consistency.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Accelerate Your Design Workflow?
          </h3>
          <p className="text-gray-600 mb-6">
            Browse our complete collection of premium UI kits and find the perfect 
            resources for your next project.
          </p>
          <Link 
            href="/products" 
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <span>Browse UI Kits</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </article>
    </>
  );
}
