'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Github, CheckCircle, XCircle, Mail } from 'lucide-react';

export default function RepositoryAccess() {
  const [email, setEmail] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [productId, setProductId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    repository?: {
      owner: string;
      name?: string;
      repo?: string;
      permission: string;
      url?: string;
    };
    alreadyGranted?: boolean;
  } | null>(null);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // GitHub username validation
    const githubRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
    if (!githubUsername) {
      newErrors.githubUsername = 'GitHub username is required';
    } else if (!githubRegex.test(githubUsername)) {
      newErrors.githubUsername = 'Please enter a valid GitHub username (alphanumeric and hyphens only, max 39 characters)';
    }

    // Product ID validation
    if (!productId) {
      newErrors.productId = 'Product ID is required';
    } else if (!/^[a-zA-Z0-9-_]+$/.test(productId)) {
      newErrors.productId = 'Invalid product ID format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>'"&]/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setResult(null);
    setErrors({});

    try {
      // Sanitize inputs
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedGithubUsername = sanitizeInput(githubUsername);
      const sanitizedProductId = sanitizeInput(productId);

      const response = await fetch('/api/repository-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: sanitizedEmail,
          githubUsername: sanitizedGithubUsername,
          productId: sanitizedProductId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message,
          repository: data.repository,
          alreadyGranted: data.alreadyGranted
        });
        
        // Clear form on success
        if (!data.alreadyGranted) {
          setEmail('');
          setGithubUsername('');
          setProductId('');
        }
      } else {
        setResult({
          success: false,
          message: data.error || 'Failed to process request'
        });
      }
    } catch (err: unknown) {
      setResult({
        success: false,
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Repository Access</span>
          </nav>
          
          <div className="text-center">
            <Github className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Repository Access
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get access to your purchased private repositories. Enter your purchase details below to receive read-only access.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Request Form */}
          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Repository Access</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter the email used for purchase"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  maxLength={254}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  This should match the email address you used during checkout
                </p>
              </div>

              <div>
                <label htmlFor="githubUsername" className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Username *
                </label>
                <input
                  type="text"
                  id="githubUsername"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  required
                  placeholder="Your GitHub username"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.githubUsername ? 'border-red-300' : 'border-gray-300'
                  }`}
                  maxLength={39}
                  pattern="[a-zA-Z0-9][a-zA-Z0-9-]{0,37}[a-zA-Z0-9]?"
                />
                {errors.githubUsername && (
                  <p className="mt-1 text-sm text-red-600">{errors.githubUsername}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Your GitHub username (not email). Example: your-username
                </p>
              </div>

              <div>
                <label htmlFor="productId" className="block text-sm font-medium text-gray-700 mb-2">
                  Product ID *
                </label>
                <input
                  type="text"
                  id="productId"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  required
                  placeholder="Product ID from your purchase"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.productId ? 'border-red-300' : 'border-gray-300'
                  }`}
                  maxLength={50}
                  pattern="[a-zA-Z0-9-_]+"
                />
                {errors.productId && (
                  <p className="mt-1 text-sm text-red-600">{errors.productId}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Find this in your purchase confirmation email or receipt
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Request Access'
                )}
              </button>
            </form>

            {/* Result */}
            {result && (
              <div className={`mt-6 p-4 rounded-lg ${
                result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-start">
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={`font-medium ${
                      result.success ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {result.success ? (result.alreadyGranted ? 'Access Already Granted!' : 'Success!') : 'Error'}
                    </p>
                    <p className={`text-sm mt-1 ${
                      result.success ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {result.message}
                    </p>
                    
                    {result.success && result.repository && (
                      <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
                        <h4 className="font-semibold text-gray-900 mb-3">Repository Details:</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Repository:</span>
                            <span className="ml-2 text-gray-900">
                              {result.repository.owner}/{result.repository.repo || result.repository.name}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Permission:</span>
                            <span className="ml-2 text-gray-900 capitalize">{result.repository.permission}</span>
                          </div>
                        </div>
                        
                        {result.repository.url && (
                          <div className="mt-4 pt-4 border-t border-green-200">
                            <a
                              href={result.repository.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                            >
                              <Github className="w-4 h-4 mr-2" />
                              View Repository
                            </a>
                            <p className="text-xs text-green-600 mt-2">
                              Click to open the repository on GitHub
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Information */}
          <div className="space-y-8">
            {/* How it Works */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How it Works</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    1
                  </div>
                  <p className="text-gray-600">Enter your purchase email and GitHub username</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    2
                  </div>
                  <p className="text-gray-600">We verify your purchase in our system</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    3
                  </div>
                  <p className="text-gray-600">You receive read-only access to the private repository</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    4
                  </div>
                  <p className="text-gray-600">Access the repository on GitHub with your account</p>
                </div>
              </div>
            </div>

            {/* Access Details */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Access Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Read-only access to private repositories</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Clone and download repository content</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>View commit history and documentation</span>
                </div>
                <div className="flex items-center">
                  <XCircle className="w-4 h-4 text-red-500 mr-2" />
                  <span>Cannot edit, push, or delete content</span>
                </div>
                <div className="flex items-center">
                  <XCircle className="w-4 h-4 text-red-500 mr-2" />
                  <span>Cannot invite other collaborators</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                If you&apos;re having trouble accessing your repository, please contact our support team.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
