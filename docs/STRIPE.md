# Stripe Payment Setup Guide

## ✅ Status: Ready for Real Payments

Your store is now configured to accept real payments through Stripe. Follow these steps to go live:

## 1. Create Stripe Account
1. Go to https://stripe.com and create an account
2. Complete the verification process (may take a few days)
3. Activate your account for live payments

## 2. Get Your API Keys
1. In Stripe Dashboard, go to Developers > API keys
2. Copy your **Publishable key** and **Secret key**
3. Keep these keys secure - never share them publicly

## 3. Update Environment Variables
Create a `.env.local` file in your project root:

```env
# Stripe Keys (Replace with your actual keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key_here
STRIPE_SECRET_KEY=sk_live_your_secret_key_here

# Your domain (for success/cancel URLs)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## 4. Test Your Payment Flow

**Important**: You can test and use payments WITHOUT setting up webhooks first.

1. Start your development server: `npm run dev`
2. Add items to your cart
3. Click "Proceed to Checkout"
4. Use Stripe's test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Declined**: `4000 0000 0000 0002`
   - **Requires 3D Secure**: `4000 0025 0000 3155`
   - Use any future expiry date, any 3-digit CVC, and any ZIP code

### Quick Start (No Webhooks Needed)
For basic functionality, you only need:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 5. Go Live (When Ready)
1. Complete Stripe account verification
2. Switch to live API keys in your environment variables
3. Update `NEXT_PUBLIC_APP_URL` to your production domain

## Advanced Configuration

### Webhook Setup (Optional - For Production)
Webhooks ensure you're notified when payments succeed, even if the customer closes their browser.

**Note**: Webhooks are optional for basic functionality. Your checkout will work without them.

#### To Set Up Webhooks:
1. **First, deploy your app** to get the live URL:
   - **Vercel**: `https://your-app-name.vercel.app`
   - **Netlify**: `https://your-app-name.netlify.app`  
   - **Custom domain**: `https://yourdomain.com`

2. In your Stripe Dashboard, go to "Developers" → "Webhooks"
3. Click "Add endpoint" button
4. Add your webhook URL based on where you deployed:
   - **Vercel**: `https://your-app-name.vercel.app/api/webhooks/stripe`
   - **Netlify**: `https://your-app-name.netlify.app/api/webhooks/stripe`
   - **Custom**: `https://yourdomain.com/api/webhooks/stripe`
5. Select those events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
6. Click "Add endpoint"
7. **After creating the endpoint**, click on it to view details
8. You'll see the "Signing secret" - this starts with `whsec_`
9. Copy this secret and add it to your deployment environment variables:

```bash
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

#### If You Don't See Webhooks:
- Make sure you're in the correct Stripe account
- Check if you're in Test mode vs Live mode
- The webhook secret only appears AFTER you create the webhook endpoint

### Supported Features
- ✅ One-time payments
- ✅ Multiple payment methods (cards, Apple Pay, Google Pay)
- ✅ Automatic receipt emails
- ✅ Tax calculation (can be enabled)
- ✅ International payments
- ✅ Dispute protection
- ✅ Mobile-optimized checkout

### Payment Flow
1. Customer adds items to cart
2. Clicks "Proceed to Checkout"
3. Redirected to secure Stripe Checkout
4. Completes payment
5. Redirected to success page
6. Receives email receipt
7. You receive notification via webhook

### Fees
- **Test mode**: Free
- **Live mode**: 2.9% + 30¢ per successful charge
- No monthly fees, setup fees, or cancellation fees

### Security
- PCI DSS compliant (Stripe handles all card data)
- 3D Secure authentication when required
- Fraud detection and prevention
- End-to-end encryption

## Going to Production

### Before Launch Checklist
- [ ] Complete Stripe account verification
- [ ] Test payments with test cards
- [ ] Set up webhooks
- [ ] Switch to live API keys
- [ ] Update environment variables on your hosting platform
- [ ] Test a live payment with a real card (you can refund it)

### Deployment Notes
Make sure your hosting platform (Vercel, Netlify, etc.) has these environment variables:
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_BASE_URL` (your live domain)
- `STRIPE_WEBHOOK_SECRET` (if using webhooks)

#### Quick Deploy Options:

**Deploy to Vercel (Recommended):**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and connect your GitHub repo
3. Add environment variables in Vercel dashboard
4. Your app will be live at: `https://your-app-name.vercel.app`
5. Use this URL for webhook endpoint: `https://your-app-name.vercel.app/api/webhooks/stripe`

**Deploy to Netlify:**
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and connect your repo
3. Add environment variables in Netlify dashboard
4. Your app will be live at: `https://your-app-name.netlify.app`
5. Use this URL for webhook endpoint: `https://your-app-name.netlify.app/api/webhooks/stripe`

**Important**: You need the live URL first before setting up webhooks in Stripe!

## Start Receiving Money

Once set up, you'll automatically receive payments in your Stripe account:
- Funds are available within 2-7 business days
- Set up instant payouts for faster access
- View all transactions in your Stripe Dashboard
- Download statements for accounting

## Need Help?

- **Stripe Documentation**: [https://stripe.com/docs](https://stripe.com/docs)
- **Test Cards**: [https://stripe.com/docs/testing](https://stripe.com/docs/testing)
- **Support**: Available in your Stripe Dashboard

Your payment system is now ready to accept real money! 🎉
