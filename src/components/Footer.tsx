import Link from 'next/link';
import { Github, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DS</span>
              </div>
              <span className="text-xl font-bold">DesignStore</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Premium digital design resources for creators, developers, and designers. 
              Build better products with our carefully curated collection.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/AdityaDwiNugroho" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/ProgrammerADN" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/allen.adityadn/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:contact@designstore.com" className="text-gray-400 hover:text-white transition-colors" title="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/featured" className="text-gray-400 hover:text-white transition-colors">
                  Featured
                </Link>
              </li>
              <li>
                <Link href="/new" className="text-gray-400 hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-gray-400">
          <p>&copy; 2025 DesignStore by <a href="https://github.com/AdityaDwiNugroho" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Aditya Dwi Nugroho</a>. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 text-sm">
            <a href="https://github.com/AdityaDwiNugroho/digital-store" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300 transition-colors">
              View Source Code
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
