import { OnboardingProvider } from "@/components/onboarding/onboarding-context"
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard"

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardingWizard />
    </OnboardingProvider>
  )
}