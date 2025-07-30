import Link from 'next/link';
import { User, ArrowLeft, UserPlus, History, Settings, Mail } from 'lucide-react';

export default function AccountOrdersFAQ() {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Creating an account is simple! Click 'Sign Up' in the top right corner, enter your email and create a password. You can also sign up during checkout. An account helps you track orders, access downloads, and manage your purchases easily.",
      icon: UserPlus
    },
    {
      question: "Where can I view my order history?",
      answer: "Log into your account and visit the 'My Orders' section in your dashboard. Here you'll see all your past purchases, order dates, amounts, and status. You can also download invoices and access product files from this page.",
      icon: History
    },
    {
      question: "How do I update my account information?",
      answer: "Go to your account dashboard and click 'Account Settings' or 'Profile'. Here you can update your name, billing address, password, and email preferences. Changes are saved automatically and take effect immediately.",
      icon: Settings
    },
    {
      question: "Can I change my email address?",
      answer: "Yes! In your account settings, click 'Change Email Address'. Enter your new email and confirm the change. You'll receive a verification email at your new address to confirm the change. This helps keep your account secure.",
      icon: Mail
    }
  ];

  const accountFeatures = [
    {
      title: "Order History",
      description: "View all your past purchases and download links",
      icon: "📋"
    },
    {
      title: "Quick Downloads",
      description: "Easy access to all your purchased products",
      icon: "⬇️"
    },
    {
      title: "Invoice Management",
      description: "Download invoices for expense reporting",
      icon: "🧾"
    },
    {
      title: "Account Security",
      description: "Manage password and security settings",
      icon: "🔒"
    }
  ];

  const quickActions = [
    { action: "Reset Password", description: "Forgot your password?", link: "/reset-password" },
    { action: "Update Profile", description: "Change account details", link: "/account/profile" },
    { action: "Download History", description: "Access all your files", link: "/account/downloads" },
    { action: "Billing History", description: "View past invoices", link: "/account/billing" }
  ];

  const relatedArticles = [
    "Account security best practices",
    "Managing your profile information",
    "Two-factor authentication setup",
    "Organizing your download library"
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
            <span className="text-gray-900">Account & Orders</span>
          </nav>
          
          <div className="flex items-center mb-6">
            <Link href="/help" className="flex items-center text-blue-600 hover:text-blue-700 mr-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Help Center
            </Link>
          </div>

          <div className="flex items-center mb-4">
            <User className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Account & Orders</h1>
              <p className="text-gray-600 mt-2">Managing your account and order history</p>
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

        {/* Account Features */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accountFeatures.map((feature, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl mr-4">{feature.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-blue-50 p-6 rounded-xl mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow border border-gray-200"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{item.action}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <ArrowLeft className="w-4 h-4 text-gray-400 transform rotate-180" />
              </Link>
            ))}
          </div>
        </div>

        {/* Account Tips */}
        <div className="bg-green-50 p-6 rounded-xl mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <UserPlus className="w-5 h-5 text-green-600 mr-2" />
            Account Tips
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Use a strong, unique password for your account</li>
            <li>• Keep your email address up to date for important notifications</li>
            <li>• Save download links in multiple locations as backup</li>
            <li>• Check your account regularly for new product updates</li>
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
                <User className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-gray-700 hover:text-gray-900">{article}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-gray-900 text-white p-8 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-4">Need account assistance?</h3>
          <p className="text-gray-300 mb-6">
            Having trouble with your account or need help managing your orders?
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
