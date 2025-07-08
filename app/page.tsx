import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star, Brain, Heart, Calendar } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 dark:from-purple-950/20 dark:via-background dark:to-purple-950/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Cosmic Blueprint
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Advanced numerology calculations reveal your life path, perfect timing, and relationship compatibility.
            </p>

            {/* Big CTA Button */}
            <div className="pt-8">
              <Link href="/quiz">
                <Button size="lg" className="text-xl px-12 py-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-xl">
                  <Sparkles className="mr-3 h-6 w-6" />
                  Calculate Your Numbers Free
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                No credit card required • 2-minute quiz • Instant results
              </p>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Trusted by <span className="font-semibold text-foreground">50,000+</span> seekers worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Discover Section */}
      <section className="py-16 bg-purple-50/50 dark:bg-purple-950/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Your Personal Energy Blueprint
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 mb-4">
                <span className="text-2xl font-bold text-purple-600">1-33</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Life Path Number</h3>
              <p className="text-muted-foreground">
                Your unchangeable blueprint. 95% accurate in predicting life patterns, talents, and challenges.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center">
              <Calendar className="h-16 w-16 mx-auto text-pink-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Universal Timing</h3>
              <p className="text-muted-foreground">
                Daily and yearly energy cycles. Know exactly when to act for maximum success.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center">
              <Heart className="h-16 w-16 mx-auto text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Compatibility Analysis</h3>
              <p className="text-muted-foreground">
                Soulmate vs enemy energy. Understand who enhances your life and who to avoid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Numerology Works */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Numerology Is 95% Accurate
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Unlike vague horoscopes, numerology uses mathematical principles that govern the universe. Your birth date creates an unchangeable energy blueprint.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Perfect Timing Formula
              </h3>
              <p className="text-muted-foreground">
                Universal days 1, 8, and 22 for business. Avoid 7 and 9 for relationships. Mathematical precision, not guesswork.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-600" />
                Compatibility Science
              </h3>
              <p className="text-muted-foreground">
                Life Path 1 + 9 = Soulmates. 4 + 1 = Enemies. Know exactly who enhances or drains your energy.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Calculate Your Numbers Now
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stop guessing. Start knowing. Your birth date holds the key to everything.
          </p>
          
          <Link href="/quiz">
            <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Get Your Free Reading
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>✓ 100% Free</span>
            <span>✓ 2-Minute Quiz</span>
            <span>✓ Instant Results</span>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Questions? Check our <Link href="/methodology" className="text-purple-600 hover:underline">methodology</Link> or <Link href="/auth/signin" className="text-purple-600 hover:underline">sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}