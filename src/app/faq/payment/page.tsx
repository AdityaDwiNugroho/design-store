import Link from 'next/link';
import { CreditCard, ArrowLeft, DollarSign, Receipt, AlertCircle, Shield } from 'lucide-react';

export default function PaymentBillingFAQ() {
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through our trusted payment partners with SSL encryption and fraud protection.",
      icon: CreditCard
    },
    {
      question: "How do refunds work?",
      answer: "We offer a 14-day money-back guarantee. To request a refund, contact our support team with your order number and reason for the refund. Refunds are processed within 3-5 business days to your original payment method. Note: No refunds after downloading the product.",
      icon: DollarSign
    },
    {
      question: "Can I get an invoice for my purchase?",
      answer: "Yes! You'll automatically receive a detailed invoice via email after each purchase. You can also download invoices from your account dashboard under 'Billing History'. Invoices include all necessary details for business expense reporting and tax purposes.",
      icon: Receipt
    },
    {
      question: "Are there any additional fees?",
      answer: "No hidden fees! The price you see is the price you pay. All taxes are calculated and displayed at checkout before payment. Payment processing fees are included in the listed price. International customers may see currency conversion fees from their bank.",
      icon: AlertCircle
    }
  ];

  const paymentMethods = [
    { 
      name: "Credit Cards", 
      description: "Visa, MasterCard, American Express", 
      icon: () => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="6" width="20" height="12" rx="2" stroke="#374151" strokeWidth="1.5" fill="#f3f4f6"/>
          <rect x="2" y="9" width="20" height="2" fill="#374151"/>
          <rect x="4" y="13" width="4" height="1" fill="#374151"/>
          <rect x="10" y="13" width="2" height="1" fill="#374151"/>
        </svg>
      )
    },
    { 
      name: "PayPal", 
      description: "Secure PayPal payments", 
      icon: () => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.651C5.026 2.047 5.531 1.5 6.137 1.5h7.956c1.621 0 3.022.26 4.204 1.181 1.182.921 1.773 2.363 1.773 4.325 0 2.005-.639 3.534-1.916 4.587-1.277 1.053-3.158 1.579-5.644 1.579H10.75l-.937 4.565c-.058.282-.312.5-.594.5H7.076z" fill="#0070ba"/>
          <path d="M6.24 13.52h2.45c2.486 0 4.367-.526 5.644-1.579C15.611 10.888 16.25 9.359 16.25 7.354c0-1.962-.591-3.404-1.773-4.325C13.295 2.108 11.894 1.848 10.273 1.848H8.727c-.606 0-1.111.547-1.193 1.151L6.24 13.52z" fill="#001c64"/>
        </svg>
      )
    },
    { 
      name: "Digital Wallets", 
      description: "Apple Pay, Google Pay", 
      icon: () => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="14" rx="3" stroke="#374151" strokeWidth="1.5" fill="none"/>
          <path d="M8 12c0-1.5 1-2.5 2.5-2.5S13 10.5 13 12s-1 2.5-2.5 2.5S8 13.5 8 12z" fill="#4ade80"/>
          <path d="M14 12c0-1.5 1-2.5 2.5-2.5S19 10.5 19 12s-1 2.5-2.5 2.5S14 13.5 14 12z" fill="#3b82f6"/>
          <circle cx="7" cy="8" r="1" fill="#6b7280"/>
          <path d="M12 6v2M12 14v2" stroke="#374151" strokeWidth="1"/>
        </svg>
      )
    },
    { 
      name: "Bank Transfer", 
      description: "Direct bank transfers", 
      icon: () => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 8l10-6 10 6v2H2V8z" fill="#374151"/>
          <rect x="4" y="10" width="2" height="8" fill="#6b7280"/>
          <rect x="7" y="10" width="2" height="8" fill="#6b7280"/>
          <rect x="11" y="10" width="2" height="8" fill="#6b7280"/>
          <rect x="15" y="10" width="2" height="8" fill="#6b7280"/>
          <rect x="18" y="10" width="2" height="8" fill="#6b7280"/>
          <rect x="2" y="18" width="20" height="2" fill="#374151"/>
        </svg>
      )
    }
  ];

  const relatedArticles = [
    "Understanding your invoice",
    "Payment security and protection",
    "International payment options",
    "Subscription billing explained"
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
            <span className="text-gray-900">Payment & Billing</span>
          </nav>
          
          <div className="flex items-center mb-6">
            <Link href="/help" className="flex items-center text-blue-600 hover:text-blue-700 mr-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Help Center
            </Link>
          </div>

          <div className="flex items-center mb-4">
            <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Payment & Billing</h1>
              <p className="text-gray-600 mt-2">Questions about payments, refunds, and billing</p>
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

        {/* Payment Methods */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Shield className="w-5 h-5 text-green-600 mr-2" />
            Accepted Payment Methods
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="mr-4">
                  <method.icon />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{method.name}</h4>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 p-6 rounded-xl mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 text-green-600 mr-2" />
            Payment Security
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• All payments are secured with 256-bit SSL encryption</li>
            <li>• We never store your credit card information</li>
            <li>• PCI DSS compliant payment processing</li>
            <li>• Fraud protection and monitoring included</li>
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
                <Receipt className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-gray-700 hover:text-gray-900">{article}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-gray-900 text-white p-8 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-4">Still need help?</h3>
          <p className="text-gray-300 mb-6">
            Have questions about billing or need help with a payment issue?
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
