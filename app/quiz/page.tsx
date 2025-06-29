import { NumerologyQuiz } from "@/components/quiz/numerology-quiz";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </div>

        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Discover Your{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Life Path Number
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Answer a few quick questions to unlock your personalized numerology insights
            and discover your cosmic potential.
          </p>
        </div>

        <NumerologyQuiz />
      </div>
    </main>
  );
}