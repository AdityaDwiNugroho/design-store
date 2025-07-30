import Link from 'next/link';
import { CheckCircle, Download, Mail, Home } from 'lucide-react';

interface CheckoutSuccessProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function CheckoutSuccess({ searchParams }: CheckoutSuccessProps) {
  const params = await searchParams;
  const sessionId = params.session_id;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and you&apos;ll receive your digital products shortly.
          </p>

          {/* Order Details */}
          {sessionId && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
              <div className="text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">{sessionId.slice(-8).toUpperCase()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">What&apos;s Next?</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">Check your email for order confirmation and download links</span>
              </div>
              <div className="flex items-center">
                <Download className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">Download your products immediately from the links provided</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-700">Keep your receipt for future reference</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Need Help?
            </Link>
          </div>

          {/* Support Note */}
          <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Having trouble downloading?</strong> Check your spam folder or{' '}
              <Link href="/contact" className="text-blue-600 hover:text-blue-700">
                contact our support team
              </Link>{' '}
              for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
