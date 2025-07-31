'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { categories } from '@/lib/data';
import { Category, Product } from '@/types';
import { Filter } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
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

  // Initialize search from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category') as Category;
    const searchParam = searchParams.get('search') || '';
    
    if (categoryParam && categories.some(cat => cat.id === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
    
    setSearchQuery(searchParam);
  }, [searchParams]);

  // Search function with fuzzy matching
  const searchProducts = (products: Product[], query: string): Product[] => {
    if (!query.trim()) return products;

    const searchQuery = query.toLowerCase();
    
    return products
      .map(product => {
        let score = 0;
        const name = product.name.toLowerCase();
        const description = product.description.toLowerCase();
        const tags = product.tags.join(' ').toLowerCase();
        const category = product.category.toLowerCase();

        // Exact name match gets highest score
        if (name.includes(searchQuery)) {
          score += name.startsWith(searchQuery) ? 100 : 50;
        }
        
        // Description match
        if (description.includes(searchQuery)) {
          score += 30;
        }
        
        // Tags match
        if (tags.includes(searchQuery)) {
          score += 40;
        }
        
        // Category match
        if (category.includes(searchQuery)) {
          score += 35;
        }

        return { product, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.product);
  };

  // Calculate category counts dynamically
  const getCategoriesWithCounts = () => {
    return categories.map(category => ({
      ...category,
      count: products.filter(product => product.category === category.id).length
    }));
  };

  // Filter products by category and search
  const getFilteredProducts = (): Product[] => {
    let filteredProducts = selectedCategory === 'all' 
      ? products 
      : products.filter(product => product.category === selectedCategory);

    if (searchQuery.trim()) {
      filteredProducts = searchProducts(filteredProducts, searchQuery);
    }

    return filteredProducts;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {searchQuery 
              ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} matching your search`
              : 'Discover our complete collection of premium design resources'
            }
          </p>
        </div>
        
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="lg:hidden flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
        >
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className={`lg:w-64 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {/* All Products Category */}
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span>All Products</span>
                <span className="text-sm text-gray-500">({products.length})</span>
              </button>
              
              {getCategoriesWithCounts().map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as Category)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="text-sm text-gray-500">({category.count})</span>
                </button>
              ))}
            </div>
            
            {/* Clear Search */}
            {searchQuery && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    window.history.replaceState({}, '', '/products');
                  }}
                  className="w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              {loading ? 'Loading...' : `Showing ${filteredProducts.length} of ${products.length} products`}
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery 
                  ? `No products match "${searchQuery}" in the selected category.`
                  : 'No products found in this category.'
                }
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  window.history.replaceState({}, '', '/products');
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
