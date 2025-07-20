"use client";

import { ComprehensiveReport } from "@/components/reports/comprehensive-report";

// Test data that mimics the enhanced API response
const mockReportData = {
  id: "test-123",
  title: "Your Cosmic Insights Report",
  type: "NUMEROLOGY_PROFILE",
  createdAt: new Date().toISOString(),
  content: {
    numerology: {
      lifePathNumber: 7,
      lifePathSummary: "The Seeker - Spiritual, analytical, and introspective",
      lifePathMeaning: {
        overview: "As a Life Path 7, you are on a journey of spiritual discovery and intellectual mastery. Your path is one of seeking truth, wisdom, and deeper understanding of life's mysteries.",
        strengths: ["Deep analytical thinking", "Spiritual awareness", "Research abilities", "Intuitive insights", "Independent thinking"],
        challenges: ["Overthinking", "Social isolation", "Trusting others", "Expressing emotions"],
        opportunities: ["Teaching and mentoring", "Research breakthroughs", "Spiritual leadership", "Writing and publishing"],
      },
      expressionNumber: 3,
      expressionMeaning: "Creative communicator with artistic flair",
      birthDayNumber: 15,
      birthDayMeaning: "Day 15: Karmic lessons around independence",
      lifePathCalculation: "Birth date 3/15/1990 → 3 + 15 + 1990 → Reduces to 7",
    },
    personalityProfile: {
      overview: "As a Life Path 7, you possess the seeker - spiritual, analytical, and introspective. Your solitude energy source combined with your intuition decision-making style creates a unique approach to life that sets you apart.",
      strengths: ["Deep analytical thinking", "Spiritual awareness", "Research abilities", "Strong inner guidance system", "Natural networking abilities"],
      challenges: ["Overthinking", "Social isolation", "May isolate when support is needed", "Flexibility when plans change"],
      insights: ["Your need for solitude supports your Life Path's introspective nature.", "Trust your gut - it's aligned with your soul's wisdom"],
    },
    currentInfluences: {
      personalYear: { year: 5, theme: "Change & Adventure", focus: "Embrace change and seek new experiences" },
      personalMonth: { month: 3, theme: "Creative Expression", focus: "Express yourself creatively and socialize" },
      currentPhase: "transforming",
      recommendations: [
        "Trust the transformation process unfolding",
        "Your numbers support bold career moves this year",
        "Focus on planting seeds for future growth"
      ],
    },
    compatibility: {
      bestMatches: {
        soulmates: [5, 7, 11],
        compatible: [1, 3, 9],
        growth: [4, 8],
        description: "As a Life Path 7, you connect best with numbers that respect your depth and wisdom",
      },
      relationshipStyle: "Your relationship style is deep and selective, enhanced by your independent approach to partnerships.",
      tips: ["Share your inner world gradually", "Physical affection balances mental connection"],
    },
    career: {
      overview: "Your Life Path 7 thrives in careers that allow you to spiritual wisdom and deep analysis. With your service career motivation, you're naturally drawn to roles where you can make a meaningful impact.",
      topCareers: ["Researcher", "Analyst", "Spiritual Teacher"],
      workStyle: "Strategic analyst who sees deeper patterns",
    },
    lockedSections: {
      deepAnalysis: {
        title: "🔒 Deep Soul Mission & Karmic Patterns",
        preview: "Uncover your soul's true purpose and past life influences",
        samples: [
          "Your karmic debt number reveals...",
          "Hidden talents waiting to emerge...",
          "Spiritual gifts you're meant to develop..."
        ],
      },
      advancedCompatibility: {
        title: "🔒 Complete Compatibility Analysis",
        preview: "Detailed compatibility with all Life Path numbers",
        samples: [
          "Soulmate indicators and timing",
          "Karmic relationship patterns",
          "Compatibility percentage calculator"
        ],
      },
      monthByMonth: {
        title: "🔒 12-Month Personal Forecast",
        preview: "Precise timing for love, money, and major decisions",
        samples: [
          "February: Major opportunity for career advancement...",
          "Lucky days for financial decisions",
          "Best months for finding love"
        ],
      },
      actionPlan: {
        title: "🔒 Your 90-Day Success Blueprint",
        preview: "Step-by-step personalized action plan",
        samples: [
          "Week 1-2: Foundation building exercises",
          "Daily rituals for your Life Path",
          "Manifestation techniques for your numbers"
        ],
      },
    },
    upgradePrompt: {
      message: "Unlock your complete cosmic blueprint",
      price: "$9",
      savings: "Usually $49 - Save 80% today",
      bonuses: [
        "✨ Lifetime access to your full report",
        "📊 Monthly forecast updates",
        "💎 Bonus: Lucky numbers & crystals guide",
        "📧 Email support from our numerologists"
      ],
    },
  },
  accessLevel: "teaser",
  isPaid: false,
};

export default function TestReportPage() {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Test Report Display</h1>
        <p className="text-muted-foreground">
          This is a test page to verify the comprehensive report component is working
        </p>
      </div>

      <ComprehensiveReport
        reportId="test-123"
        reportData={mockReportData}
        accessLevel="teaser"
      />
    </div>
  );
}