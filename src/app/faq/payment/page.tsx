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
    { name: "Credit Cards", description: "Visa, MasterCard, American Express", icon: "💳" },
    { name: "PayPal", description: "Secure PayPal payments", icon: "🔵" },
    { name: "Digital Wallets", description: "Apple Pay, Google Pay", icon: "📱" },
    { name: "Bank Transfer", description: "Direct bank transfers", icon: "🏦" }
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
                <span className="text-2xl mr-4">{method.icon}</span>
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
