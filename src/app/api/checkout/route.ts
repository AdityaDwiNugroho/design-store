import { NextRequest, NextResponse } from 'next/server';
import { stripe, formatAmountForStripe } from '@/lib/stripe';
import { CartItem } from '@/types';
import { getProductById } from '@/lib/products-db';
import crypto from 'crypto';

// Rate limiting for checkout requests
const checkoutAttempts = new Map<string, { count: number; timestamp: number }>();

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded ? forwarded.split(',')[0] : realIp || 'unknown';
  return crypto.createHash('sha256').update(ip).digest('hex');
}

function isCheckoutRateLimited(key: string): boolean {
  const now = Date.now();
  const windowTime = 60 * 1000; // 1 minute
  const maxAttempts = 5; // Max 5 checkout attempts per minute

  const record = checkoutAttempts.get(key);
  
  if (!record || now - record.timestamp > windowTime) {
    checkoutAttempts.set(key, { count: 1, timestamp: now });
    return false;
  }
  
  if (record.count >= maxAttempts) {
    return true;
  }
  
  record.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (isCheckoutRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Too many checkout attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { items }: { items: CartItem[] } = body;

    console.log('📦 Checkout request received with items:', items?.length || 0);

    // Input validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.log('❌ No items in cart');
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Validate maximum items limit
    if (items.length > 20) {
      return NextResponse.json(
        { error: 'Too many items in cart. Maximum 20 items allowed.' },
        { status: 400 }
      );
    }

    // Validate each item and verify against database
    let totalAmount = 0;
    for (const item of items) {
      // Basic structure validation
      if (!item.product || !item.product.id || !item.product.name || typeof item.product.price !== 'number' || typeof item.quantity !== 'number') {
        console.error('❌ Invalid item structure in cart:', item);
        return NextResponse.json(
          { error: 'Invalid item in cart' },
          { status: 400 }
        );
      }

      // Validate quantity
      if (item.quantity < 1 || item.quantity > 10) {
        return NextResponse.json(
          { error: 'Invalid quantity. Must be between 1 and 10.' },
          { status: 400 }
        );
      }

      // Verify product exists and price matches
      const dbProduct = getProductById(item.product.id);
      if (!dbProduct) {
        console.error('❌ Product not found in database:', item.product.id);
        return NextResponse.json(
          { error: `Product not found: ${item.product.id}` },
          { status: 404 }
        );
      }

      // Verify price matches database (prevent price manipulation)
      if (Math.abs(dbProduct.price - item.product.price) > 0.01) {
        console.error('❌ Price mismatch for product:', item.product.id, 'Expected:', dbProduct.price, 'Got:', item.product.price);
        return NextResponse.json(
          { error: 'Invalid product price' },
          { status: 400 }
        );
      }

      totalAmount += item.product.price * item.quantity;
    }

    // Validate total amount is reasonable
    if (totalAmount < 0.50 || totalAmount > 10000) {
      return NextResponse.json(
        { error: 'Invalid total amount' },
        { status: 400 }
      );
    }

    console.log('💳 Creating Stripe checkout session...');

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item) => {
        // Only include images if they are publicly accessible URLs
        const productData: {
          name: string;
          description?: string;
          images?: string[];
        } = {
          name: item.product.name,
          description: item.product.description,
        };
        
        // Only add images if they are from external sources (not localhost or relative paths)
        if (item.product.image && item.product.image.startsWith('https://')) {
          productData.images = [item.product.image];
        }
        
        return {
          price_data: {
            currency: 'usd',
            product_data: productData,
            unit_amount: formatAmountForStripe(item.product.price),
          },
          quantity: item.quantity,
        };
      }),
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cart`,
      metadata: {
        order_items: JSON.stringify(items.map(item => ({
          id: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })))
      },
      // Enable automatic tax calculation (optional)
      automatic_tax: { enabled: false },
      // Add customer email collection
      customer_creation: 'always',
      // Add billing address collection
      billing_address_collection: 'required',
    });

    console.log('✅ Stripe checkout session created:', session.id);
    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('❌ Stripe checkout error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
