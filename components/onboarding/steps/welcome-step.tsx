"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useOnboarding } from "../onboarding-context"
import { Sparkles, Moon, Star } from "lucide-react"

export function WelcomeStep() {
  const { updateData, nextStep, data } = useOnboarding()

  const handleContinue = () => {
    updateData({ agreedToTerms: true })
    nextStep()
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        <CardTitle className="text-3xl font-bold">Welcome to Your Cosmic Journey</CardTitle>
        <CardDescription className="text-lg mt-2">
          Discover the wisdom of the stars and numbers that shape your destiny
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
              <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold">Birth Chart Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Detailed interpretation of your planetary positions
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
              <Moon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-semibold">Daily Insights</h3>
            <p className="text-sm text-muted-foreground">
              Personalized guidance based on cosmic cycles
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900">
              <Sparkles className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="font-semibold">Numerology Profile</h3>
            <p className="text-sm text-muted-foreground">
              Discover your life path and soul numbers
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>What we'll need:</strong> Your birth date, time, and location to calculate your unique cosmic blueprint. 
            This information will be kept secure and private.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleContinue} className="w-full" size="lg">
          Begin Your Journey
        </Button>
      </CardFooter>
    </Card>
  )
}