'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminLogin from '@/components/AdminLogin';
import ImageUpload from '@/components/ImageUpload';
import { Product } from '@/types';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  DollarSign, 
  Star,
  Search,
  Filter,
  LogOut,
  Save,
  X,
  Eye
} from 'lucide-react';

export default function ProductsAdmin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'ui-kits',
    image: '',
    tags: '',
    featured: false,
    downloadUrl: ''
  });

  useEffect(() => {
    async function checkAuthentication() {
      try {
        console.log('Checking admin authentication...');
        const response = await fetch('/api/admin/auth', {
          method: 'GET',
          credentials: 'include',
        });
        
        console.log('Auth response status:', response.status);
        const data = await response.json();
        console.log('Auth response data:', data);
        
        if (response.ok) {
          setAuthenticated(true);
          await fetchProducts();
        } else {
          console.log('Authentication failed:', data.error);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setCheckingAuth(false);
      }
    }

    checkAuthentication();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthenticated = () => {
    setAuthenticated(true);
    setCheckingAuth(false);
    fetchProducts();
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'DELETE',
        credentials: 'include',
      });
      setAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'ui-kits',
      image: '',
      tags: '',
      featured: false,
      downloadUrl: ''
    });
    setEditingProduct(null);
    setShowCreateForm(false);
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      tags: product.tags.join(', '),
      featured: product.featured || false,
      downloadUrl: product.downloadUrl || ''
    });
    setEditingProduct(product);
    setShowCreateForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        await fetchProducts();
        resetForm();
        alert(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save product');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        await fetchProducts();
        alert('Product deleted successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete product');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'ui-kits', 'templates', 'icons', 'illustrations', 'code-snippets'];

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                <p className="text-gray-600 mt-1">Manage your digital product catalog</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Product
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-blue-600 font-semibold">Total Products</p>
                  <p className="text-2xl font-bold text-blue-800">{products.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Star className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-green-600 font-semibold">Featured Products</p>
                  <p className="text-2xl font-bold text-green-800">
                    {products.filter(p => p.featured).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-purple-600 font-semibold">Total Value</p>
                  <p className="text-2xl font-bold text-purple-800">
                    ${products.reduce((sum, p) => sum + p.price, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <div className="relative">
                <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="relative w-12 h-12 mr-4">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover rounded-lg"
                              sizes="48px"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-600 truncate max-w-xs">
                              {product.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {product.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  {tag}
                                </span>
                              ))}
                              {product.tags.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                  +{product.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                          {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">${product.price}</span>
                      </td>
                      <td className="px-6 py-4">
                        {product.featured ? (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full flex items-center w-fit">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                            Regular
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <a
                            href={`/products/${product.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View product"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProducts.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  {searchTerm || categoryFilter !== 'all' ? 'No products match your filters.' : 'No products found.'}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Create/Edit Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingProduct ? 'Edit Product' : 'Create New Product'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter product description"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {categories.slice(1).map(category => (
                          <option key={category} value={category}>
                            {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <ImageUpload
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    disabled={loading}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ui, design, modern, dashboard"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Download URL
                    </label>
                    <input
                      type="url"
                      value={formData.downloadUrl}
                      onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://yourdomain.com/download.zip"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                      Featured product
                    </label>
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {editingProduct ? 'Update Product' : 'Create Product'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
