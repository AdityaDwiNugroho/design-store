'use client';

import Link from 'next/link';
import ProductCard from './ProductCard';
import { getFeaturedProducts } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Featured Products
            </h2>
            <p className="text-gray-600">
              Our most popular and highly-rated design resources
            </p>
          </div>
          
          <Link
            href="/products"
            className="hidden sm:flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>View all products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>View all products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
