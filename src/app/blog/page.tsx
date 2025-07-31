import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: "Design Blog - Tips, Tutorials & Resources | DesignStore",
  description: "Stay updated with the latest design trends, tutorials, and resources. Expert insights on UI/UX design, development tools, and premium design resources.",
  keywords: [
    "design blog", "UI design tutorials", "UX resources", "design trends",
    "web design tips", "mobile design", "design tools", "design inspiration"
  ],
  openGraph: {
    title: "Design Blog - Tips, Tutorials & Resources",
    description: "Expert insights on UI/UX design, development tools, and premium design resources.",
    type: "website",
    url: "https://design-store-one.vercel.app/blog",
  },
  alternates: {
    canonical: "https://design-store-one.vercel.app/blog",
  },
};

export default function BlogIndex() {
  const featuredPosts = [
    {
      title: "UI Design Trends 2025: What's Next in Digital Design",
      excerpt: "Explore the latest UI design trends for 2025. From AI-powered interfaces to sustainable design practices, discover what's shaping the future of digital design.",
      slug: "ui-design-trends-2025",
      date: "2025-01-31",
      readTime: "12 min read",
      category: "Design Trends",
      featured: true
    },
    {
      title: "Best UI Kits 2025: Premium Design Resources",
      excerpt: "Discover the most comprehensive collection of premium UI kits for 2025. These carefully curated design resources will accelerate your development process.",
      slug: "best-ui-kits-2025",
      date: "2025-01-01",
      readTime: "8 min read",
      category: "Design Resources",
      featured: true
    },
    {
      title: "Modern Dashboard Design Trends",
      excerpt: "Explore the latest trends in dashboard design and learn how to create intuitive, data-driven interfaces that users love.",
      slug: "modern-dashboard-design-trends",
      date: "2024-12-28",
      readTime: "6 min read",
      category: "Design Trends"
    },
    {
      title: "Mobile-First Design Principles",
      excerpt: "Master the art of mobile-first design with these essential principles and best practices for creating exceptional mobile experiences.",
      slug: "mobile-first-design-principles",
      date: "2024-12-25",
      readTime: "10 min read",
      category: "Mobile Design"
    },
    {
      title: "Color Psychology in UI Design",
      excerpt: "Understanding how colors affect user behavior and emotions can dramatically improve your design effectiveness.",
      slug: "color-psychology-ui-design",
      date: "2024-12-22",
      readTime: "7 min read",
      category: "Design Theory"
    }
  ];

  const categories = [
    { name: "Design Resources", count: 12, color: "bg-blue-100 text-blue-800" },
    { name: "Design Trends", count: 8, color: "bg-purple-100 text-purple-800" },
    { name: "Mobile Design", count: 6, color: "bg-green-100 text-green-800" },
    { name: "Design Theory", count: 10, color: "bg-orange-100 text-orange-800" },
    { name: "Tools & Tips", count: 15, color: "bg-red-100 text-red-800" }
  ];

  return (
    <>
      {/* Structured Data for Blog */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "DesignStore Blog",
            "description": "Expert insights on UI/UX design, development tools, and premium design resources",
            "url": "https://design-store-one.vercel.app/blog",
            "publisher": {
              "@type": "Organization",
              "name": "DesignStore",
              "logo": {
                "@type": "ImageObject",
                "url": "https://design-store-one.vercel.app/logo.png"
              }
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": featuredPosts.map((post, index) => ({
                "@type": "BlogPosting",
                "position": index + 1,
                "headline": post.title,
                "description": post.excerpt,
                "url": `https://design-store-one.vercel.app/blog/${post.slug}`,
                "datePublished": post.date,
                "author": {
                  "@type": "Person",
                  "name": "Aditya Dwi Nugroho"
                }
              }))
            }
          })
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Design Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest design trends, tutorials, and expert insights. 
            Discover premium resources and tips to elevate your design workflow.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            {featuredPosts[0] && (
              <div className="mb-16">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl mb-8">
                  <div className="max-w-3xl">
                    <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
                      Featured Post
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {featuredPosts[0].title}
                    </h2>
                    <p className="text-lg text-blue-100 mb-6">
                      {featuredPosts[0].excerpt}
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-blue-100 mb-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPosts[0].date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPosts[0].readTime}</span>
                      </div>
                    </div>
                    <Link 
                      href={`/blog/${featuredPosts[0].slug}`}
                      className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Posts */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Articles</h2>
              <div className="grid gap-8">
                {featuredPosts.slice(1).map((post, index) => (
                  <article key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        post.category === 'Design Trends' ? 'bg-purple-100 text-purple-800' :
                        post.category === 'Mobile Design' ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {post.category}
                      </span>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Categories */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/blog/category/${category.name.toLowerCase().replace(' ', '-')}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${category.color}`}>
                        {category.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Updated</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Get the latest design tips, tutorials, and resources delivered to your inbox.
                </p>
                <Link
                  href="/#newsletter"
                  className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Subscribe Now
                </Link>
              </div>

              {/* Popular Resources */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Resources</h3>
                <div className="space-y-3">
                  <Link href="/products" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900 text-sm">UI Kits Collection</div>
                    <div className="text-xs text-gray-600">Premium design components</div>
                  </Link>
                  <Link href="/products" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900 text-sm">Template Library</div>
                    <div className="text-xs text-gray-600">Ready-to-use templates</div>
                  </Link>
                  <Link href="/products" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900 text-sm">Icon Packs</div>
                    <div className="text-xs text-gray-600">Professional icon sets</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
