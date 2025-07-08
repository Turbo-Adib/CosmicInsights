"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Lock, Check, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface CheckoutFormProps {
  plan: 'basic' | 'premium';
  reportId?: string;
  userEmail: string;
}

const PLANS = {
  basic: {
    name: 'Basic Report',
    price: 19,
    originalPrice: 39,
    features: [
      'Complete Life Path analysis',
      'Core numerology numbers',
      'Basic compatibility guide',
      'Personal year forecast',
      'PDF download',
    ],
  },
  premium: {
    name: 'Premium Report',
    price: 49,
    originalPrice: 99,
    features: [
      'Everything in Basic',
      'Advanced relationship analysis',
      'Monthly timing forecasts',
      'Career & wealth guidance',
      'Spiritual development path',
      'Chinese & Western astrology',
      'Personalized action plans',
      'Priority email support',
    ],
  },
};

export default function CheckoutForm({ plan, reportId, userEmail }: CheckoutFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const selectedPlan = PLANS[plan];

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          reportId,
          successUrl: reportId ? `/reports/${reportId}?success=true` : '/dashboard?success=true',
          cancelUrl: reportId ? `/reports/${reportId}?canceled=true` : '/dashboard?canceled=true',
        }),
      });

      const data = await response.json();

      if (data.success && data.checkoutUrl) {
        // Redirect to Stripe checkout
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Review your purchase details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{selectedPlan.name}</h3>
              <p className="text-sm text-muted-foreground">Lifetime access</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">${selectedPlan.price}</p>
              <p className="text-sm text-muted-foreground line-through">
                ${selectedPlan.originalPrice}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">What's included:</h4>
            <ul className="space-y-2">
              {selectedPlan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${selectedPlan.price}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>-${selectedPlan.originalPrice - selectedPlan.price}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${selectedPlan.price}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>Complete your purchase securely</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <p className="text-sm">
              <strong>Email:</strong> {userEmail}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Your report will be sent to this email
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-200 rounded-lg">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <Button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Pay ${selectedPlan.price}
              </>
            )}
          </Button>

          <div className="space-y-2 text-center">
            <p className="text-xs text-muted-foreground">
              🔒 Secure payment powered by Stripe
            </p>
            <p className="text-xs text-muted-foreground">
              30-day money-back guarantee • Cancel anytime
            </p>
          </div>

          {plan === 'basic' && (
            <div className="border rounded-lg p-4 bg-purple-50 dark:bg-purple-950/20">
              <p className="text-sm font-medium mb-1">
                💡 Upgrade to Premium and save!
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Get advanced insights for just ${PLANS.premium.price - PLANS.basic.price} more
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/checkout?plan=premium&report=${reportId}`)}
                className="w-full"
              >
                Upgrade to Premium
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}