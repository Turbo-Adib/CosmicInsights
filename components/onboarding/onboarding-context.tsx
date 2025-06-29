"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface OnboardingData {
  // Step 1: Welcome
  agreedToTerms?: boolean
  
  // Step 2: Birth Date
  birthDate?: Date
  
  // Step 3: Birth Time
  birthTime?: string // HH:MM format
  birthTimeUnknown?: boolean
  
  // Step 4: Birth Location
  birthPlace?: string
  birthLatitude?: number
  birthLongitude?: number
  timezone?: string
  
  // Step 5: Personal Info
  fullName?: string
  gender?: "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY"
  
  // Step 6: Preview
  calculatedData?: {
    sunSign?: string
    moonSign?: string
    risingSign?: string
    lifePathNumber?: number
  }
}

interface OnboardingContextType {
  data: OnboardingData
  currentStep: number
  totalSteps: number
  updateData: (updates: Partial<OnboardingData>) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  isStepComplete: (step: number) => boolean
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>({})
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 6

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step)
    }
  }

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!data.agreedToTerms
      case 2:
        return !!data.birthDate
      case 3:
        return !!data.birthTime || !!data.birthTimeUnknown
      case 4:
        return !!data.birthPlace && !!data.birthLatitude && !!data.birthLongitude
      case 5:
        return !!data.fullName && !!data.gender
      case 6:
        return true // Preview step is always accessible
      default:
        return false
    }
  }

  return (
    <OnboardingContext.Provider
      value={{
        data,
        currentStep,
        totalSteps,
        updateData,
        nextStep,
        prevStep,
        goToStep,
        isStepComplete,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider")
  }
  return context
}