"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useOnboarding } from "../onboarding-context"
import { ChevronLeft, ChevronRight, MapPin, Search } from "lucide-react"

export function BirthLocationStep() {
  const { data, updateData, nextStep, prevStep } = useOnboarding()
  const [location, setLocation] = useState(data.birthPlace || "")
  const [searching, setSearching] = useState(false)

  const handleSearch = async () => {
    if (!location) return
    
    setSearching(true)
    // For now, we'll use mock data. In production, this would call a geocoding API
    setTimeout(() => {
      // Mock coordinates for demo
      const mockData = {
        birthPlace: location,
        birthLatitude: 40.7128,
        birthLongitude: -74.0060,
        timezone: "America/New_York"
      }
      updateData(mockData)
      setSearching(false)
    }, 1000)
  }

  const handleContinue = () => {
    if (data.birthLatitude && data.birthLongitude) {
      nextStep()
    }
  }

  const isValid = data.birthLatitude && data.birthLongitude

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Where were you born?</CardTitle>
        <CardDescription>
          Your birth location determines the house placements in your astrological chart
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="birth-location">Birth Location</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="birth-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="City, State/Province, Country"
                className="pl-10"
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={!location || searching}
              variant="secondary"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {data.birthLatitude && data.birthLongitude && (
          <div className="rounded-lg bg-green-50 dark:bg-green-950 p-4">
            <p className="text-sm text-green-900 dark:text-green-100">
              <strong>Location found!</strong> {data.birthPlace}
              <br />
              <span className="text-xs">
                Coordinates: {data.birthLatitude.toFixed(4)}°, {data.birthLongitude.toFixed(4)}°
              </span>
            </p>
          </div>
        )}

        <div className="rounded-lg bg-amber-50 dark:bg-amber-950 p-4">
          <p className="text-sm text-amber-900 dark:text-amber-100">
            <strong>Privacy note:</strong> Your location data is used only for astrological calculations 
            and is never shared with third parties.
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