import Link from 'next/link';
import { Shield, ArrowLeft, Check, X, Edit, Building } from 'lucide-react';

export default function LicensesUsageFAQ() {
  const faqs = [
    {
      question: "What can I do with the products I purchase?",
      answer: "You can use our products for personal projects, client work, commercial projects, and business purposes. This includes websites, apps, presentations, marketing materials, and any other creative projects. You receive full usage rights for the purchased items.",
      icon: Check
    },
    {
      question: "Can I use items for commercial projects?",
      answer: "Yes! All our products come with commercial usage rights. You can use them in projects for clients, sell products that incorporate our designs, and use them in commercial applications. There's no additional licensing fee required for commercial use.",
      icon: Building
    },
    {
      question: "Are there any usage restrictions?",
      answer: "You cannot resell, redistribute, share, or claim ownership of the original products. You can't create competing template/asset marketplaces using our products. You also can't trademark designs or claim exclusive rights to any elements.",
      icon: X
    },
    {
      question: "Can I modify the downloaded files?",
      answer: "Absolutely! You can modify, customize, and adapt all downloaded files to fit your needs. Change colors, fonts, layouts, code, and any other elements. You can combine multiple products and create derivative works for your projects.",
      icon: Edit
    }
  ];

  const licenseTypes = [
    {
      type: "Personal Use",
      description: "Use for personal projects and learning",
      permissions: ["Personal websites", "Learning projects", "Portfolio work", "Non-commercial use"],
      icon: "👤"
    },
    {
      type: "Commercial Use",
      description: "Use for business and client projects",
      permissions: ["Client projects", "Commercial websites", "Apps and software", "Marketing materials"],
      icon: "🏢"
    },
    {
      type: "Extended Rights",
      description: "Full rights with minimal restrictions",
      permissions: ["Unlimited projects", "Modify and customize", "Team collaboration", "Sublicensing allowed"],
      icon: "⭐"
    }
  ];

  const restrictions = [
    "Cannot resell original files",
    "Cannot redistribute to others",
    "Cannot claim ownership of designs",
    "Cannot create competing marketplaces",
    "Cannot trademark original elements"
  ];

  const relatedArticles = [
    "Commercial usage guidelines",
    "Understanding license types",
    "Attribution requirements",
    "Team and agency licensing"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link href="/help" className="hover:text-gray-900">Help Center</Link>
            <span>/</span>
            <span className="text-gray-900">Licenses & Usage</span>
          </nav>
          
          <div className="flex items-center mb-6">
            <Link href="/help" className="flex items-center text-blue-600 hover:text-blue-700 mr-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Help Center
            </Link>
          </div>

          <div className="flex items-center mb-4">
            <Shield className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Licenses & Usage</h1>
              <p className="text-gray-600 mt-2">Understanding your rights and usage permissions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* FAQ Items */}
        <div className="space-y-8 mb-12">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-start">
                <faq.icon className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* License Types */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">License Types</h3>
          <div className="space-y-6">
            {licenseTypes.map((license, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">{license.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{license.type}</h4>
                    <p className="text-sm text-gray-600">{license.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {license.permissions.map((permission, permIndex) => (
                    <div key={permIndex} className="flex items-center text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600 mr-2" />
                      {permission}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restrictions */}
        <div className="bg-red-50 p-6 rounded-xl mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <X className="w-5 h-5 text-red-600 mr-2" />
            Usage Restrictions
          </h3>
          <div className="space-y-2">
            {restrictions.map((restriction, index) => (
              <div key={index} className="flex items-center text-gray-700">
                <X className="w-4 h-4 text-red-600 mr-3 flex-shrink-0" />
                <span>{restriction}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reference */}
        <div className="bg-green-50 p-6 rounded-xl mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Check className="w-5 h-5 text-green-600 mr-2" />
            Quick Reference: What You CAN Do
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <Check className="w-4 h-4 text-green-600 mr-2" />
                Use in unlimited projects
              </div>
              <div className="flex items-center text-gray-700">
                <Check className="w-4 h-4 text-green-600 mr-2" />
                Modify and customize freely
              </div>
              <div className="flex items-center text-gray-700">
                <Check className="w-4 h-4 text-green-600 mr-2" />
                Use for commercial purposes
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <Check className="w-4 h-4 text-green-600 mr-2" />
                Create derivative works
              </div>
              <div className="flex items-center text-gray-700">
                <Check className="w-4 h-4 text-green-600 mr-2" />
                Use in client projects
              </div>
              <div className="flex items-center text-gray-700">
                <Check className="w-4 h-4 text-green-600 mr-2" />
                Combine with other assets
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {relatedArticles.map((article, index) => (
              <Link
                key={index}
                href="#"
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Shield className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-gray-700 hover:text-gray-900">{article}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-gray-900 text-white p-8 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-4">Questions about licensing?</h3>
          <p className="text-gray-300 mb-6">
            Need clarification on usage rights or have specific licensing questions?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
