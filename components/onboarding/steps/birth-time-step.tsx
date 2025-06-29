"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useOnboarding } from "../onboarding-context"
import { ChevronLeft, ChevronRight, Clock, Info } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function BirthTimeStep() {
  const { data, updateData, nextStep, prevStep } = useOnboarding()
  const [time, setTime] = useState(data.birthTime || "")
  const [timeUnknown, setTimeUnknown] = useState(data.birthTimeUnknown || false)

  const handleContinue = () => {
    if (timeUnknown) {
      updateData({ birthTimeUnknown: true, birthTime: undefined })
    } else if (time) {
      updateData({ birthTime: time, birthTimeUnknown: false })
    }
    nextStep()
  }

  const isValid = timeUnknown || time.length > 0

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>What time were you born?</CardTitle>
        <CardDescription>
          Your birth time helps us calculate your rising sign and house placements for more accurate insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="birth-time" className={timeUnknown ? "text-muted-foreground" : ""}>
              Birth Time
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="birth-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={timeUnknown}
                className="pl-10"
                placeholder="HH:MM"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="time-unknown"
              checked={timeUnknown}
              onCheckedChange={setTimeUnknown}
            />
            <Label htmlFor="time-unknown" className="cursor-pointer">
              I don't know my exact birth time
            </Label>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4">
          <div className="flex gap-2">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900 dark:text-blue-100">
              {timeUnknown ? (
                <p>
                  <strong>No worries!</strong> We'll use noon as your birth time. 
                  Your sun sign and numerology will still be accurate, though some astrological details may vary.
                </p>
              ) : (
                <p>
                  <strong>Tip:</strong> You can find your birth time on your birth certificate, 
                  hospital records, or by asking family members who were present at your birth.
                </p>
              )}
            </div>
          </div>
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