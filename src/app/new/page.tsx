'use client';

import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ArrowLeft, Clock, Sparkles } from 'lucide-react';

export default function NewPage() {
  // Sort products by creation date (newest first) - simulating with ID for now
  const newProducts = products
    .sort((a, b) => parseInt(b.id) - parseInt(a.id))
    .slice(0, 12);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <Clock className="w-6 h-6 text-green-500 mr-2" />
            <Sparkles className="w-5 h-5 text-green-500 mr-3" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            New Arrivals
          </h1>
        </div>
        
        <p className="text-lg text-gray-600 max-w-3xl">
          Discover the latest design resources added to our collection. 
          Stay ahead of the curve with fresh UI kits, templates, and creative assets.
        </p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">
            {newProducts.length} new products this month
          </span>
        </div>
        
        <div className="text-sm text-gray-500">
          Updated regularly
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newProducts.map((product, index) => (
          <div key={product.id} className="relative">
            {index < 3 && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
                New
              </div>
            )}
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link 
          href="/products" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}
