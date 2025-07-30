'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { Star, Eye, Download } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import { AddToCart } from './AddToCart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-gray-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <OptimizedImage
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.featured && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </div>
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
              <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Eye className="w-4 h-4" />
              </button>
              <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {product.tags.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{product.tags.length - 2}
            </span>
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">4.8</span>
            </div>
          </div>
          
          <AddToCart product={product} showQuantitySelector={false} className="text-sm" />
        </div>
      </div>
    </div>
  );
}
