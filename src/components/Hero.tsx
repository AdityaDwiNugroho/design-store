'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Premium Digital Products</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Beautiful Design Resources
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              For Creators
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover premium UI kits, templates, icons, and code snippets to accelerate your design and development workflow. Created by designers, for designers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/products"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center space-x-2 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <span>Browse Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              href="/categories"
              className="bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold border border-gray-300 hover:border-gray-400 transition-colors"
            >
              View Categories
            </Link>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Download</h3>
              <p className="text-gray-600 text-sm">
                Get your files immediately after purchase. No waiting, no delays.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600 text-sm">
                All products are carefully curated and tested for quality.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Regular Updates</h3>
              <p className="text-gray-600 text-sm">
                New products added weekly. Stay ahead with the latest trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
