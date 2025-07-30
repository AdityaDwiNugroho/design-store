'use client';

import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';

export default function FeaturedPage() {
  const featuredProducts = products.filter(product => product.featured === true);

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
          <Star className="w-6 h-6 text-yellow-500 mr-2" />
          <h1 className="text-4xl font-bold text-gray-900">
            Featured Products
          </h1>
        </div>
        
        <p className="text-lg text-gray-600 max-w-3xl">
          Our hand-picked selection of the most popular and highest-rated design resources. 
          These products have been chosen for their exceptional quality and customer satisfaction.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {featuredProducts.length === 0 && (
        <div className="text-center py-16">
          <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No featured products yet</h3>
          <p className="text-gray-600 mb-6">Check back soon for our featured selections!</p>
          <Link 
            href="/products" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
}
