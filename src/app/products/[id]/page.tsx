import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/products-db';
import { Product } from '@/types';
import { Star, Check, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { AddToCart } from '@/components/AddToCart';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}

function ProductDetails({ product }: { product: Product }) {
  const features = [
    'High-quality design files',
    'Multiple file formats included',
    'Commercial license included',
    'Instant download',
    'Free updates',
    'Premium support'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-gray-900">Products</Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-[4/3] relative overflow-hidden rounded-xl bg-gray-100">
            <OptimizedImage
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1).map((image: string, index: number) => (
                <div key={index} className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                  <OptimizedImage
                    src={image}
                    alt={`${product.name} ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {product.category.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </span>
              {product.featured && (
                <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600 ml-2">(4.8) • 234 reviews</span>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price and Actions */}
          <div className="border-t border-b border-gray-200 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="text-3xl font-bold text-gray-900">
                ${product.price}
              </div>
              <div className="text-sm text-gray-600">
                One-time purchase
              </div>
            </div>
            
            <AddToCart product={product} showQuantitySelector={true} />
          </div>

          {/* Repository Access */}
          {product.repository && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-start">
                <Github className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">GitHub Repository Access Included</h3>
                  <p className="text-gray-600 mb-4">
                    This product includes access to a private GitHub repository with complete source code, 
                    documentation, and development resources.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-700">
                      <Check className="w-4 h-4 text-green-600 mr-2" />
                      <span>Complete source code</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Check className="w-4 h-4 text-green-600 mr-2" />
                      <span>Read-only access</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Check className="w-4 h-4 text-green-600 mr-2" />
                      <span>Clone and download</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Check className="w-4 h-4 text-green-600 mr-2" />
                      <span>Documentation included</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="text-sm text-gray-600 mb-3">
                      After purchase, request repository access with your GitHub username:
                    </p>
                    <Link
                      href="/repository-access"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Request Repository Access
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">What&apos;s included:</h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
