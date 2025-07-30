import fs from 'fs';
import path from 'path';

interface Subscriber {
  email: string;
  subscribedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

// Database file path
const DB_PATH = path.join(process.cwd(), 'data', 'subscribers.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read subscribers from file
export function readSubscribers(): Subscriber[] {
  try {
    ensureDataDir();
    
    if (!fs.existsSync(DB_PATH)) {
      // Create empty file if it doesn't exist
      fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
      return [];
    }
    
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data) || [];
  } catch (error) {
    console.error('Error reading subscribers:', error);
    return [];
  }
}

// Write subscribers to file
export function writeSubscribers(subscribers: Subscriber[]): boolean {
  try {
    ensureDataDir();
    fs.writeFileSync(DB_PATH, JSON.stringify(subscribers, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing subscribers:', error);
    return false;
  }
}

// Add a new subscriber
export function addSubscriber(
  email: string, 
  ipAddress?: string, 
  userAgent?: string
): { success: boolean; message: string; total: number } {
  try {
    const subscribers = readSubscribers();
    
    // Check if email already exists
    const existingSubscriber = subscribers.find(sub => sub.email.toLowerCase() === email.toLowerCase());
    if (existingSubscriber) {
      return {
        success: false,
        message: 'This email is already subscribed to our newsletter',
        total: subscribers.length
      };
    }
    
    // Add new subscriber
    const newSubscriber: Subscriber = {
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
      ipAddress,
      userAgent
    };
    
    subscribers.push(newSubscriber);
    
    // Save to file
    if (writeSubscribers(subscribers)) {
      console.log(`✅ New subscriber added: ${email} (Total: ${subscribers.length})`);
      return {
        success: true,
        message: 'Successfully subscribed to newsletter!',
        total: subscribers.length
      };
    } else {
      return {
        success: false,
        message: 'Failed to save subscription. Please try again.',
        total: subscribers.length
      };
    }
    
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return {
      success: false,
      message: 'Internal server error',
      total: 0
    };
  }
}

// Get all subscribers
export function getAllSubscribers(): { subscribers: Subscriber[]; total: number } {
  const subscribers = readSubscribers();
  return {
    subscribers,
    total: subscribers.length
  };
}

// Remove a subscriber (for unsubscribe functionality)
export function removeSubscriber(email: string): { success: boolean; message: string } {
  try {
    const subscribers = readSubscribers();
    const initialLength = subscribers.length;
    
    const filteredSubscribers = subscribers.filter(
      sub => sub.email.toLowerCase() !== email.toLowerCase()
    );
    
    if (filteredSubscribers.length === initialLength) {
      return {
        success: false,
        message: 'Email not found in subscriber list'
      };
    }
    
    if (writeSubscribers(filteredSubscribers)) {
      console.log(`🗑️ Subscriber removed: ${email}`);
      return {
        success: true,
        message: 'Successfully unsubscribed'
      };
    } else {
      return {
        success: false,
        message: 'Failed to remove subscription'
      };
    }
    
  } catch (error) {
    console.error('Error removing subscriber:', error);
    return {
      success: false,
      message: 'Internal server error'
    };
  }
}

// Get subscriber statistics
export function getSubscriberStats() {
  const subscribers = readSubscribers();
  
  // Group by month
  const monthlyStats: { [key: string]: number } = {};
  
  subscribers.forEach(sub => {
    const date = new Date(sub.subscribedAt);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthlyStats[monthKey] = (monthlyStats[monthKey] || 0) + 1;
  });
  
  return {
    total: subscribers.length,
    thisMonth: monthlyStats[`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`] || 0,
    monthlyBreakdown: monthlyStats,
    latestSubscription: subscribers.length > 0 ? subscribers[subscribers.length - 1].subscribedAt : null
  };
}

// Export subscribers to CSV format
export function exportSubscribersCSV(): string {
  const subscribers = readSubscribers();
  
  const csvHeader = 'Email,Subscribed At,IP Address,User Agent\n';
  const csvData = subscribers.map(sub => {
    const subscribedAt = new Date(sub.subscribedAt).toLocaleString();
    return `"${sub.email}","${subscribedAt}","${sub.ipAddress || 'N/A'}","${(sub.userAgent || 'N/A').replace(/"/g, '""')}"`;
  }).join('\n');
  
  return csvHeader + csvData;
}

// Initialize database (create file if it doesn't exist)
export function initializeDatabase(): void {
  ensureDataDir();
  if (!fs.existsSync(DB_PATH)) {
    writeSubscribers([]);
    console.log('📁 Newsletter database initialized at:', DB_PATH);
  } else {
    const { total } = getAllSubscribers();
    console.log(`📊 Newsletter database loaded with ${total} subscribers`);
  }
}
