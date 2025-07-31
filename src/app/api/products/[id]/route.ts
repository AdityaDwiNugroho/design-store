import { NextRequest, NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/lib/products-db';
import { isAdminAuthenticated, getClientIP as getAdminClientIP, isAdminIPAllowed } from '@/lib/admin-auth';

// GET - Fetch single product (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = getProductById(id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT - Update product (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const productData = await request.json();
    
    // Ensure tags is an array
    if (productData.tags && typeof productData.tags === 'string') {
      productData.tags = productData.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean);
    }
    
    const result = updateProduct(id, productData);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: result.message === 'Product not found' ? 404 : 400 }
      );
    }

    return NextResponse.json({ 
      message: result.message, 
      product: result.product 
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE - Delete product (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const result = deleteProduct(id);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: result.message === 'Product not found' ? 404 : 400 }
      );
    }

    return NextResponse.json({ message: result.message });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
