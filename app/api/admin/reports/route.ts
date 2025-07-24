import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        type: true,
        createdAt: true,
        content: true,
        isPaid: true,
      },
    });

    // Extract email from content field
    const reportsWithEmail = reports.map((report) => {
      const content = report.content as any;
      return {
        id: report.id,
        email: content?.email || content?.quizData?.email || "No email",
        type: report.type,
        createdAt: report.createdAt,
        isPaid: report.isPaid,
      };
    });

    return NextResponse.json(reportsWithEmail);
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}