'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { CreditCard, Lock, Shield, Smartphone, Globe } from 'lucide-react';

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { items, getTotalPrice } = useCart();

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsLoading(true);

    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Checkout API error:', errorData);
        throw new Error(`Checkout failed: ${errorData.error || 'Unknown error'}`);
      }

      const { url } = await response.json();

      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = getTotalPrice();

  return (
    <div className="space-y-4">
      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span>{item.product.name} × {item.quantity}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 font-semibold flex justify-between">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2 flex items-center">
          <Shield className="w-4 h-4 mr-2" />
          Secure Payment
        </h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• 256-bit SSL encryption</li>
          <li>• PCI DSS compliant</li>
          <li>• Your payment info is never stored</li>
        </ul>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={isLoading || items.length === 0}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          <div className="flex items-center">
            <CreditCard className="w-4 h-4 mr-2" />
            Secure Checkout - ${totalPrice.toFixed(2)}
          </div>
        )}
      </button>

      {/* Payment Methods */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">We accept</p>
        <div className="flex justify-center space-x-4 items-center">
          <CreditCard className="w-6 h-6 text-gray-600" />
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <Smartphone className="w-6 h-6 text-gray-600" />
          <Globe className="w-6 h-6 text-gray-600" />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Visa, Mastercard, PayPal, Apple Pay, Google Pay
        </p>
      </div>

      {/* Security Note */}
      <div className="text-center">
        <p className="text-xs text-gray-500 flex items-center justify-center">
          <Lock className="w-3 h-3 mr-1" />
          Powered by Stripe - Industry-leading security
        </p>
      </div>
    </div>
  );
}
