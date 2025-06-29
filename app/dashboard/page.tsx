import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect("/auth/signin")
  }

  const profile = await prisma.userProfile.findUnique({
    where: { userId: session.user.id }
  })

  if (!profile) {
    redirect("/onboarding")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to Your Cosmic Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
            <p className="text-muted-foreground">Name: {profile.fullName}</p>
            <p className="text-muted-foreground">Birth Date: {profile.birthDate.toLocaleDateString()}</p>
            <p className="text-muted-foreground">Birth Place: {profile.birthPlace}</p>
          </div>
          <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Today's Insights</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
          <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Your Charts</h2>
            <p className="text-muted-foreground">Birth chart and numerology analysis coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  )
}