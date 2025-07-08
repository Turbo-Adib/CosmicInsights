import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ReportClient } from "./report-client";
import { Suspense } from "react";

interface ReportPageProps {
  params: {
    id: string;
  };
  searchParams: {
    success?: string;
    canceled?: string;
    new?: string;
  };
}

export const metadata: Metadata = {
  title: "Your Cosmic Insights Report | CosmicInsights",
  description: "View your personalized numerology and astrology report",
};

async function getReport(reportId: string, userId?: string) {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/reports/${reportId}`,
      {
        headers: userId ? {
          'Cookie': `next-auth.session-token=${userId}` // This is simplified, actual implementation would use proper session handling
        } : {},
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching report:', error);
    return null;
  }
}

export default async function ReportPage({ params, searchParams }: ReportPageProps) {
  const session = await getServerSession(authOptions);
  
  // For better UX, we'll let the client component handle data fetching
  // This allows for proper loading states and client-side features
  
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your cosmic insights...</p>
          </div>
        </div>
      }>
        <ReportClient 
          reportId={params.id}
          isAuthenticated={!!session?.user}
        />
      </Suspense>
    </div>
  );
}