"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for exploring your cosmic journey",
    features: [
      "Basic birth chart",
      "Life path number calculation",
      "Monthly personalized insight",
      "Access to community forum",
      "Email support"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Explorer",
    price: "$19",
    period: "/month",
    description: "Unlock deeper insights into your destiny",
    features: [
      "Everything in Free",
      "Complete birth chart analysis",
      "All numerology calculations",
      "Weekly personalized insights",
      "Compatibility reports (3/month)",
      "Priority email support",
      "Downloadable PDF reports"
    ],
    buttonText: "Start Exploring",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    name: "Master",
    price: "$49",
    period: "/month",
    description: "Transform your life with cosmic wisdom",
    features: [
      "Everything in Explorer",
      "Daily personalized insights",
      "Unlimited compatibility reports",
      "Predictive astrology forecasts",
      "Career & life purpose guidance",
      "1-on-1 monthly consultation",
      "Custom meditation practices",
      "Priority 24/7 support"
    ],
    buttonText: "Become a Master",
    buttonVariant: "default" as const,
    popular: false
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
            Choose Your Cosmic Journey
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock the secrets of your birth chart and numerology profile with our tailored plans. 
            Start free and upgrade anytime as you dive deeper into your cosmic insights.
          </p>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`relative h-full ${tier.popular ? 'border-violet-500 shadow-xl' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-violet-600 to-pink-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-8 pt-6">
                  <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                  <CardDescription className="mt-2">{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-6">
                  <Button 
                    variant={tier.buttonVariant}
                    className="w-full"
                    size="lg"
                  >
                    {tier.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16 text-center border-t">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mb-8">
          Have questions? We're here to help you understand our pricing.
        </p>
        <div className="max-w-3xl mx-auto grid gap-6 text-left">
          <div>
            <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
            <p className="text-muted-foreground">
              Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Is there a free trial for paid plans?</h3>
            <p className="text-muted-foreground">
              We offer a 7-day free trial for our Explorer plan. No credit card required to start.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We accept all major credit cards, debit cards, and PayPal through our secure Stripe integration.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}