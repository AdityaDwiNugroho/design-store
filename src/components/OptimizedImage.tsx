'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export default function OptimizedImage({ 
  src, 
  alt,
  fill = false, 
  className = '',
  sizes,
  priority = false,
  onError,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...props // Accept all other props but ignore them
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image failed to load:', src);
    setHasError(true);
    setIsLoading(false);
    if (onError) onError(e);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Fallback placeholder based on product type
  const getFallbackInfo = (src: string, alt: string) => {
    if (alt.toLowerCase().includes('dashboard') || src.includes('dashboard')) {
      return { bg: 'bg-blue-500', text: 'Dashboard UI Kit', icon: '📊' };
    }
    if (alt.toLowerCase().includes('ecommerce') || alt.toLowerCase().includes('e-commerce') || src.includes('ecommerce')) {
      return { bg: 'bg-green-500', text: 'E-commerce Template', icon: '🛒' };
    }
    if (alt.toLowerCase().includes('icon') || src.includes('icon')) {
      return { bg: 'bg-purple-500', text: 'Icon Pack', icon: '🎨' };
    }
    if (alt.toLowerCase().includes('react') || src.includes('react')) {
      return { bg: 'bg-red-500', text: 'React Components', icon: '⚛️' };
    }
    if (alt.toLowerCase().includes('mobile') || src.includes('mobile')) {
      return { bg: 'bg-yellow-500', text: 'Mobile Wireframes', icon: '📱' };
    }
    if (alt.toLowerCase().includes('css') || src.includes('css')) {
      return { bg: 'bg-cyan-500', text: 'CSS Animations', icon: '✨' };
    }
    return { bg: 'bg-gray-500', text: alt || 'Product Image', icon: '🖼️' };
  };

  if (hasError) {
    const { bg, text, icon } = getFallbackInfo(src, alt);
    
    if (fill) {
      return (
        <div className={`absolute inset-0 w-full h-full ${bg} ${className} flex items-center justify-center`}>
          <div className="text-white text-center px-4">
            <div className="text-3xl mb-2">{icon}</div>
            <div className="font-semibold text-sm">{text}</div>
            <div className="text-xs opacity-80 mt-1">Image Error</div>
          </div>
        </div>
      );
    }

    return (
      <div 
        className={`${bg} ${className} flex items-center justify-center`}
        style={{ width: '100%', aspectRatio: '4/3' }}
      >
        <div className="text-white text-center">
          <div className="text-3xl mb-2">{icon}</div>
          <div className="font-semibold text-sm">{text}</div>
          <div className="text-xs opacity-80 mt-1">Image Error</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`${fill ? 'absolute inset-0' : ''} w-full h-full bg-gray-200 animate-pulse flex items-center justify-center ${className}`}>
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        sizes={sizes}
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
        unoptimized={false}
      />
    </>
  );
}
