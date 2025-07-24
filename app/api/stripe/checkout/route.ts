import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// Stripe price IDs (you'll need to create these in your Stripe dashboard)
const PRICE_IDS = {
  report: process.env.STRIPE_PRICE_REPORT || 'price_report_onetime',
  basic: process.env.STRIPE_PRICE_BASIC || 'price_basic_report',
  premium: process.env.STRIPE_PRICE_PREMIUM || 'price_premium_report',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      plan, // 'report' | 'basic' | 'premium'
      reportId,
      email,
      successUrl = '/reports/[id]?success=true',
      cancelUrl = '/reports/[id]?canceled=true',
    } = body;

    // Validate email for anonymous purchases
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    // Validate plan
    if (!plan || !PRICE_IDS[plan as keyof typeof PRICE_IDS]) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    // For anonymous purchases, create a guest customer
    const customer = await stripe.customers.create({
      email: email,
      metadata: {
        reportId: reportId || '',
        purchaseType: 'one-time',
      },
    });

    // Create line items based on plan
    const lineItems = [{
      price: PRICE_IDS[plan as keyof typeof PRICE_IDS],
      quantity: 1,
    }];

    // Create metadata for the session
    const metadata: Record<string, string> = {
      email,
      plan,
    };

    if (reportId) {
      metadata.reportId = reportId;
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customer.id,
      customer_email: email,
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}${successUrl.replace('[id]', reportId || '')}`,
      cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}${cancelUrl.replace('[id]', reportId || '')}`,
      metadata,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      invoice_creation: {
        enabled: true,
      },
    });

    // Create a pending purchase record
    if (reportId) {
      await prisma.purchase.create({
        data: {
          userId: null, // Anonymous purchase
          email: email,
          stripePaymentIntentId: checkoutSession.id,
          amount: plan === 'report' ? 9 : plan === 'basic' ? 19 : 49,
          currency: 'usd',
          status: 'PENDING',
          productType: 'DETAILED_REPORT',
          productId: reportId,
        },
      });
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: checkoutSession.url,
      sessionId: checkoutSession.id,
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

// Get checkout session status
export async function GET(request: NextRequest) {
  try {
    // No authentication needed for checking session status

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      );
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    // No user verification needed for anonymous purchases

    return NextResponse.json({
      success: true,
      status: checkoutSession.payment_status,
      customerEmail: checkoutSession.customer_email,
    });

  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve checkout session' },
      { status: 500 }
    );
  }
}