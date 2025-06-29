import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const quizDataSchema = z.object({
  // Basic Info
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  currentName: z.string().optional(),
  birthDate: z.string(),
  birthTime: z.string().optional(),
  birthPlace: z.string().optional(),
  birthLatitude: z.number().optional(),
  birthLongitude: z.number().optional(),
  birthTimezone: z.string().optional(),
  
  // Personality Questions
  energySource: z.string().optional(),
  decisionStyle: z.string().optional(),
  lifeApproach: z.string().optional(),
  stressResponse: z.string().optional(),
  relationshipStyle: z.string().optional(),
  careerMotivation: z.string().optional(),
  spiritualBeliefs: z.string().optional(),
  
  // Life Questions
  currentChallenge: z.string().optional(),
  lifePhase: z.string().optional(),
  primaryGoal: z.string().optional(),
  
  // Numerology results
  lifePathNumber: z.number(),
  birthDayNumber: z.number(),
  expressionNumber: z.number().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const validatedData = quizDataSchema.parse(body);

    // If user is authenticated, save to their profile
    if (session?.user?.id) {
      // Check if profile already exists
      const existingProfile = await prisma.userProfile.findUnique({
        where: { userId: session.user.id },
      });

      const profileData = {
        birthDate: new Date(validatedData.birthDate),
        birthTime: validatedData.birthTime || null,
        birthPlace: validatedData.birthPlace || "Unknown",
        birthLatitude: validatedData.birthLatitude || 0,
        birthLongitude: validatedData.birthLongitude || 0,
        timezone: validatedData.birthTimezone || "UTC",
        fullName: `${validatedData.firstName} ${validatedData.middleName ? validatedData.middleName + " " : ""}${validatedData.lastName}`.trim(),
        firstName: validatedData.firstName,
        middleName: validatedData.middleName || null,
        lastName: validatedData.lastName,
        currentName: validatedData.currentName || null,
        lifePathNumber: validatedData.lifePathNumber,
        birthDayNumber: validatedData.birthDayNumber,
      };

      let profile;
      if (existingProfile) {
        // Update existing profile
        profile = await prisma.userProfile.update({
          where: { userId: session.user.id },
          data: profileData,
        });
      } else {
        // Create new profile
        profile = await prisma.userProfile.create({
          data: {
            userId: session.user.id,
            ...profileData,
          },
        });

        // Create initial free subscription if it doesn't exist
        const existingSubscription = await prisma.subscription.findFirst({
          where: { userId: session.user.id },
        });

        if (!existingSubscription) {
          await prisma.subscription.create({
            data: {
              userId: session.user.id,
              status: "ACTIVE",
              plan: "FREE",
              currentPeriodStart: new Date(),
              currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
            },
          });
        }
      }

      // Create a numerology report
      await prisma.report.create({
        data: {
          userId: session.user.id,
          type: "NUMEROLOGY_PROFILE",
          title: "Your Numerology Profile",
          content: {
            quizData: validatedData,
            lifePathNumber: validatedData.lifePathNumber,
            birthDayNumber: validatedData.birthDayNumber,
            expressionNumber: validatedData.expressionNumber,
            personalityProfile: {
              energySource: validatedData.energySource,
              decisionStyle: validatedData.decisionStyle,
              lifeApproach: validatedData.lifeApproach,
              stressResponse: validatedData.stressResponse,
              relationshipStyle: validatedData.relationshipStyle,
              careerMotivation: validatedData.careerMotivation,
              spiritualBeliefs: validatedData.spiritualBeliefs,
            },
            lifeContext: {
              currentChallenge: validatedData.currentChallenge,
              lifePhase: validatedData.lifePhase,
              primaryGoal: validatedData.primaryGoal,
            },
          },
          summary: `Life Path ${validatedData.lifePathNumber} - Your personalized numerology insights`,
        },
      });

      return NextResponse.json({ 
        success: true, 
        profile,
        redirectUrl: "/dashboard",
      });
    } else {
      // For unauthenticated users, store in session/cookie (temporary)
      // In production, you might want to use Redis or similar for temporary storage
      const response = NextResponse.json({ 
        success: true,
        requiresAuth: true,
        redirectUrl: "/auth/signin?callbackUrl=/dashboard",
        temporaryData: {
          quizCompleted: true,
          lifePathNumber: validatedData.lifePathNumber,
          firstName: validatedData.firstName,
        }
      });

      // Store minimal quiz data in a secure HTTP-only cookie
      response.cookies.set({
        name: "quiz_data",
        value: JSON.stringify({
          completed: true,
          lifePathNumber: validatedData.lifePathNumber,
          firstName: validatedData.firstName,
          timestamp: new Date().toISOString(),
        }),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return response;
    }
  } catch (error) {
    console.error("Quiz save error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to save quiz data" },
      { status: 500 }
    );
  }
}