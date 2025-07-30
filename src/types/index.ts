export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  images?: string[];
  tags: string[];
  downloadUrl?: string;
  preview?: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export type Category = 'ui-kits' | 'templates' | 'icons' | 'illustrations' | 'code-snippets' | 'all';
