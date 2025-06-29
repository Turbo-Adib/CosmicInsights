"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useOnboarding } from "../onboarding-context"
import { ChevronLeft, Loader2, Sparkles } from "lucide-react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

export function PreviewStep() {
  const { data, prevStep } = useOnboarding()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleComplete = async () => {
    setIsSubmitting(true)
    
    try {
      // Submit the profile data
      const response = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          birthDate: data.birthDate,
          birthTime: data.birthTime || "12:00",
          birthPlace: data.birthPlace,
          birthLatitude: data.birthLatitude,
          birthLongitude: data.birthLongitude,
          timezone: data.timezone,
          fullName: data.fullName,
          gender: data.gender,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create profile")
      }

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Error creating profile:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-center text-2xl">Your Cosmic Profile is Ready!</CardTitle>
        <CardDescription className="text-center">
          Review your information before we calculate your unique blueprint
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-muted-foreground">Full Name</span>
            <span className="text-sm font-medium">{data.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-muted-foreground">Birth Date</span>
            <span className="text-sm font-medium">
              {data.birthDate && format(data.birthDate, "MMMM d, yyyy")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-muted-foreground">Birth Time</span>
            <span className="text-sm font-medium">
              {data.birthTimeUnknown ? "Time unknown (using noon)" : data.birthTime}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-muted-foreground">Birth Location</span>
            <span className="text-sm font-medium">{data.birthPlace}</span>
          </div>
        </div>

        <div className="rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4">
          <h4 className="font-semibold mb-2">What happens next?</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>✨ We'll calculate your complete birth chart</li>
            <li>🔢 Generate your numerology profile</li>
            <li>🌙 Create your personalized daily insights</li>
            <li>📊 Build your cosmic dashboard</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleComplete} disabled={isSubmitting} className="min-w-32">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Complete Setup"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}