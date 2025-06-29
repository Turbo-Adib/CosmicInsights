"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useOnboarding } from "../onboarding-context"
import { format } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function BirthDateStep() {
  const { data, updateData, nextStep, prevStep } = useOnboarding()
  const [date, setDate] = useState<Date | undefined>(data.birthDate)

  const handleContinue = () => {
    if (date) {
      updateData({ birthDate: date })
      nextStep()
    }
  }

  const maxDate = new Date()
  const minDate = new Date(1900, 0, 1)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>When were you born?</CardTitle>
        <CardDescription>
          Your birth date is the foundation of your astrological and numerological profile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full max-w-sm justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select your birth date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) =>
                  date > maxDate || date < minDate
                }
                initialFocus
                fromYear={1900}
                toYear={new Date().getFullYear()}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
        </div>

        {date && (
          <div className="rounded-lg bg-purple-50 dark:bg-purple-950 p-4 text-center">
            <p className="text-sm text-purple-900 dark:text-purple-100">
              <strong>Fun fact:</strong> Being born on {format(date, "MMMM d")} makes you a natural{" "}
              {date.getMonth() < 3 || (date.getMonth() === 3 && date.getDate() <= 19)
                ? "innovator"
                : date.getMonth() < 6 || (date.getMonth() === 6 && date.getDate() <= 20)
                ? "communicator"
                : date.getMonth() < 9 || (date.getMonth() === 9 && date.getDate() <= 22)
                ? "nurturer"
                : "transformer"}!
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleContinue} disabled={!date}>
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}