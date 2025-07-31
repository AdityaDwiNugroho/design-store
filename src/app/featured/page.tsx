'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';
import { Product } from '@/types';

export default function FeaturedPage() {
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
        const featured = (data.products || []).filter((product: Product) => product.featured === true);
        setFeaturedProducts(featured);
      }
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
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

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
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
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!loading && featuredProducts.length === 0 && (
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
