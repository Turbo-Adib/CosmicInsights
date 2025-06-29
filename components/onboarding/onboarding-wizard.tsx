"use client"

import { Progress } from "@/components/ui/progress"
import { useOnboarding } from "./onboarding-context"
import { WelcomeStep } from "./steps/welcome-step"
import { BirthDateStep } from "./steps/birth-date-step"
import { BirthTimeStep } from "./steps/birth-time-step"
import { BirthLocationStep } from "./steps/birth-location-step"
import { PersonalInfoStep } from "./steps/personal-info-step"
import { PreviewStep } from "./steps/preview-step"
import { motion, AnimatePresence } from "framer-motion"

export function OnboardingWizard() {
  const { currentStep, totalSteps } = useOnboarding()

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep />
      case 2:
        return <BirthDateStep />
      case 3:
        return <BirthTimeStep />
      case 4:
        return <BirthLocationStep />
      case 5:
        return <PersonalInfoStep />
      case 6:
        return <PreviewStep />
      default:
        return null
    }
  }

  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Step {currentStep} of {totalSteps}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-500">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}