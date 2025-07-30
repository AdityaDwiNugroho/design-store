import { NextRequest } from 'next/server';

export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded ? forwarded.split(',')[0].trim() : realIp || 'unknown';
  
  // Handle localhost variations
  if (ip === '::ffff:127.0.0.1' || ip === '::ffff:localhost') {
    return '127.0.0.1';
  }
  
  return ip;
}

export function isAdminIPAllowed(ip: string): boolean {
  const allowedIPs = process.env.ALLOWED_ADMIN_IPS?.split(',').map(ip => ip.trim()) || [];
  
  // Add common localhost variations
  const localhostVariations = ['127.0.0.1', '::1', 'localhost'];
  
  return allowedIPs.includes(ip) || localhostVariations.includes(ip);
}

export function validateAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.warn('ADMIN_PASSWORD not set in environment variables');
    return false;
  }
  
  return password === adminPassword;
}

export function isAdminAuthenticated(cookies: { [key: string]: string }): boolean {
  const adminAuth = cookies.admin_auth;
  
  if (!adminAuth) {
    return false;
  }
  
  try {
    const decoded = Buffer.from(adminAuth, 'base64').toString('utf8');
    const { timestamp, password } = JSON.parse(decoded);
    
    // Check if session is less than 24 hours old
    const sessionAge = Date.now() - timestamp;
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (sessionAge > maxAge) {
      return false;
    }
    
    return validateAdminPassword(password);
  } catch {
    return false;
  }
}

export function createAdminAuthCookie(password: string): string {
  const authData = {
    timestamp: Date.now(),
    password
  };
  
  return Buffer.from(JSON.stringify(authData)).toString('base64');
}
