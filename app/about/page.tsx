import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Scale, Info, Star, Globe, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "About | CosmicInsights",
  description: "Learn about CosmicInsights - Your personalized numerology and astrology platform",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            About CosmicInsights
          </h1>
          <p className="text-xl text-muted-foreground">
            Transforming Ancient Wisdom into Modern Guidance
          </p>
        </div>

        {/* Mission Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-violet-600" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <p>
              CosmicInsights bridges the gap between ancient astrological and numerological wisdom 
              and modern life decisions. We believe that everyone deserves access to personalized 
              guidance that helps them navigate life's challenges and opportunities with confidence.
            </p>
            <p>
              Our platform combines time-tested calculation methods with cutting-edge AI technology 
              to deliver insights that are both deeply rooted in tradition and relevant to 
              contemporary life.
            </p>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-violet-600" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-semibold">Astrological Calculations</h3>
                <p className="text-sm text-muted-foreground">
                  We calculate your birth chart using precise astronomical data, determining 
                  planetary positions at your exact time and place of birth.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Numerological Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Your name and birth date are analyzed using established numerological 
                  principles to reveal life path numbers, expression numbers, and more.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">AI-Powered Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI interprets these calculations to provide personalized, actionable 
                  guidance tailored to your unique profile and current life circumstances.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Daily Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Receive fresh insights daily based on planetary transits and numerological 
                  cycles, helping you make the most of each day's unique energy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Disclaimers */}
        <Card className="border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
              <Info className="h-5 w-5" />
              Important Information & Disclaimers
            </CardTitle>
            <CardDescription className="text-amber-800 dark:text-amber-200">
              Please read this section carefully
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-sm">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Information Sources</h4>
                  <p className="text-muted-foreground">
                    All astrological and numerological information provided by CosmicInsights is 
                    derived exclusively from publicly available resources, ancient texts, and 
                    established calculation methods that have been in the public domain for 
                    centuries. No proprietary or copyrighted calculation methods are used.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Scale className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Intellectual Property Compliance</h4>
                  <p className="text-muted-foreground">
                    CosmicInsights respects all intellectual property rights. Our platform uses 
                    only traditional astrological and numerological principles that are not 
                    subject to copyright protection. No intellectual property laws have been 
                    violated in the creation or operation of this service.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Educational & Entertainment Purposes</h4>
                  <p className="text-muted-foreground">
                    The insights and guidance provided by CosmicInsights are intended for 
                    educational and entertainment purposes only. They should not be used as a 
                    substitute for professional advice in areas such as medical, legal, financial, 
                    or psychological matters.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground">
                By using CosmicInsights, you acknowledge that all calculations are based on 
                traditional methods available in the public domain, and that the service is 
                provided for personal insight and entertainment purposes only. Always consult 
                qualified professionals for important life decisions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-violet-600" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <p>
              Your privacy is our priority. We use industry-standard encryption to protect your 
              personal data, including birth information. Your data is never sold to third parties 
              and is used solely to provide you with personalized astrological and numerological 
              insights.
            </p>
            <p>
              For more details, please review our Privacy Policy and Terms of Service.
            </p>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="text-center space-y-4 pt-8">
          <h2 className="text-2xl font-semibold">Questions or Feedback?</h2>
          <p className="text-muted-foreground">
            We'd love to hear from you. Contact us at support@cosmicinsights.com
          </p>
        </div>
      </div>
    </div>
  );
}