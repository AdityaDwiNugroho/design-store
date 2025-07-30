'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { ShoppingBag, Github } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Header() {
  const { cart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">DesignStore</span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SearchBar className="w-full" />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-gray-900 font-medium">
              Products
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-gray-900 font-medium">
              Categories
            </Link>
            <a 
              href="https://github.com/AdityaDwiNugroho" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
          </nav>

          {/* Cart */}
          <Link href="/cart" className="relative p-2 text-gray-700 hover:text-gray-900 ml-4">
            <ShoppingBag className="w-6 h-6" />
            {cart.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.itemCount}
              </span>
            )}
          </Link>
        </div>
        
        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchBar className="w-full" />
        </div>
      </div>
    </header>
  );
}
