'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        const featured = data.products.filter((product: Product) => product.featured);
        setFeaturedProducts(featured);
      }
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
    } finally {
      setLoading(false);
    }
  };

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
          {loading ? (
            // Loading skeleton
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))
          ) : (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
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
