import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber, getAllSubscribers, initializeDatabase } from '@/lib/newsletter-db';
import { isAdminAuthenticated, getClientIP as getAdminClientIP, isAdminIPAllowed } from '@/lib/admin-auth';

// Initialize database on startup
initializeDatabase();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Get client info for tracking
    const ipAddress = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || undefined;

    // Add subscriber to persistent database
    const result = addSubscriber(email, ipAddress, userAgent);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }

    // Log successful subscription
    console.log(`📧 New newsletter subscriber: ${email} from IP: ${ipAddress}`);
    console.log(`📊 Total subscribers: ${result.total}`);

    // In production, you would also:
    // 1. Send confirmation email
    // 2. Add to email marketing service (Mailchimp, ConvertKit, etc.)
    
    // Simulate email service integration
    await simulateEmailService(email);

    return NextResponse.json(
      { 
        message: result.message,
        email: email
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded ? forwarded.split(',')[0].trim() : realIp || 'unknown';
  
  // Handle localhost variations
  if (ip === '::ffff:127.0.0.1' || ip === '::ffff:localhost') {
    return '127.0.0.1';
  }
  
  return ip;
}

// Simulate email service (replace with real service in production)
async function simulateEmailService(email: string) {
  // This is where you'd integrate with:
  // - Mailchimp API
  // - ConvertKit API
  // - SendGrid
  // - Resend
  // - etc.
  
  console.log(`📬 [EMAIL SERVICE] Welcome email sent to: ${email}`);
  
  // Example integration with Mailchimp would look like:
  /*
  const response = await fetch(`https://us1.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed',
    }),
  });
  */
}

// Get all subscribers (for admin purposes)
export async function GET(request: NextRequest) {
  try {
    // Check IP restriction first
    const clientIP = getAdminClientIP(request);
    console.log(`Newsletter GET request from IP: ${clientIP}`);
    
    if (!isAdminIPAllowed(clientIP)) {
      console.log(`IP ${clientIP} not allowed`);
      return NextResponse.json(
        { error: 'Access denied from this IP address' },
        { status: 403 }
      );
    }

    // Check admin authentication using the proper auth system
    const cookies = Object.fromEntries(
      request.cookies.getAll().map(cookie => [cookie.name, cookie.value])
    );
    
    console.log('Available cookies:', Object.keys(cookies));
    console.log('Admin auth cookie present:', !!cookies.admin_auth);
    
    if (!isAdminAuthenticated(cookies)) {
      console.log('Admin authentication failed');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Admin authentication successful, fetching subscribers');
    const { subscribers, total } = getAllSubscribers();
    
    return NextResponse.json({
      total,
      subscribers: subscribers.map(sub => ({
        email: sub.email,
        subscribedAt: sub.subscribedAt,
        ipAddress: sub.ipAddress
      }))
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}