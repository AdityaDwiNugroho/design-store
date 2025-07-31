import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const PURCHASES_FILE = path.join(DATA_DIR, 'purchases.json');

export interface Purchase {
  id: string;
  sessionId: string; // Stripe session ID
  customerEmail: string;
  githubUsername?: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    repositoryAccess?: {
      owner: string;
      repo: string;
      granted: boolean;
      grantedAt?: string;
      accessRequested?: boolean;
    };
  }[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
}

// Ensure data directory exists
function initializePurchasesDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(PURCHASES_FILE)) {
    fs.writeFileSync(PURCHASES_FILE, JSON.stringify([], null, 2));
    console.log('📦 Purchases database initialized');
  }
}

export function getAllPurchases(): Purchase[] {
  try {
    initializePurchasesDatabase();
    const data = fs.readFileSync(PURCHASES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading purchases:', error);
    return [];
  }
}

export function createPurchase(purchase: Omit<Purchase, 'id' | 'createdAt'>): { success: boolean; purchase?: Purchase; message: string } {
  try {
    const purchases = getAllPurchases();
    const newPurchase: Purchase = {
      ...purchase,
      id: `purchase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    purchases.push(newPurchase);
    fs.writeFileSync(PURCHASES_FILE, JSON.stringify(purchases, null, 2));
    console.log(`💰 New purchase created: ${newPurchase.id}`);

    return { success: true, purchase: newPurchase, message: 'Purchase created successfully' };
  } catch (error) {
    console.error('Error creating purchase:', error);
    return { success: false, message: 'Failed to create purchase' };
  }
}

export function getPurchaseBySessionId(sessionId: string): Purchase | null {
  const purchases = getAllPurchases();
  return purchases.find(p => p.sessionId === sessionId) || null;
}

export function updatePurchase(id: string, updates: Partial<Purchase>): { success: boolean; purchase?: Purchase; message: string } {
  try {
    const purchases = getAllPurchases();
    const index = purchases.findIndex(p => p.id === id);

    if (index === -1) {
      return { success: false, message: 'Purchase not found' };
    }

    purchases[index] = { ...purchases[index], ...updates };
    fs.writeFileSync(PURCHASES_FILE, JSON.stringify(purchases, null, 2));
    console.log(`💰 Purchase updated: ${id}`);

    return { success: true, purchase: purchases[index], message: 'Purchase updated successfully' };
  } catch (error) {
    console.error('Error updating purchase:', error);
    return { success: false, message: 'Failed to update purchase' };
  }
}

export function getPurchasesByEmail(email: string): Purchase[] {
  const purchases = getAllPurchases();
  return purchases.filter(p => p.customerEmail.toLowerCase() === email.toLowerCase());
}

export function getPurchasesByGithubUsername(username: string): Purchase[] {
  const purchases = getAllPurchases();
  return purchases.filter(p => p.githubUsername?.toLowerCase() === username.toLowerCase());
}
