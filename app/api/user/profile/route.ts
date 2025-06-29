import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const profileSchema = z.object({
  birthDate: z.string().transform(str => new Date(str)),
  birthTime: z.string(),
  birthPlace: z.string(),
  birthLatitude: z.number(),
  birthLongitude: z.number(),
  timezone: z.string(),
  fullName: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"]),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = profileSchema.parse(body)

    // Check if profile already exists
    const existingProfile = await prisma.userProfile.findUnique({
      where: { userId: session.user.id }
    })

    if (existingProfile) {
      return NextResponse.json(
        { error: "Profile already exists" },
        { status: 400 }
      )
    }

    // Create the profile
    const profile = await prisma.userProfile.create({
      data: {
        userId: session.user.id,
        ...validatedData,
      }
    })

    // Create initial free subscription
    await prisma.subscription.create({
      data: {
        userId: session.user.id,
        status: "ACTIVE",
        plan: "FREE",
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      }
    })

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Profile creation error:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const profile = await prisma.userProfile.findUnique({
      where: { userId: session.user.id }
    })

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    )
  }
}