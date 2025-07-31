import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "About Us - DesignStore | Premium Digital Design Resources",
  description: "Learn about DesignStore's mission to provide premium digital design resources for designers and developers worldwide. Discover our story and commitment to quality.",
  keywords: [
    "about designstore", "design company", "digital resources", "design team",
    "mission", "quality design", "professional resources"
  ],
  openGraph: {
    title: "About Us - DesignStore",
    description: "Learn about DesignStore's mission to provide premium digital design resources for designers and developers worldwide.",
    type: "website",
    url: "https://design-store-one.vercel.app/about",
  },
  alternates: {
    canonical: "https://design-store-one.vercel.app/about",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Structured Data for About Page */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "DesignStore",
              "description": "Premium digital design resources marketplace",
              "url": "https://design-store-one.vercel.app",
              "founder": {
                "@type": "Person",
                "name": "Aditya Dwi Nugroho",
                "url": "https://github.com/AdityaDwiNugroho"
              },
              "foundingDate": "2024",
              "numberOfEmployees": "5-10",
              "industry": "Digital Design",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              }
            }
          })
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <span className="text-gray-900">About</span>
        </nav>

        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About DesignStore
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re passionate about providing designers and developers with the highest 
            quality digital resources to accelerate their creative workflow.
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <h2>Our Mission</h2>
          <p>
            DesignStore was founded with a simple mission: to democratize access to 
            premium design resources. We believe that great design shouldn&apos;t be limited 
            by budget constraints or resource availability.
          </p>

          <h2>What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium UI Kits</h3>
              <p className="text-gray-600">
                Carefully crafted UI components and design systems that save you time 
                and ensure consistency across your projects.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Design Templates</h3>
              <p className="text-gray-600">
                Ready-to-use templates for websites, mobile apps, and digital products 
                that you can customize to match your brand.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Icon Collections</h3>
              <p className="text-gray-600">
                Comprehensive icon sets designed with pixel-perfect precision and 
                available in multiple formats.
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Code Snippets</h3>
              <p className="text-gray-600">
                Reusable code components and snippets that help developers implement 
                designs faster and more efficiently.
              </p>
            </div>
          </div>

          <h2>Our Commitment to Quality</h2>
          <p>
            Every resource in our marketplace goes through a rigorous quality assurance 
            process. We work with talented designers and developers to ensure that each 
            product meets our high standards for:
          </p>
          <ul>
            <li><strong>Design Excellence:</strong> Modern, clean, and professional aesthetics</li>
            <li><strong>Technical Quality:</strong> Well-structured, optimized files</li>
            <li><strong>Usability:</strong> Easy to implement and customize</li>
            <li><strong>Documentation:</strong> Clear instructions and guidelines</li>
            <li><strong>Support:</strong> Responsive customer service and updates</li>
          </ul>

          <h2>Join Our Community</h2>
          <p>
            DesignStore is more than just a marketplace—it&apos;s a community of creative 
            professionals sharing knowledge, inspiration, and resources. Whether you&apos;re 
            a seasoned designer or just starting your journey, we&apos;re here to support 
            your growth and success.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Elevate Your Designs?
          </h3>
          <p className="text-gray-600 mb-6">
            Explore our collection of premium design resources and take your projects 
            to the next level.
          </p>
          <Link 
            href="/products" 
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Browse Resources
          </Link>
        </div>
      </div>
    </>
  );
}
