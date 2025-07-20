"use client";

import { useState, useEffect } from "react";
import { ComprehensiveReport } from "@/components/reports/comprehensive-report";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Shield } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface ReportClientProps {
  reportId: string;
  initialData?: any;
}

export function ReportClient({ reportId, initialData }: ReportClientProps) {
  const [reportData, setReportData] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  
  // Check for admin access code
  const accessCode = searchParams.get('access');
  const hasAdminAccess = accessCode === 'cosmic2024';

  useEffect(() => {
    if (!initialData) {
      fetchReport();
    }
  }, [reportId]);

  const fetchReport = async () => {
    try {
      const response = await fetch(`/api/reports/${reportId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch report');
      }
      const data = await response.json();
      setReportData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your cosmic insights...</p>
        </div>
      </div>
    );
  }

  if (error || !reportData?.success) {
    return (
      <Alert className="max-w-2xl mx-auto">
        <AlertDescription>
          {error || 'Report not found or you do not have access to view it.'}
        </AlertDescription>
      </Alert>
    );
  }

  const { report, upgrade, admin } = reportData;

  return (
    <>
      {/* Success/Cancel Alerts */}
      {searchParams.get('success') === 'true' && (
        <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-950/20">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            Payment successful! Your premium report is now unlocked.
          </AlertDescription>
        </Alert>
      )}

      {searchParams.get('canceled') === 'true' && (
        <Alert className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
          <XCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            Payment was canceled. Your report is still available with limited access.
          </AlertDescription>
        </Alert>
      )}

      {/* Admin Notice */}
      {(admin?.isAdmin || hasAdminAccess) && (
        <Alert className="mb-6 border-purple-200 bg-purple-50 dark:bg-purple-950/20">
          <Shield className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-purple-800 dark:text-purple-200">
            <strong>Admin Mode:</strong> {hasAdminAccess ? 'Full access granted via access code' : admin.message}. Normal access level would be: {admin?.actualAccessLevel || report.accessLevel}
          </AlertDescription>
        </Alert>
      )}

      {/* Report Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{report.title}</h1>
        <p className="text-muted-foreground">
          Generated on {new Date(report.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Comprehensive Report Component */}
      <ComprehensiveReport
        reportId={reportId}
        reportData={report}
        accessLevel={hasAdminAccess ? 'premium' : report.accessLevel}
      />
    </>
  );
}