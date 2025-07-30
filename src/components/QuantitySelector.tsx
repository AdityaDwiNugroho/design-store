'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  className = '',
}) => {
  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || min;
    if (value >= min && value <= max) {
      onQuantityChange(value);
    }
  };

  return (
    <div className={`flex items-center border rounded-lg ${className}`}>
      <button
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="w-16 h-10 text-center bg-transparent border-0 focus:outline-none focus:ring-0"
        aria-label="Quantity"
      />
      
      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
