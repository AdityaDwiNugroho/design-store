import Link from 'next/link';
import { Download, ArrowLeft, CheckCircle, AlertCircle, RefreshCw, Mail } from 'lucide-react';

export default function HowToDownloadArticle() {
  const steps = [
    {
      step: 1,
      title: "Complete Your Purchase",
      description: "After successful payment, you'll receive an order confirmation email with your download links.",
      icon: CheckCircle
    },
    {
      step: 2,
      title: "Check Your Email",
      description: "Look for an email from us with the subject 'Your Digital Products Are Ready'. Check spam if needed.",
      icon: Mail
    },
    {
      step: 3,
      title: "Access Your Account",
      description: "Log into your account and navigate to 'My Downloads' or 'Order History'.",
      icon: RefreshCw
    },
    {
      step: 4,
      title: "Download Your Files",
      description: "Click the download button next to each product to get your files instantly.",
      icon: Download
    }
  ];

  const troubleshooting = [
    {
      problem: "Download link not working",
      solution: "Try refreshing the page or clearing your browser cache. Contact support if the issue persists."
    },
    {
      problem: "Files won't download",
      solution: "Check your internet connection and available storage space. Try using a different browser."
    },
    {
      problem: "Can't find download email",
      solution: "Check your spam folder and ensure you used the correct email address during purchase."
    },
    {
      problem: "Download is corrupted",
      solution: "Re-download the file. If it's still corrupted, contact our support team for assistance."
    }
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
            <Link href="/faq/downloads" className="hover:text-gray-900">Downloads & Delivery</Link>
            <span>/</span>
            <span className="text-gray-900">How to Download</span>
          </nav>
          
          <div className="flex items-center mb-6">
            <Link href="/faq/downloads" className="flex items-center text-blue-600 hover:text-blue-700 mr-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Downloads FAQ
            </Link>
          </div>

          <div className="flex items-center mb-4">
            <Download className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">How to Download Your Purchased Products</h1>
              <p className="text-gray-600 mt-2">Complete step-by-step guide to accessing your digital downloads</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-blue-50 p-6 rounded-xl mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Quick Overview</h2>
          <p className="text-gray-700">
            Once you complete your purchase, you&apos;ll have immediate access to download your digital products. 
            This guide walks you through the entire process, from purchase to downloading your files.
          </p>
        </div>

        {/* Step by Step Guide */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Step-by-Step Download Process</h2>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold">{step.step}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <step.icon className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alternative Methods */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Alternative Download Methods</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium text-gray-900">Direct Email Links</h4>
              <p className="text-gray-600">Use the download links sent directly to your email after purchase.</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-medium text-gray-900">Account Dashboard</h4>
              <p className="text-gray-600">Access all your purchases through your account&apos;s download section.</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-medium text-gray-900">Order Confirmation Page</h4>
              <p className="text-gray-600">Download immediately from the thank you page after payment.</p>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-yellow-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            Common Issues & Solutions
          </h3>
          <div className="space-y-4">
            {troubleshooting.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-gray-900 mb-2">❓ {item.problem}</h4>
                <p className="text-gray-700">💡 {item.solution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* File Organization Tips */}
        <div className="bg-green-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">File Organization Tips</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Create a dedicated folder for your digital downloads</li>
            <li>• Organize files by product type or purchase date</li>
            <li>• Keep download emails for future reference</li>
            <li>• Backup important files to cloud storage</li>
            <li>• Extract zip files to access all included assets</li>
          </ul>
        </div>

        {/* Technical Requirements */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Browser Requirements</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Modern browser (Chrome, Firefox, Safari, Edge)</li>
                <li>• JavaScript enabled</li>
                <li>• Cookies enabled</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">System Requirements</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Stable internet connection</li>
                <li>• Sufficient storage space</li>
                <li>• File extraction software (for zip files)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-gray-900 text-white p-8 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-4">Still having trouble downloading?</h3>
          <p className="text-gray-300 mb-6">
            Our support team is here to help you access your purchased products.
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
