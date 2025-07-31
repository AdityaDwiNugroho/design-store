import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createPurchase } from '@/lib/purchases-db';
import { getProductById } from '@/lib/products-db';
import Stripe from 'stripe';

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Additional security: Track processed sessions to prevent replay attacks
const processedSessions = new Set<string>();

function verifyWebhookSignature(body: string, signature: string): Stripe.Event {
  try {
    return stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err);
    throw new Error('Invalid webhook signature');
  }
}

function validatePurchaseIntegrity(session: Stripe.Checkout.Session): boolean {
  // Verify required fields
  if (!session.id || !session.customer_details?.email || !session.amount_total) {
    console.error('❌ Missing required session data');
    return false;
  }

  // Verify payment was completed
  if (session.payment_status !== 'paid') {
    console.error('❌ Payment not completed');
    return false;
  }

  // Verify session is not too old (prevent replay of old sessions)
  const sessionCreated = new Date(session.created * 1000);
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  
  if (sessionCreated < oneHourAgo) {
    console.error('❌ Session is too old');
    return false;
  }

  return true;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    console.error('❌ Missing Stripe signature');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = verifyWebhookSignature(body, sig);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Additional security: verify event timestamp is recent
  const eventAge = Date.now() / 1000 - event.created;
  if (eventAge > 600) { // 10 minutes
    console.error('❌ Event is too old:', eventAge);
    return NextResponse.json({ error: 'Event too old' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Security: Check if we've already processed this session
      if (processedSessions.has(session.id)) {
        console.log('⚠️ Session already processed:', session.id);
        return NextResponse.json({ received: true });
      }

      // Validate purchase integrity
      if (!validatePurchaseIntegrity(session)) {
        console.error('❌ Purchase integrity validation failed for session:', session.id);
        return NextResponse.json({ error: 'Invalid purchase data' }, { status: 400 });
      }
      
      // Payment was successful
      console.log('💰 Payment successful for session:', session.id);
      console.log('📧 Customer email:', session.customer_details?.email);
      console.log('💵 Amount paid:', session.amount_total);
      
      const customerEmail = session.customer_details?.email;
      
      if (!customerEmail) {
        console.error('❌ No customer email found in session');
        return NextResponse.json({ error: 'Missing customer email' }, { status: 400 });
      }
      
      // Extract and process order items from metadata with validation
      if (session.metadata?.order_items) {
        try {
          const orderItems = JSON.parse(session.metadata.order_items);
          
          // Validate order items structure
          if (!Array.isArray(orderItems) || orderItems.length === 0) {
            throw new Error('Invalid order items format');
          }

          // Validate each item
          for (const item of orderItems) {
            if (!item.id || !item.name || typeof item.price !== 'number' || typeof item.quantity !== 'number') {
              throw new Error('Invalid item structure');
            }
          }
          
          console.log('📦 Order items:', orderItems);
          
          // Verify products exist and prices match
          let totalCalculated = 0;
          const purchaseItems = orderItems.map((item: {
            id: string;
            name: string;
            price: number;
            quantity: number;
          }) => {
            const product = getProductById(item.id);
            
            if (!product) {
              throw new Error(`Product not found: ${item.id}`);
            }

            // Verify price matches (prevent price manipulation)
            if (Math.abs(product.price - item.price) > 0.01) {
              throw new Error(`Price mismatch for product ${item.id}: expected ${product.price}, got ${item.price}`);
            }

            totalCalculated += item.price * item.quantity;
            
            return {
              productId: item.id,
              productName: item.name,
              price: item.price,
              quantity: item.quantity,
              repositoryAccess: product?.repository ? {
                owner: product.repository.owner,
                repo: product.repository.name,
                granted: false,
                accessRequested: false
              } : undefined
            };
          });

          // Verify total amount matches
          const sessionTotal = (session.amount_total || 0) / 100;
          if (Math.abs(totalCalculated - sessionTotal) > 0.01) {
            throw new Error(`Total amount mismatch: expected ${totalCalculated}, got ${sessionTotal}`);
          }
          
          // Create purchase record
          const purchaseResult = createPurchase({
            sessionId: session.id,
            customerEmail: customerEmail,
            items: purchaseItems,
            totalAmount: sessionTotal,
            status: 'completed',
            completedAt: new Date().toISOString()
          });
          
          if (purchaseResult.success) {
            console.log('✅ Purchase record created:', purchaseResult.purchase?.id);
            
            // Mark session as processed
            processedSessions.add(session.id);
            
            // Clean up old sessions from memory (keep last 1000)
            if (processedSessions.size > 1000) {
              const sessionsArray = Array.from(processedSessions);
              processedSessions.clear();
              sessionsArray.slice(-500).forEach(id => processedSessions.add(id));
            }
          } else {
            console.error('❌ Failed to create purchase record:', purchaseResult.message);
            return NextResponse.json({ error: 'Failed to create purchase record' }, { status: 500 });
          }
          
        } catch (error) {
          console.error('❌ Error processing order items:', error);
          return NextResponse.json({ error: 'Invalid order data' }, { status: 400 });
        }
      } else {
        console.error('❌ No order items in session metadata');
        return NextResponse.json({ error: 'Missing order items' }, { status: 400 });
      }
      
      break;
    }
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent was successful:', paymentIntent.id);
      break;
    }
    case 'payment_method.attached': {
      const paymentMethod = event.data.object as Stripe.PaymentMethod;
      console.log('PaymentMethod was attached to a Customer:', paymentMethod.id);
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
