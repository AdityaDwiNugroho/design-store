'use client';

import { useState } from 'react';
import { Mail, Send, Check, AlertCircle } from 'lucide-react';

interface NewsletterSignUpProps {
  className?: string;
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  variant?: 'default' | 'minimal' | 'gradient';
}

export default function NewsletterSignUp({
  className = '',
  title = 'Stay Updated',
  description = 'Get notified about new products and exclusive offers.',
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe',
  variant = 'default'
}: NewsletterSignUpProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Please enter your email address');
      setStatus('error');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing! 🎉');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
      console.error('Newsletter subscription error:', error);
    }
  };

  // Variant styles
  const getContainerStyles = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-blue-600 to-purple-600 text-white';
      case 'minimal':
        return 'bg-white border border-gray-200';
      default:
        return 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'gradient':
        return { title: 'text-white', description: 'text-blue-100', icon: 'text-blue-100' };
      case 'minimal':
        return { title: 'text-gray-900', description: 'text-gray-600', icon: 'text-blue-600' };
      default:
        return { title: 'text-gray-900', description: 'text-gray-600', icon: 'text-blue-600' };
    }
  };

  const textStyles = getTextStyles();

  return (
    <div className={`${getContainerStyles()} rounded-2xl p-6 ${className}`}>
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-12 h-12 ${
          variant === 'gradient' ? 'bg-white bg-opacity-20' : 'bg-blue-100'
        } rounded-xl mb-4`}>
          <Mail className={`w-6 h-6 ${textStyles.icon}`} />
        </div>
        <h3 className={`text-xl font-bold ${textStyles.title} mb-2`}>{title}</h3>
        <p className={`${textStyles.description} text-sm`}>{description}</p>
      </div>

      {status === 'success' ? (
        <div className={`${
          variant === 'gradient' 
            ? 'bg-white bg-opacity-20 border-white border-opacity-30 text-white' 
            : 'bg-green-100 border-green-200 text-green-700'
        } border rounded-xl p-4 text-center`}>
          <Check className="w-6 h-6 mx-auto mb-2" />
          <p className="font-medium">{message}</p>
          <p className={`text-xs mt-2 ${
            variant === 'gradient' ? 'text-white text-opacity-80' : 'text-green-600'
          }`}>
            You can unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              disabled={status === 'loading'}
              className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed ${
                variant === 'gradient' 
                  ? 'bg-white bg-opacity-90 text-gray-900 border-white border-opacity-30' 
                  : 'bg-white text-gray-900 border-gray-300'
              }`}
            />
            <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <button
            type="submit"
            disabled={status === 'loading' || !email.trim()}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-[1.02] active:scale-[0.98] ${
              variant === 'gradient'
                ? 'bg-white text-blue-600 hover:bg-gray-100 active:bg-gray-200'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
            }`}
          >
            {status === 'loading' ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                Subscribing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {buttonText}
              </>
            )}
          </button>

          {status === 'error' && (
            <div className={`text-center text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center ${
              variant === 'gradient'
                ? 'text-red-200 bg-red-500 bg-opacity-20 border border-red-300'
                : 'text-red-700 bg-red-100 border border-red-200'
            }`}>
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {message}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
