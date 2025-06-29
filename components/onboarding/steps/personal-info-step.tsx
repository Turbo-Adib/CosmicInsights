"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useOnboarding } from "../onboarding-context"
import { ChevronLeft, ChevronRight, User } from "lucide-react"

export function PersonalInfoStep() {
  const { data, updateData, nextStep, prevStep } = useOnboarding()
  const [fullName, setFullName] = useState(data.fullName || "")
  const [gender, setGender] = useState(data.gender || "")

  const handleContinue = () => {
    updateData({ 
      fullName,
      gender: gender as any
    })
    nextStep()
  }

  const isValid = fullName.trim().length > 0 && gender

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tell us about yourself</CardTitle>
        <CardDescription>
          Your name is used for numerological calculations, revealing your soul's purpose and personality
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full-name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="full-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="pl-10"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Use the name on your birth certificate for most accurate numerology
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
              <SelectItem value="PREFER_NOT_TO_SAY">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg bg-purple-50 dark:bg-purple-950 p-4">
          <p className="text-sm text-purple-900 dark:text-purple-100">
            <strong>Did you know?</strong> Each letter in your name has a numerical value that reveals 
            different aspects of your personality, from your deepest desires to how others perceive you.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleContinue} disabled={!isValid}>
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}