import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Payment was successful
      console.log('Payment successful for session:', session.id);
      console.log('Customer email:', session.customer_details?.email);
      console.log('Amount paid:', session.amount_total);
      
      // Here you can:
      // - Send confirmation email to customer
      // - Save order to database
      // - Generate download links
      // - Update inventory
      
      // Extract order items from metadata
      if (session.metadata?.order_items) {
        const orderItems = JSON.parse(session.metadata.order_items);
        console.log('Order items:', orderItems);
        
        // TODO: Process the order items
        // - Create download links for digital products
        // - Send email with download instructions
        // - Store order in database
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
