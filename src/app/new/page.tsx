'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ArrowLeft, Clock, Sparkles } from 'lucide-react';
import { Product } from '@/types';

export default function NewPage() {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewProducts();
  }, []);

  const fetchNewProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        // Sort products by ID (newest first) and take first 12
        const sorted = (data.products || [])
          .sort((a: Product, b: Product) => parseInt(b.id) - parseInt(a.id))
          .slice(0, 12);
        setNewProducts(sorted);
      }
    } catch (error) {
      console.error('Failed to fetch new products:', error);
    } finally {
      setLoading(false);
    }
  };

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
            {loading ? 'Loading...' : `${newProducts.length} new products this month`}
          </span>
        </div>
        
        <div className="text-sm text-gray-500">
          Updated regularly
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
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
      )}

      {!loading && newProducts.length === 0 && (
        <div className="text-center py-16">
          <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No new products yet</h3>
          <p className="text-gray-600 mb-6">Check back soon for the latest additions!</p>
          <Link 
            href="/products" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      )}

      {!loading && newProducts.length > 0 && (
        <div className="text-center mt-12">
          <Link 
            href="/products" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
}
