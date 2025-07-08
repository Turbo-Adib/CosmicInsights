import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// Stripe price IDs (you'll need to create these in your Stripe dashboard)
const PRICE_IDS = {
  basic: process.env.STRIPE_PRICE_BASIC || 'price_basic_report',
  premium: process.env.STRIPE_PRICE_PREMIUM || 'price_premium_report',
  subscription_monthly: process.env.STRIPE_PRICE_SUB_MONTHLY || 'price_sub_monthly',
  subscription_yearly: process.env.STRIPE_PRICE_SUB_YEARLY || 'price_sub_yearly',
};

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { 
      plan, // 'basic' | 'premium' | 'subscription_monthly' | 'subscription_yearly'
      reportId,
      successUrl = '/reports/[id]?success=true',
      cancelUrl = '/reports/[id]?canceled=true',
    } = body;

    // Validate plan
    if (!plan || !PRICE_IDS[plan as keyof typeof PRICE_IDS]) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    // Get or create Stripe customer
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        stripeCustomerId: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    let stripeCustomerId = user.stripeCustomerId;

    // Create Stripe customer if doesn't exist
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        name: user.name || undefined,
        metadata: {
          userId: user.id,
        },
      });

      stripeCustomerId = customer.id;

      // Save Stripe customer ID
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId },
      });
    }

    // Create line items based on plan
    const lineItems = [{
      price: PRICE_IDS[plan as keyof typeof PRICE_IDS],
      quantity: 1,
    }];

    // Create metadata for the session
    const metadata: Record<string, string> = {
      userId: user.id,
      plan,
    };

    if (reportId) {
      metadata.reportId = reportId;
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: plan.includes('subscription') ? 'subscription' : 'payment',
      success_url: `${process.env.NEXTAUTH_URL}${successUrl.replace('[id]', reportId || 'dashboard')}`,
      cancel_url: `${process.env.NEXTAUTH_URL}${cancelUrl.replace('[id]', reportId || 'dashboard')}`,
      metadata,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      // For subscriptions
      ...(plan.includes('subscription') && {
        subscription_data: {
          metadata,
          trial_period_days: 7, // Optional: Add trial period
        },
      }),
      // For one-time payments
      ...(!plan.includes('subscription') && {
        invoice_creation: {
          enabled: true,
        },
      }),
    });

    // Create a pending purchase record
    if (reportId) {
      await prisma.purchase.create({
        data: {
          userId: user.id,
          stripePaymentId: checkoutSession.id,
          amount: 0, // Will be updated by webhook
          currency: 'usd',
          status: 'PENDING',
          productType: plan.includes('basic') ? 'REPORT_BASIC' : 'REPORT_PREMIUM',
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
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      );
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify the session belongs to the current user
    if (checkoutSession.metadata?.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

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