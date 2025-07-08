import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
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
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/auth/signin?callbackUrl=/checkout?plan=${searchParams.plan}&report=${searchParams.report}`);
  }

  const plan = searchParams.plan || 'basic';
  const reportId = searchParams.report;

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
        <p className="text-muted-foreground">
          Unlock your complete cosmic blueprint with lifetime access
        </p>
      </div>

      <CheckoutForm 
        plan={plan as 'basic' | 'premium'} 
        reportId={reportId}
        userEmail={session.user.email || ''}
      />
    </div>
  );
}