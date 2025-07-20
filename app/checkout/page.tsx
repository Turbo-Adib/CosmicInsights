import { Metadata } from "next";
import { redirect } from "next/navigation";
import CheckoutForm from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "Checkout | CosmicInsights",
  description: "Complete your purchase to unlock your cosmic insights",
};

interface CheckoutPageProps {
  searchParams: {
    plan?: string;
    report?: string;
  };
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const plan = searchParams.plan || 'report';
  const reportId = searchParams.report;

  // Require a report ID for checkout
  if (!reportId) {
    redirect('/');
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
        <p className="text-muted-foreground">
          Unlock your complete cosmic blueprint with lifetime access
        </p>
      </div>

      <CheckoutForm 
        plan={plan as 'basic' | 'premium' | 'report'} 
        reportId={reportId}
        userEmail="" // Will be collected in the form
      />
    </div>
  );
}