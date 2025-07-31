'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { categories } from '@/lib/data';
import { Package, Palette, Code, Image as ImageIcon, Layers } from 'lucide-react';
import NewsletterSignUp from '@/components/NewsletterSignUp';
import { Product } from '@/types';

const categoryIcons = {
  'ui-kits': Layers,
  'templates': Palette,
  'icons': ImageIcon,
  'illustrations': Palette,
  'code-snippets': Code,
  'design-systems': Package,
  'all': Package,
};

export default function CategoriesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryCount = (categoryId: string) => {
    return products.filter(product => product.category === categoryId).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Browse Categories
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover premium design resources organized by category. From UI kits to code snippets, 
          find exactly what you need for your next project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.filter(category => category.id !== 'all').map((category) => {
          const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || Package;
          
          return (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {loading ? 'Loading...' : `${getCategoryCount(category.id)} product${getCategoryCount(category.id) !== 1 ? 's' : ''} available`}
              </p>
              
              <div className="text-blue-600 font-medium group-hover:text-blue-700">
                Browse {category.name.toLowerCase()} →
              </div>
            </Link>
          );
        })}
      </div>

      {/* Featured Categories Banner */}
      <div className="mt-16">
        <NewsletterSignUp 
          title="Can't find what you're looking for?"
          description="We're constantly adding new products and categories. Subscribe to our newsletter to get notified of new releases."
          variant="default"
          className="max-w-2xl mx-auto"
        />
      </div>
    </div>
  );
}
