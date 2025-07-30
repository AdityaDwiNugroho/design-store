// Security utilities for input validation and sanitization

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate product ID (alphanumeric only)
 */
export function isValidProductId(id: string): boolean {
  const idRegex = /^[a-zA-Z0-9]{1,50}$/;
  return idRegex.test(id);
}

/**
 * Validate quantity (positive integer, max 999)
 */
export function isValidQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity > 0 && quantity <= 999;
}

/**
 * Validate search query (prevent injection)
 */
export function sanitizeSearchQuery(query: string): string {
  return query
    .replace(/[<>\"'%;()&+]/g, '') // Remove potentially dangerous characters
    .trim()
    .substring(0, 100); // Limit length
}

/**
 * Generate secure random token
 */
export function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Rate limiting utility
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests: number;
  private readonly windowTime: number;

  constructor(maxRequests: number = 100, windowTime: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowTime = windowTime;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowTime);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }
}

export const rateLimiter = new RateLimiter();

/**
 * Obfuscate sensitive data in logs
 */
export function obfuscateData(data: unknown): unknown {
  if (typeof data === 'string') {
    // Obfuscate email addresses
    if (isValidEmail(data)) {
      const [username, domain] = data.split('@');
      return `${username.charAt(0)}***@${domain}`;
    }
    return data;
  }
  
  if (typeof data === 'object' && data !== null) {
    const obfuscated: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (['email', 'password', 'token', 'secret'].includes(key.toLowerCase())) {
        obfuscated[key] = '***REDACTED***';
      } else {
        obfuscated[key] = obfuscateData(value);
      }
    }
    return obfuscated;
  }
  
  return data;
}

/**
 * Check if localStorage is available (client-side only)
 */
function isLocalStorageAvailable(): boolean {
  try {
    return typeof window !== 'undefined' && 
           typeof window.localStorage !== 'undefined' &&
           window.localStorage !== null;
  } catch {
    return false;
  }
}

/**
 * Secure localStorage wrapper
 */
export class SecureStorage {
  private static encode(data: string): string {
    try {
      // Simple base64 encoding (in production, use proper encryption)
      return btoa(encodeURIComponent(data));
    } catch (error) {
      console.error('SecureStorage: Failed to encode data', error);
      return data; // Fallback to plain text
    }
  }
  
  private static decode(data: string): string {
    try {
      // Try base64 decoding first
      const decoded = atob(data);
      return decodeURIComponent(decoded);
    } catch {
      try {
        // Fallback: try direct decodeURIComponent
        return decodeURIComponent(data);
      } catch {
        // Final fallback: return as is (might be plain JSON)
        return data;
      }
    }
  }
  
  static setItem(key: string, value: unknown): void {
    if (!isLocalStorageAvailable()) {
      console.warn('SecureStorage: localStorage not available');
      return;
    }
    
    try {
      const serialized = JSON.stringify(value);
      const encoded = this.encode(serialized);
      localStorage.setItem(key, encoded);
    } catch (error) {
      console.error('SecureStorage: Failed to set item', obfuscateData({ key, error }));
      // Fallback: try to store as plain JSON
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (fallbackError) {
        console.error('SecureStorage: Fallback storage also failed', obfuscateData({ key, fallbackError }));
      }
    }
  }
  
  static getItem<T>(key: string): T | null {
    if (!isLocalStorageAvailable()) {
      return null;
    }
    
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return null;
      
      // Try to decode the stored data
      const decoded = this.decode(stored);
      return JSON.parse(decoded) as T;
    } catch (error) {
      console.warn('SecureStorage: Failed to decode item, trying direct JSON parse', obfuscateData({ key }));
      
      // Fallback: try direct JSON parsing (for legacy data)
      try {
        const stored = localStorage.getItem(key);
        if (!stored) return null;
        return JSON.parse(stored) as T;
      } catch (fallbackError) {
        console.error('SecureStorage: All decode methods failed', obfuscateData({ key, error, fallbackError }));
        
        // Clear corrupted data
        this.removeItem(key);
        return null;
      }
    }
  }
  
  static removeItem(key: string): void {
    if (!isLocalStorageAvailable()) {
      return;
    }
    
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('SecureStorage: Failed to remove item', obfuscateData({ key, error }));
    }
  }
}
