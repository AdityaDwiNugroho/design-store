import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded ? forwarded.split(',')[0] : realIp || 'unknown';
  return `rate_limit_${ip}`;
}

function isRateLimited(request: NextRequest): boolean {
  const key = getRateLimitKey(request);
  const now = Date.now();
  const windowTime = 60 * 1000; // 1 minute
  const maxRequests = 100; // Max requests per minute

  const record = rateLimitMap.get(key);
  
  if (!record || now - record.timestamp > windowTime) {
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return false;
  }
  
  if (record.count >= maxRequests) {
    return true;
  }
  
  record.count++;
  return false;
}

function validateRequest(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent');
  
  // Block known malicious user agents
  const maliciousPatterns = [
    /sqlmap/i,
    /nikto/i,
    /burp/i,
    /nmap/i,
    /masscan/i,
    /zap/i,
    /acunetix/i,
  ];
  
  if (userAgent && maliciousPatterns.some(pattern => pattern.test(userAgent))) {
    return false;
  }
  
  // Block requests with suspicious paths (but allow our admin routes)
  const path = request.nextUrl.pathname;
  const suspiciousPaths = [
    '/.env',
    '/wp-admin',
    '/phpmyadmin',
    '/wp-login.php',
    '/config',
    '/.git',
    '/backup',
    '/database',
  ];
  
  // Allow our specific admin routes
  if (path.startsWith('/admin/newsletter') || path.startsWith('/admin/products')) {
    return true;
  }
  
  // Block other admin paths
  if (path.includes('/admin') && !path.startsWith('/admin/newsletter') && !path.startsWith('/admin/products')) {
    return false;
  }
  
  if (suspiciousPaths.some(suspiciousPath => path.includes(suspiciousPath))) {
    return false;
  }
  
  return true;
}

export function middleware(request: NextRequest) {
  // Security validations
  if (!validateRequest(request)) {
    const ip = getRateLimitKey(request).replace('rate_limit_', '');
    console.warn(`Blocked suspicious request from ${ip}: ${request.nextUrl.pathname}`);
    return new NextResponse('Forbidden', { status: 403 });
  }
  
  // Rate limiting
  if (isRateLimited(request)) {
    const ip = getRateLimitKey(request).replace('rate_limit_', '');
    console.warn(`Rate limit exceeded for ${ip}`);
    return new NextResponse('Too Many Requests', { 
      status: 429,
      headers: {
        'Retry-After': '60',
      },
    });
  }
  
  // Add security headers to response
  const response = NextResponse.next();
  
  // Security headers to prevent common attacks
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Content Security Policy
  response.headers.set('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https://api.stripe.com https://api.resend.com; " +
    "frame-src https://js.stripe.com; " +
    "object-src 'none'; " +
    "base-uri 'self'"
  );
  
  // Additional security headers
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  
  // Strict Transport Security (HTTPS only)
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // Remove server information
  response.headers.delete('server');
  response.headers.delete('x-powered-by');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
