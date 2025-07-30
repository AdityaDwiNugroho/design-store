import Link from 'next/link';
import { Download, ArrowLeft, Clock, FileText, RefreshCw, Package } from 'lucide-react';

export default function DownloadsDeliveryFAQ() {
  const faqs = [
    {
      question: "How do I download my purchased items?",
      answer: "After completing your purchase, you'll receive an email with download links. You can also access your downloads by logging into your account and visiting the 'My Downloads' section. Each product will have a download button that allows you to get the files immediately.",
      icon: Download
    },
    {
      question: "Where can I find my download links?",
      answer: "Download links are available in three places: 1) In your purchase confirmation email, 2) In your account dashboard under 'My Purchases', and 3) In the order confirmation page immediately after payment. All links remain active for unlimited downloads.",
      icon: FileText
    },
    {
      question: "Can I re-download my products?",
      answer: "Yes! You can re-download your purchased products at any time. Simply log into your account, go to 'My Downloads', and click the download button for any product you've purchased. There's no limit on the number of times you can download your items.",
      icon: RefreshCw
    },
    {
      question: "What file formats are included?",
      answer: "Our products come in various formats depending on the type: Design files (.sketch, .fig, .psd, .ai), Code files (.html, .css, .js, .tsx), Assets (.png, .jpg, .svg, .ico), and Documentation (.pdf, .md). Each product page lists the specific formats included.",
      icon: Package
    }
  ];

  const relatedArticles = [
    "Troubleshooting download issues",
    "Understanding file formats",
    "Managing your download history",
    "Mobile download instructions"
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
            <span className="text-gray-900">Downloads & Delivery</span>
          </nav>
          
          <div className="flex items-center mb-6">
            <Link href="/help" className="flex items-center text-blue-600 hover:text-blue-700 mr-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Help Center
            </Link>
          </div>

          <div className="flex items-center mb-4">
            <Download className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Downloads & Delivery</h1>
              <p className="text-gray-600 mt-2">How to access and download your purchased products</p>
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

        {/* Quick Tips */}
        <div className="bg-blue-50 p-6 rounded-xl mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            Quick Tips
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Check your spam folder if you don&apos;t receive the download email</li>
            <li>• Downloads are processed instantly after payment confirmation</li>
            <li>• Use a stable internet connection for large file downloads</li>
            <li>• Contact support if download links don&apos;t work after 10 minutes</li>
          </ul>
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
                <FileText className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-gray-700 hover:text-gray-900">{article}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We&apos;re constantly adding new products and categories. 
              Subscribe to our newsletter to get notified of new releases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full sm:w-auto"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-gray-900 text-white p-8 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-4">Still need help?</h3>
          <p className="text-gray-300 mb-6">
            Can&apos;t find what you&apos;re looking for? Our support team is ready to assist you.
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
