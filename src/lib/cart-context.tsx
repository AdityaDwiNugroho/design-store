'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Cart, Product } from '@/types';
import { SecureStorage, isValidQuantity, isValidProductId } from './security';

type CartState = Cart;

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product; quantity?: number }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; cart: Cart };

const CartContext = createContext<{
  cart: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      // Security validation
      if (!isValidProductId(action.product.id)) {
        console.error('Invalid product ID');
        return state;
      }
      
      const quantityToAdd = action.quantity || 1;
      if (!isValidQuantity(quantityToAdd)) {
        console.error('Invalid quantity');
        return state;
      }
      
      const existingItem = state.items.find(item => item.product.id === action.product.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
        const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        
        return { items: updatedItems, total, itemCount };
      } else {
        const newItems = [...state.items, { product: action.product, quantity: quantityToAdd }];
        const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
        
        return { items: newItems, total, itemCount };
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.product.id !== action.productId);
      const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: updatedItems, total, itemCount };
    }
    
    case 'UPDATE_QUANTITY': {
      // Security validation
      if (!isValidProductId(action.productId)) {
        console.error('Invalid product ID');
        return state;
      }
      
      if (action.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', productId: action.productId });
      }
      
      if (!isValidQuantity(action.quantity)) {
        console.error('Invalid quantity');
        return state;
      }
      
      const updatedItems = state.items.map(item =>
        item.product.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
      const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: updatedItems, total, itemCount };
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };
    
    case 'LOAD_CART':
      return action.cart;
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    // Ensure we're on client side before accessing localStorage
    if (typeof window === 'undefined') return;
    
    try {
      const savedCart = SecureStorage.getItem<Cart>('cart');
      if (savedCart && savedCart.items && Array.isArray(savedCart.items)) {
        // Validate cart data before loading
        const validatedCart = {
          ...savedCart,
          items: savedCart.items.filter(item => 
            item?.product && 
            item.product.id &&
            isValidProductId(item.product.id) && 
            typeof item.quantity === 'number' &&
            isValidQuantity(item.quantity)
          )
        };
        
        // Recalculate totals to ensure data integrity
        const total = validatedCart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const itemCount = validatedCart.items.reduce((sum, item) => sum + item.quantity, 0);
        
        dispatch({ 
          type: 'LOAD_CART', 
          cart: { ...validatedCart, total, itemCount } 
        });
      }
    } catch (error) {
      console.error('Error loading cart from secure storage:', error);
      // Clear corrupted data and start fresh
      SecureStorage.removeItem('cart');
    }
  }, []);

  // Save cart to localStorage whenever it changes (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      SecureStorage.setItem('cart', cart);
    } catch (error) {
      console.error('Error saving cart to secure storage:', error);
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
