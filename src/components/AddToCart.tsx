'use client';

import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';
import { QuantitySelector } from './QuantitySelector';

interface AddToCartProps {
  product: Product;
  className?: string;
  showQuantitySelector?: boolean;
}

export const AddToCart: React.FC<AddToCartProps> = ({
  product,
  className = '',
  showQuantitySelector = true,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      product,
      quantity,
    });
    
    // Reset quantity to 1 after adding to cart
    setQuantity(1);
  };

  if (!showQuantitySelector) {
    // Simple add to cart button (for product cards)
    return (
      <button
        onClick={() => dispatch({ type: 'ADD_TO_CART', product, quantity: 1 })}
        className={`flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${className}`}
      >
        <ShoppingCart className="w-4 h-4" />
        Add to Cart
      </button>
    );
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center ${className}`}>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Quantity:</span>
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
          min={1}
          max={99}
        />
      </div>
      
      <button
        onClick={handleAddToCart}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <ShoppingCart className="w-5 h-5" />
        Add {quantity > 1 ? `${quantity} ` : ''}to Cart
      </button>
    </div>
  );
};
