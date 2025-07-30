import { NextRequest, NextResponse } from 'next/server';
import { validateAdminPassword, isAdminIPAllowed, getClientIP, createAdminAuthCookie, isAdminAuthenticated } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  try {
    // Check IP restriction
    const clientIP = getClientIP(request);
    if (!isAdminIPAllowed(clientIP)) {
      return NextResponse.json(
        { error: 'Access denied from this IP address' },
        { status: 403 }
      );
    }

    // Check authentication cookie
    const cookies = Object.fromEntries(
      request.cookies.getAll().map(cookie => [cookie.name, cookie.value])
    );

    if (isAdminAuthenticated(cookies)) {
      return NextResponse.json(
        { authenticated: true },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
    
  } catch (error) {
    console.error('Admin auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Check IP restriction
    const clientIP = getClientIP(request);
    if (!isAdminIPAllowed(clientIP)) {
      console.warn(`Admin login attempt from unauthorized IP: ${clientIP}`);
      return NextResponse.json(
        { error: 'Access denied from this IP address' },
        { status: 403 }
      );
    }
    
    // Validate password
    if (!validateAdminPassword(password)) {
      console.warn(`Failed admin login attempt from IP: ${clientIP}`);
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
    
    // Create auth cookie
    const authCookie = createAdminAuthCookie(password);
    
    const response = NextResponse.json(
      { success: true, message: 'Authentication successful' },
      { status: 200 }
    );
    
    // Set secure cookie
    response.cookies.set('admin_auth', authCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/' // Changed from '/admin' to '/' for broader access
    });
    
    console.log(`Successful admin login from IP: ${clientIP}`);
    return response;
    
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    { status: 200 }
  );
  
  // Clear auth cookie
  response.cookies.delete('admin_auth');
  
  return response;
}
