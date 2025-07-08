import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
// Using string literal instead of enum until Prisma client is regenerated

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
  
  // Optional email for anonymous users
  email: z.string().email().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = quizDataSchema.parse(body);

    // Handle email submission for one-time purchase
    if (validatedData.email) {
      // Store email and quiz data for one-time purchase
      // No user account creation needed
      
      // Create report without user account
      const report = await prisma.report.create({
        data: {
          userId: null, // No user account needed
          type: "NUMEROLOGY_PROFILE",
          title: `Cosmic Insights for ${validatedData.firstName}`,
          content: {
            // Store email for purchase tracking
            email: validatedData.email,
            quizData: validatedData,
            numerology: {
              lifePathNumber: validatedData.lifePathNumber,
              birthDayNumber: validatedData.birthDayNumber,
              expressionNumber: validatedData.expressionNumber,
            },
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
            reportVersion: "1.0",
            generatedAt: new Date(),
            accessLevel: "preview", // Preview until purchase
          },
          summary: `Life Path ${validatedData.lifePathNumber} - Discover your cosmic potential`,
          isPaid: false,
        },
      });
      
      const response = NextResponse.json({ 
        success: true,
        reportId: report.id,
        redirectUrl: `/reports/${report.id}?new=true`,
        temporaryData: {
          quizCompleted: true,
          lifePathNumber: validatedData.lifePathNumber,
          firstName: validatedData.firstName,
          email: validatedData.email,
        },
        requiresPurchase: true, // Changed from requiresUpgrade
      });

      // Store minimal quiz data in a secure HTTP-only cookie
      response.cookies.set({
        name: "quiz_data",
        value: JSON.stringify({
          completed: true,
          reportId: report.id,
          lifePathNumber: validatedData.lifePathNumber,
          firstName: validatedData.firstName,
          email: validatedData.email,
          timestamp: new Date().toISOString(),
        }),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    } else {
      // No email provided - return error
      return NextResponse.json(
        { error: "Email is required to receive your report" },
        { status: 400 }
      );
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