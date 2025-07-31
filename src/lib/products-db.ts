import fs from 'fs';
import path from 'path';
import { Product } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');

// Ensure data directory exists
export function initializeProductsDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Initialize products file if it doesn't exist
  if (!fs.existsSync(PRODUCTS_FILE)) {
    const initialProducts: Product[] = [
      {
        id: '1',
        name: 'Modern Dashboard UI Kit',
        description: 'A comprehensive dashboard UI kit with 50+ components and dark mode support. Perfect for creating modern admin panels and analytics dashboards.',
        price: 49,
        category: 'ui-kits',
        image: '/images/dashboard-ui.jpg',
        tags: ['dashboard', 'ui-kit', 'components', 'dark-mode', 'admin'],
        featured: true,
        downloadUrl: '/downloads/dashboard-ui.zip'
      },
      {
        id: '2',
        name: 'E-commerce Template',
        description: 'Complete e-commerce website template built with React and Tailwind CSS. Includes product pages, cart, and checkout flow.',
        price: 79,
        category: 'templates',
        image: '/images/ecommerce-template.jpg',
        tags: ['ecommerce', 'template', 'react', 'tailwind', 'shop'],
        featured: false,
        downloadUrl: '/downloads/ecommerce-template.zip'
      },
      {
        id: '3',
        name: 'Icon Pack - Business',
        description: 'Set of 200+ business and office icons in SVG format. Clean, modern design perfect for web and mobile apps.',
        price: 19,
        category: 'icons',
        image: '/images/business-icons.jpg',
        tags: ['icons', 'business', 'svg', 'office', 'web'],
        featured: true,
        downloadUrl: '/downloads/business-icons.zip'
      },
      {
        id: '4',
        name: 'Landing Page Template',
        description: 'High-converting landing page template with modern design and responsive layout. Great for SaaS and startups.',
        price: 39,
        category: 'templates',
        image: '/images/landing-template.jpg',
        tags: ['landing', 'template', 'saas', 'startup', 'conversion'],
        featured: false,
        downloadUrl: '/downloads/landing-template.zip'
      }
    ];
    
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(initialProducts, null, 2));
    console.log('📦 Products database initialized with sample data');
  }
}

export function getAllProducts(): { products: Product[]; total: number } {
  try {
    initializeProductsDatabase();
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    const products = JSON.parse(data);
    console.log(`📦 Products database loaded with ${products.length} products`);
    return { products, total: products.length };
  } catch (error) {
    console.error('Error reading products:', error);
    return { products: [], total: 0 };
  }
}

export function getProductById(id: string): Product | null {
  const { products } = getAllProducts();
  return products.find(product => product.id === id) || null;
}

export function createProduct(productData: Omit<Product, 'id'>): { success: boolean; product?: Product; message: string } {
  try {
    const { products } = getAllProducts();
    // Generate a safe numeric ID by finding the highest valid numeric ID
    const numericIds = products
      .map(p => parseInt(p.id))
      .filter(id => !isNaN(id) && id > 0);
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
    const newId = (maxId + 1).toString();
    
    const newProduct: Product = {
      ...productData,
      id: newId
    };
    
    products.push(newProduct);
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    console.log(`📦 New product created: ${newProduct.name} (ID: ${newId})`);
    
    return { success: true, product: newProduct, message: 'Product created successfully' };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, message: 'Failed to create product' };
  }
}

export function updateProduct(id: string, productData: Partial<Product>): { success: boolean; product?: Product; message: string } {
  try {
    const { products } = getAllProducts();
    const index = products.findIndex(product => product.id === id);
    
    if (index === -1) {
      return { success: false, message: 'Product not found' };
    }
    
    products[index] = { ...products[index], ...productData, id };
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    console.log(`📦 Product updated: ${products[index].name} (ID: ${id})`);
    
    return { success: true, product: products[index], message: 'Product updated successfully' };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false, message: 'Failed to update product' };
  }
}

export function deleteProduct(id: string): { success: boolean; message: string } {
  try {
    const { products } = getAllProducts();
    const product = products.find(p => p.id === id);
    const filteredProducts = products.filter(product => product.id !== id);
    
    if (filteredProducts.length === products.length) {
      return { success: false, message: 'Product not found' };
    }
    
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(filteredProducts, null, 2));
    console.log(`📦 Product deleted: ${product?.name} (ID: ${id})`);
    
    return { success: true, message: 'Product deleted successfully' };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, message: 'Failed to delete product' };
  }
}

export function getProductsByCategory(category: string): Product[] {
  const { products } = getAllProducts();
  return products.filter(product => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  const { products } = getAllProducts();
  return products.filter(product => product.featured);
}

export function searchProducts(query: string): Product[] {
  const { products } = getAllProducts();
  const searchTerm = query.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
}
