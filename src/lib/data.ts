import { Product } from '@/types';

// Sample products data for the store
export const products: Product[] = [
  {
    id: '1',
    name: 'Modern Dashboard UI Kit',
    description: 'Complete dashboard UI kit with 50+ components, dark/light theme support, and responsive design. Perfect for admin panels and analytics dashboards.',
    price: 49,
    category: 'ui-kits',
    image: 'https://picsum.photos/id/1/600/400',
    images: [
      'https://picsum.photos/id/1/600/400',
      'https://picsum.photos/id/2/600/400'
    ],
    tags: ['dashboard', 'admin', 'ui-kit', 'responsive'],
    featured: true,
  },
  {
    id: '2',
    name: 'E-commerce Landing Page',
    description: 'Modern e-commerce landing page template with shopping cart, product showcase, and payment integration ready components.',
    price: 35,
    category: 'templates',
    image: 'https://picsum.photos/id/3/600/400',
    tags: ['ecommerce', 'landing-page', 'shopping'],
    featured: true,
  },
  {
    id: '3',
    name: 'Minimalist Icon Pack',
    description: 'Collection of 200+ minimalist icons in SVG format. Perfect for web and mobile applications.',
    price: 25,
    category: 'icons',
    image: 'https://picsum.photos/id/4/600/400',
    tags: ['icons', 'minimalist', 'svg'],
  },
  {
    id: '4',
    name: 'React Component Library',
    description: 'Production-ready React components with TypeScript support. Includes buttons, forms, modals, and more.',
    price: 79,
    category: 'code-snippets',
    image: 'https://picsum.photos/id/5/600/400',
    tags: ['react', 'typescript', 'components'],
    featured: true,
  },
  {
    id: '5',
    name: 'Mobile App Wireframes',
    description: 'Complete set of mobile app wireframes for iOS and Android. Includes onboarding, profiles, and more.',
    price: 45,
    category: 'templates',
    image: 'https://picsum.photos/id/6/600/400',
    tags: ['mobile', 'wireframes', 'ios', 'android'],
  },
  {
    id: '6',
    name: 'CSS Animation Library',
    description: 'Collection of smooth CSS animations and transitions. Copy-paste ready code snippets.',
    price: 30,
    category: 'code-snippets',
    image: 'https://picsum.photos/id/7/600/400',
    tags: ['css', 'animations', 'transitions'],
  },
];

// Helper functions
export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const categories = [
  { id: 'ui-kits', name: 'UI Kits' },
  { id: 'templates', name: 'Templates' },
  { id: 'icons', name: 'Icons' },
  { id: 'illustrations', name: 'Illustrations' },
  { id: 'code-snippets', name: 'Code Snippets' },
  { id: 'design-systems', name: 'Design Systems' },
];