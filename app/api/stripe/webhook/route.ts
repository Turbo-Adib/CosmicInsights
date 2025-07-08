import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature found' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(invoice);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCanceled(subscription);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailed(paymentIntent);
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const { userId, plan, reportId } = session.metadata || {};

  if (!userId) {
    console.error('No userId in session metadata');
    return;
  }

  // Update purchase record
  if (session.payment_intent) {
    await prisma.purchase.updateMany({
      where: {
        stripePaymentId: session.id,
      },
      data: {
        status: 'COMPLETED',
        amount: session.amount_total || 0,
        currency: session.currency || 'usd',
      },
    });
  }

  // Update report to paid if applicable
  if (reportId && (plan === 'basic' || plan === 'premium')) {
    await prisma.report.update({
      where: { id: reportId },
      data: {
        isPaid: true,
        purchasedAt: new Date(),
        accessLevel: plan,
      },
    });

    // Create or update user subscription for report access
    const existingSubscription = await prisma.subscription.findFirst({
      where: { userId },
    });

    if (!existingSubscription) {
      await prisma.subscription.create({
        data: {
          userId,
          stripeSubscriptionId: null, // One-time purchase
          stripeCustomerId: session.customer as string,
          status: 'ACTIVE',
          plan: plan === 'premium' ? 'PREMIUM' : 'BASIC',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year access
        },
      });
    } else if (plan === 'premium' && existingSubscription.plan === 'BASIC') {
      // Upgrade to premium
      await prisma.subscription.update({
        where: { id: existingSubscription.id },
        data: {
          plan: 'PREMIUM',
          updatedAt: new Date(),
        },
      });
    }
  }

  // Send confirmation email
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true },
    });

    if (user?.email) {
      // TODO: Send email using SendGrid
      console.log(`Send purchase confirmation to ${user.email}`);
    }
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  
  // Find user by Stripe customer ID
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    console.error(`No user found for customer ${customerId}`);
    return;
  }

  // Determine plan from price ID
  const priceId = subscription.items.data[0]?.price.id;
  let plan: 'BASIC' | 'PREMIUM' = 'BASIC';
  
  if (priceId === process.env.STRIPE_PRICE_SUB_MONTHLY || 
      priceId === process.env.STRIPE_PRICE_SUB_YEARLY) {
    plan = 'PREMIUM';
  }

  // Update or create subscription record
  await prisma.subscription.upsert({
    where: {
      stripeSubscriptionId: subscription.id,
    },
    update: {
      status: subscription.status === 'active' ? 'ACTIVE' : 
              subscription.status === 'past_due' ? 'PAST_DUE' : 
              subscription.status === 'canceled' ? 'CANCELLED' : 'INACTIVE',
      plan,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      updatedAt: new Date(),
    },
    create: {
      userId: user.id,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: customerId,
      status: 'ACTIVE',
      plan,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  await prisma.subscription.update({
    where: {
      stripeSubscriptionId: subscription.id,
    },
    data: {
      status: 'CANCELLED',
      cancelledAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  // Record subscription renewal
  if (invoice.subscription) {
    const subscriptionId = invoice.subscription as string;
    
    // Create purchase record for subscription payment
    if (invoice.customer && invoice.payment_intent) {
      const user = await prisma.user.findFirst({
        where: { stripeCustomerId: invoice.customer as string },
      });

      if (user) {
        await prisma.purchase.create({
          data: {
            userId: user.id,
            stripePaymentId: invoice.payment_intent as string,
            amount: invoice.amount_paid,
            currency: invoice.currency,
            status: 'COMPLETED',
            productType: 'SUBSCRIPTION',
            description: `Subscription renewal - ${invoice.lines.data[0]?.description || 'Premium Plan'}`,
          },
        });
      }
    }
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  // Update purchase record to failed
  await prisma.purchase.updateMany({
    where: {
      stripePaymentId: paymentIntent.id,
    },
    data: {
      status: 'FAILED',
      updatedAt: new Date(),
    },
  });

  // TODO: Send payment failed email
  console.log(`Payment failed for ${paymentIntent.id}`);
}