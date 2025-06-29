import { Card } from "@/components/ui/card"
import { 
  Calculator, 
  Globe, 
  Star, 
  Layers, 
  Binary, 
  Sparkles,
  AlertCircle,
  CheckCircle2 
} from "lucide-react"

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Methodology
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            CosmicInsights combines three powerful ancient systems with modern technology to provide the most accurate spiritual guidance available.
          </p>
        </div>

        {/* Hierarchy of Systems */}
        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Layers className="h-6 w-6 text-purple-600" />
              The Hierarchy of Spiritual Sciences
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Numerology (95% Accuracy)</h3>
                  <p className="text-muted-foreground">
                    The most precise system, superseding all forms of astrology. Based on mathematical principles that govern the universe.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Chinese Astrology</h3>
                  <p className="text-muted-foreground">
                    Earth-based energy system using 12-year cycles. More accurate than Western astrology for personality and compatibility.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Western Astrology</h3>
                  <p className="text-muted-foreground">
                    Planetary influences and zodiac signs. Provides additional context but is least accurate of the three systems.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Core Principles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Core Principles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="h-8 w-8 text-purple-600" />
                <h3 className="text-xl font-semibold">Life Path Numbers</h3>
              </div>
              <p className="text-muted-foreground">
                Your birth date creates an unchangeable numerical blueprint that defines your life's journey, talents, and challenges.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Binary className="h-8 w-8 text-pink-600" />
                <h3 className="text-xl font-semibold">Energy Compatibility</h3>
              </div>
              <p className="text-muted-foreground">
                Numbers have soulmate, friendly, and enemy relationships. Understanding these helps optimize all life decisions.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-semibold">Universal Cycles</h3>
              </div>
              <p className="text-muted-foreground">
                Daily, monthly, and yearly universal energies affect everyone. Timing activities with favorable energy ensures success.
              </p>
            </Card>
          </div>
        </section>

        {/* Advanced Techniques */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Advanced Techniques</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                Gematria
              </h3>
              <p className="text-muted-foreground mb-3">
                Converting letters to numbers reveals hidden energy in names, words, and places. Used for:
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Business naming for success</li>
                <li>• Location energy analysis</li>
                <li>• Name compatibility</li>
              </ul>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Letterology
              </h3>
              <p className="text-muted-foreground mb-3">
                First letters carry dominant energy that shapes personality and destiny. Reveals:
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Career alignment</li>
                <li>• Hidden motivations</li>
                <li>• Communication style</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <h2 className="text-2xl font-bold mb-6">What Makes CosmicInsights Different</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-green-700">
                  <CheckCircle2 className="h-5 w-5" />
                  We Do
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ Use mathematical precision of numerology</li>
                  <li>✓ Consider all three energy systems</li>
                  <li>✓ Provide specific timing guidance</li>
                  <li>✓ Explain enemy/friendly energies</li>
                  <li>✓ Give actionable daily insights</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  We Don't
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✗ Rely solely on Western astrology</li>
                  <li>✗ Make vague predictions</li>
                  <li>✗ Ignore energy compatibility</li>
                  <li>✗ Use generic horoscopes</li>
                  <li>✗ Charge for basic insights</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* Key Concepts */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Key Concepts to Remember</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            <Card className="p-4">
              <p className="font-semibold">Master Numbers (11, 22, 33) are never reduced</p>
              <p className="text-sm text-muted-foreground">These carry special spiritual significance and power</p>
            </Card>
            <Card className="p-4">
              <p className="font-semibold">Zero is the hidden 9</p>
              <p className="text-sm text-muted-foreground">It conceals and amplifies the true nature of adjacent numbers</p>
            </Card>
            <Card className="p-4">
              <p className="font-semibold">First impressions create permanent energy</p>
              <p className="text-sm text-muted-foreground">Founding dates, first meetings, and beginnings are crucial</p>
            </Card>
            <Card className="p-4">
              <p className="font-semibold">Enemy energy should be avoided for major decisions</p>
              <p className="text-sm text-muted-foreground">Know your Life Path's enemies and plan accordingly</p>
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}