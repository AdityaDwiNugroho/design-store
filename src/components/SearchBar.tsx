'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import OptimizedImage from './OptimizedImage';
import { Product } from '@/types';
import { sanitizeSearchQuery, rateLimiter } from '@/lib/security';

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [products, setProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch products on component mount
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
      console.error('Failed to fetch products for search:', error);
    }
  };

  // Search function with fuzzy matching and security
  const searchProducts = useCallback((searchQuery: string): Product[] => {
    if (!searchQuery.trim()) return [];

    // Sanitize the search query to prevent injection
    const sanitizedQuery = sanitizeSearchQuery(searchQuery);
    if (!sanitizedQuery) return [];

    // Rate limiting for search requests
    const clientId = 'search_' + (typeof window !== 'undefined' ? window.location.host : 'server');
    if (!rateLimiter.isAllowed(clientId)) {
      console.warn('Search rate limit exceeded');
      return [];
    }

    const query = sanitizedQuery.toLowerCase();
    
    return products
      .map(product => {
        let score = 0;
        const name = product.name.toLowerCase();
        const description = product.description.toLowerCase();
        const tags = product.tags.join(' ').toLowerCase();
        const category = product.category.toLowerCase();

        // Exact name match gets highest score
        if (name.includes(query)) {
          score += name.startsWith(query) ? 100 : 50;
        }
        
        // Description match
        if (description.includes(query)) {
          score += 30;
        }
        
        // Tags match
        if (tags.includes(query)) {
          score += 40;
        }
        
        // Category match
        if (category.includes(query)) {
          score += 35;
        }

        // Fuzzy matching for typos
        const words = query.split(' ');
        words.forEach(word => {
          if (word.length > 2) {
            const nameWords = name.split(' ');
            const descWords = description.split(' ');
            
            [...nameWords, ...descWords].forEach(targetWord => {
              if (targetWord.includes(word) || word.includes(targetWord)) {
                score += 10;
              }
            });
          }
        });

        return { product, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(item => item.product);
  }, [products]);

  // Update search results when query changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const searchResults = searchProducts(query);
      setResults(searchResults);
      setIsOpen(query.length > 0 && searchResults.length > 0);
      setSelectedIndex(-1);
    }, 150); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query, products, searchProducts]); // Added searchProducts dependency

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.location.href = `/products/${results[selectedIndex].id}`;
        } else if (query.trim()) {
          window.location.href = `/products?search=${encodeURIComponent(query)}`;
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const highlightMatch = (text: string, query: string): React.ReactElement => {
    if (!query.trim()) return <span>{text}</span>;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) => 
          regex.test(part) ? (
            <span key={index} className="bg-yellow-200 font-semibold">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products, categories, or tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim() && results.length > 0) {
              setIsOpen(true);
            }
          }}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-gray-500 px-3 py-2 border-b border-gray-100">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </div>
            
            {results.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  index === selectedIndex 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <OptimizedImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {highlightMatch(product.name, query)}
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {highlightMatch(product.description, query)}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm font-semibold text-gray-900">
                      ${product.price}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {product.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            
            {query.trim() && (
              <Link
                href={`/products?search=${encodeURIComponent(query)}`}
                className={`flex items-center justify-center space-x-2 px-3 py-3 rounded-lg transition-colors border-t border-gray-100 mt-2 ${
                  selectedIndex === results.length 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-gray-50'
                } text-blue-600 font-medium`}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <Search className="w-4 h-4" />
                <span>Search for &quot;{query}&quot;</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
