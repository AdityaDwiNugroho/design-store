'use client';

import Link from 'next/link';
import { Search, MessageCircle, Book, Download, CreditCard, Shield, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{
    type: string;
    title: string;
    description: string;
    link: string;
    keywords: string[];
  }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const allContent = [
    // FAQ Categories
    { type: 'category', title: 'Downloads & Delivery', description: 'How to access and download your purchased products', link: '/faq/downloads', keywords: ['download', 'delivery', 'access', 'files', 'products'] },
    { type: 'category', title: 'Payment & Billing', description: 'Questions about payments, refunds, and billing', link: '/faq/payment', keywords: ['payment', 'billing', 'refund', 'credit card', 'invoice'] },
    { type: 'category', title: 'Licenses & Usage', description: 'Understanding your rights and usage permissions', link: '/faq/licenses', keywords: ['license', 'usage', 'commercial', 'rights', 'permissions'] },
    { type: 'category', title: 'Account & Orders', description: 'Managing your account and order history', link: '/faq/account', keywords: ['account', 'orders', 'profile', 'history', 'settings'] },
    
    // Articles
    { type: 'article', title: 'How to download your purchased products', description: 'Complete step-by-step guide to accessing your digital downloads', link: '/articles/how-to-download', keywords: ['download', 'purchased', 'products', 'guide', 'access'] },
    { type: 'article', title: 'Understanding our license types', description: 'Learn about different license types and usage rights', link: '/articles/license-types', keywords: ['license', 'types', 'commercial', 'personal', 'usage'] },
    { type: 'article', title: 'Getting started with digital design assets', description: 'How to use and implement your downloaded design files', link: '/articles/getting-started', keywords: ['design', 'assets', 'getting started', 'implementation'] },
    { type: 'article', title: 'Troubleshooting download issues', description: 'Common download problems and their solutions', link: '/articles/download-troubleshooting', keywords: ['troubleshooting', 'download', 'issues', 'problems', 'solutions'] },
    { type: 'article', title: 'Commercial usage guidelines', description: 'How to use products in commercial projects', link: '/articles/commercial-usage', keywords: ['commercial', 'usage', 'guidelines', 'business', 'projects'] },
    { type: 'article', title: 'Account security best practices', description: 'Keep your account safe and secure', link: '/articles/account-security', keywords: ['account', 'security', 'password', 'safety', 'protection'] }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 1) {
      const results = allContent.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6);
      setSearchResults(results);
      setShowSuggestions(true);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  };
  const faqCategories = [
    {
      icon: Download,
      title: "Downloads & Delivery",
      description: "How to access and download your purchased products",
      link: "/faq/downloads",
      items: [
        "How do I download my purchased items?",
        "Where can I find my download links?",
        "Can I re-download my products?",
        "What file formats are included?"
      ]
    },
    {
      icon: CreditCard,
      title: "Payment & Billing",
      description: "Questions about payments, refunds, and billing",
      link: "/faq/payment",
      items: [
        "What payment methods do you accept?",
        "How do refunds work?",
        "Can I get an invoice for my purchase?",
        "Are there any additional fees?"
      ]
    },
    {
      icon: Shield,
      title: "Licenses & Usage",
      description: "Understanding your rights and usage permissions",
      link: "/faq/licenses",
      items: [
        "What can I do with the products I purchase?",
        "Can I use items for commercial projects?",
        "Are there any usage restrictions?",
        "Can I modify the downloaded files?"
      ]
    },
    {
      icon: Book,
      title: "Account & Orders",
      description: "Managing your account and order history",
      link: "/faq/account",
      items: [
        "How do I create an account?",
        "Where can I view my order history?",
        "How do I update my account information?",
        "Can I change my email address?"
      ]
    }
  ];

  const popularArticles = [
    { title: "How to download your purchased products", link: "/articles/how-to-download" },
    { title: "Understanding our license types", link: "/articles/license-types" },
    { title: "Getting started with digital design assets", link: "/articles/getting-started" },
    { title: "Troubleshooting download issues", link: "/articles/download-troubleshooting" },
    { title: "Commercial usage guidelines", link: "/articles/commercial-usage" },
    { title: "Account security best practices", link: "/articles/account-security" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Help Center</span>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              How can we help you?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Find answers to common questions, browse our guides, or get in touch with our support team.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-lg mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                placeholder="Search for help articles..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              {/* Search Suggestions */}
              {showSuggestions && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {searchResults.map((result, index) => (
                    <Link
                      key={index}
                      href={result.link}
                      className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      onClick={() => setShowSuggestions(false)}
                    >
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-3 ${result.type === 'category' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                        <div>
                          <div className="font-medium text-gray-900">{result.title}</div>
                          <div className="text-sm text-gray-600">{result.description}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="/contact" className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow group">
            <MessageCircle className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-gray-600 mb-4">Get personalized help from our support team</p>
            <div className="flex items-center text-blue-600 group-hover:text-blue-700">
              <span className="text-sm font-medium">Get in touch</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <Book className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
            <p className="text-gray-600 mb-4">Comprehensive guides and tutorials</p>
            <div className="flex items-center text-green-600">
              <span className="text-sm font-medium">Browse docs</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <Download className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Download Center</h3>
            <p className="text-gray-600 mb-4">Access all your purchased products</p>
            <div className="flex items-center text-purple-600">
              <span className="text-sm font-medium">View downloads</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqCategories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center mb-4">
                  <category.icon className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <ul className="space-y-2 mb-4">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a href="#" className="text-blue-600 hover:text-blue-700 text-sm">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
                <Link 
                  href={category.link} 
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all questions
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="bg-white p-8 rounded-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularArticles.map((article, index) => (
              <Link
                key={index}
                href={article.link}
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Book className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-gray-700 hover:text-gray-900">{article.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-blue-50 p-8 rounded-xl mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
