'use client';

import { useCart } from '@/lib/cart-context';
import { Product } from '@/types';
import { ShoppingCart, Eye } from 'lucide-react';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={handleAddToCart}
        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 hover:scale-105"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Add to Cart</span>
      </button>
      
      <button className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
        <Eye className="w-5 h-5" />
        <span>Preview</span>
      </button>
    </div>
  );
}
