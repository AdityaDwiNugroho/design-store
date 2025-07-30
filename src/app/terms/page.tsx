import Link from 'next/link';

export default function TermsOfService() {
  const lastUpdated = "January 15, 2024";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Terms of Service</span>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="prose prose-gray max-w-none">
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Digital Products and Services</h2>
            <p className="text-gray-700 mb-4">
              We provide digital design assets, code templates, UI kits, and related digital products (&quot;Products&quot;). By purchasing our Products, you agree to the following:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Products are delivered digitally and are available for immediate download after purchase</li>
              <li>You receive a non-exclusive, non-transferable license to use the Products</li>
              <li>Products may not be resold, redistributed, or shared without explicit permission</li>
              <li>We reserve the right to update or modify Products without notice</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. License and Usage Rights</h2>
            <p className="text-gray-700 mb-4">
              Upon purchase, you are granted the following rights:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li><strong>Personal Use:</strong> Use Products for personal projects and learning</li>
              <li><strong>Commercial Use:</strong> Use Products in commercial projects for yourself or clients</li>
              <li><strong>Modification:</strong> Modify and customize Products to fit your needs</li>
            </ul>
            <p className="text-gray-700 mb-6">
              <strong>Restrictions:</strong> You may not resell, redistribute, share, or claim ownership of the original Products. 
              You cannot create competing products using our assets.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment and Refunds</h2>
            <p className="text-gray-700 mb-4">
              Payment terms and refund policy:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>All payments are processed securely through our payment partners</li>
              <li>Prices are subject to change without notice</li>
              <li>Refunds are available within 14 days of purchase for legitimate reasons</li>
              <li>No refunds after 14 days or after downloading/accessing the Product</li>
              <li>Refund requests must include a valid reason and proof of purchase</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Accounts</h2>
            <p className="text-gray-700 mb-4">
              When creating an account, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Not share your account with others</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 mb-6">
              All Products, content, and materials on this website are protected by intellectual property laws. 
              We retain ownership of all original designs, code, and creative assets. Your purchase grants you usage rights as outlined in Section 3, 
              but does not transfer ownership of intellectual property.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Prohibited Uses</h2>
            <p className="text-gray-700 mb-4">
              You may not use our website or Products for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>Violating any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>Infringing upon or violating our intellectual property rights or the intellectual property rights of others</li>
              <li>Harassing, abusing, insulting, harming, defaming, slandering, disparaging, intimidating, or discriminating</li>
              <li>Submitting false or misleading information</li>
              <li>Creating competing products or services</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers</h2>
            <p className="text-gray-700 mb-6">
              Products are provided &quot;as is&quot; without warranties of any kind. We do not guarantee that Products will meet your specific requirements 
              or that they will be error-free. You use our Products at your own risk.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              In no case shall our company, nor our directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, 
              incidental, punitive, consequential, or special damages arising from your use of our Products or services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Privacy Policy</h2>
            <p className="text-gray-700 mb-6">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, 
              to understand our practices.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page. 
              Your continued use of our services after changes have been posted constitutes acceptance of the modified terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
            <p className="text-gray-700 mb-6">
              These Terms of Service are governed by and construed in accordance with the laws of the United States. 
              Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in New York.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                Email: <a href="mailto:legal@store.com" className="text-blue-600 hover:text-blue-700">legal@store.com</a><br />
                Phone: +1 (555) 123-4567<br />
                Address: 123 Design Street, Creative District, NY 10001
              </p>
            </div>

          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 bg-blue-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Documents</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/privacy"
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
