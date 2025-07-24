import { Metadata } from "next";
import { notFound } from "next/navigation";
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

// Removed server-side report fetching - handled by client component

export default async function ReportPage({ params, searchParams }: ReportPageProps) {
  // No authentication needed - reports are accessible via direct link
  
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
        />
      </Suspense>
    </div>
  );
}