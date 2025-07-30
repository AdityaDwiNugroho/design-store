import Link from 'next/link';

export default function PrivacyPolicy() {
  const lastUpdated = "January 15, 2024";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Privacy Policy</span>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
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
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Name and email address</li>
              <li>Billing information and payment details</li>
              <li>Account credentials and preferences</li>
              <li>Communication records and support interactions</li>
              <li>Purchase history and download records</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website and search terms</li>
              <li>Operating system and screen resolution</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Process transactions and deliver digital products</li>
              <li>Create and manage your account</li>
              <li>Provide customer support and technical assistance</li>
              <li>Send important updates about your purchases and account</li>
              <li>Improve our website and user experience</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li><strong>Service Providers:</strong> With trusted third-party services that help us operate our business (payment processors, email services, hosting providers)</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>Consent:</strong> When you explicitly consent to sharing your information</li>
              <li><strong>Protection:</strong> To protect our rights, property, or safety, or that of our users</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>SSL encryption for data transmission</li>
              <li>Secure payment processing through trusted providers</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Data backup and recovery procedures</li>
              <li>Employee training on data protection</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to enhance your experience:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with consent)</li>
            </ul>
            <p className="text-gray-700 mb-6">
              You can control cookies through your browser settings, but disabling certain cookies may affect website functionality.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
            <p className="text-gray-700 mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Update or correct inaccurate personal information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
              <li><strong>Portability:</strong> Receive your personal information in a structured, machine-readable format</li>
              <li><strong>Objection:</strong> Object to certain types of processing</li>
              <li><strong>Withdrawal:</strong> Withdraw consent for marketing communications</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
            <p className="text-gray-700 mb-6">
              We retain your personal information for as long as necessary to provide our services and comply with legal obligations. 
              Generally, we keep account information until you request deletion, and transaction records for 7 years for tax and legal purposes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
            <p className="text-gray-700 mb-6">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place 
              to protect your personal information in accordance with applicable data protection laws.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-gray-700 mb-6">
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. 
              If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Third-Party Links</h2>
            <p className="text-gray-700 mb-6">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. 
              We encourage you to read the privacy policies of any third-party websites you visit.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page 
              and updating the &quot;Last Updated&quot; date. Your continued use of our services after changes are posted constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Regional Privacy Rights</h2>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">GDPR (European Union)</h3>
            <p className="text-gray-700 mb-4">
              If you are in the EU, you have additional rights under the General Data Protection Regulation (GDPR), including the right to lodge 
              a complaint with a supervisory authority.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">CCPA (California)</h3>
            <p className="text-gray-700 mb-6">
              California residents have specific rights under the California Consumer Privacy Act (CCPA), including the right to know what personal 
              information is collected and the right to delete personal information.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Data Protection Officer:</strong><br />
                Email: <a href="mailto:privacy@store.com" className="text-blue-600 hover:text-blue-700">privacy@store.com</a><br />
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
              href="/terms"
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Terms of Service
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
