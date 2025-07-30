import Link from 'next/link';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';

interface SuccessPageProps {
  searchParams: {
    session_id?: string;
  };
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams.session_id;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for your purchase! Your payment has been processed successfully.
          </p>

          {sessionId && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-2">Order ID:</p>
              <p className="text-sm font-mono text-gray-800 break-all">
                {sessionId}
              </p>
            </div>
          )}

          {/* Next Steps */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <Download className="w-5 h-5 text-blue-600 mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">
                  Check Your Email
                </p>
                <p className="text-xs text-gray-600">
                  Download links have been sent to your email
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">
                  Account Access
                </p>
                <p className="text-xs text-gray-600">
                  Products are now available in your account
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/account/downloads"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              View Downloads
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            
            <Link
              href="/products"
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Support */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Need help? Contact our support team
          </p>
          <Link 
            href="/contact" 
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Get Support
          </Link>
        </div>
      </div>
    </div>
  );
}
