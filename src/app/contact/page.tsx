import Link from 'next/link';
import { Mail, MessageCircle, Clock, MapPin, Phone, Github, Twitter, Linkedin } from 'lucide-react';

export default function ContactUs() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      contact: "support@store.com",
      action: "Send Email"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available 9 AM - 6 PM EST",
      action: "Start Chat"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "+1 (555) 123-4567",
      action: "Call Now"
    }
  ];

  const officeInfo = {
    address: "123 Design Street, Creative District, NY 10001",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM EST",
    timezone: "Eastern Standard Time"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Contact Us</span>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have a question or need support? We&apos;re here to help. Reach out to us through any of the methods below.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-shadow">
              <method.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-gray-600 mb-4">{method.description}</p>
              <p className="text-gray-900 font-medium mb-4">{method.contact}</p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {method.action}
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="refund">Refund Request</option>
                  <option value="licensing">Licensing Question</option>
                  <option value="partnership">Partnership Opportunity</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Please describe your question or issue in detail..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                ></textarea>
              </div>

              <div className="flex items-start">
                <input
                  id="privacy"
                  name="privacy"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="privacy" className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                    Terms of Service
                  </Link>
                  *
                </label>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Office Info */}
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Office Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">Address</p>
                    <p className="text-gray-600">{officeInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">Business Hours</p>
                    <p className="text-gray-600">{officeInfo.hours}</p>
                    <p className="text-gray-500 text-sm">{officeInfo.timezone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h2>
              <p className="text-gray-600 mb-6">
                Stay updated with our latest products and announcements on social media.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Github className="w-6 h-6 text-gray-700" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Twitter className="w-6 h-6 text-gray-700" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Linkedin className="w-6 h-6 text-gray-700" />
                </a>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Looking for quick answers?
              </h3>
              <p className="text-gray-600 mb-4">
                Check out our Help Center for frequently asked questions and detailed guides.
              </p>
              <Link
                href="/help"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Visit Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
