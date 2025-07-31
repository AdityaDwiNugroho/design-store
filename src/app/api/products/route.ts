import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@/lib/products-db';
import { isAdminAuthenticated, getClientIP as getAdminClientIP, isAdminIPAllowed } from '@/lib/admin-auth';

// GET - Fetch all products (public)
export async function GET() {
  try {
    const result = getAllProducts();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Create new product (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check IP first
    const clientIP = getAdminClientIP(request);
    if (!isAdminIPAllowed(clientIP)) {
      return NextResponse.json(
        { error: 'Access denied from this IP address' },
        { status: 403 }
      );
    }

    // Check authentication
    const cookies = Object.fromEntries(
      request.cookies.getAll().map(cookie => [cookie.name, cookie.value])
    );

    if (!isAdminAuthenticated(cookies)) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const productData = await request.json();
    
    // Validate required fields
    if (!productData.name || !productData.price || !productData.category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, category' },
        { status: 400 }
      );
    }

    // Ensure tags is an array
    if (!productData.tags) {
      productData.tags = [];
    } else if (typeof productData.tags === 'string') {
      productData.tags = productData.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean);
    }

    const result = createProduct(productData);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      message: result.message, 
      product: result.product 
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
