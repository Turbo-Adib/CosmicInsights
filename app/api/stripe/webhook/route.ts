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

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const { email, plan, reportId } = session.metadata || {};

  if (!email || !reportId) {
    console.error('Missing email or reportId in session metadata');
    return;
  }

  // Update purchase record
  if (session.payment_intent) {
    await prisma.purchase.updateMany({
      where: {
        stripePaymentIntentId: session.id,
      },
      data: {
        status: 'COMPLETED',
        amount: (session.amount_total || 0) / 100, // Convert from cents
        currency: session.currency || 'usd',
      },
    });
  }

  // Update report to paid
  if (reportId) {
    await prisma.report.update({
      where: { id: reportId },
      data: {
        isPaid: true,
        purchasedAt: new Date(),
        accessLevel: 'premium', // Full access after payment
      },
    });
  }

  // Send confirmation email
  try {
    // TODO: Implement SendGrid email
    console.log(`Send purchase confirmation to ${email} for report ${reportId}`);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}