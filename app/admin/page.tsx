"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, Eye } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const adminAuth = sessionStorage.getItem("adminAuth");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
      fetchReports();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, use proper authentication
    if (password === "cosmic2024") {
      sessionStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      fetchReports();
    } else {
      alert("Invalid password");
    }
  };

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/reports");
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container max-w-md mx-auto mt-20 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter password to view all reports</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Access Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button
          variant="outline"
          onClick={() => {
            sessionStorage.removeItem("adminAuth");
            router.push("/");
          }}
        >
          Logout
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
          <CardDescription>
            Total Reports: {reports.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading reports...</p>
          ) : reports.length === 0 ? (
            <p className="text-muted-foreground">No reports found</p>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{report.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarDays className="h-4 w-4" />
                          <span>
                            Created: {new Date(report.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="secondary">
                            {report.type || "Numerology"}
                          </Badge>
                          <Badge variant={report.isPaid ? "default" : "outline"}>
                            {report.isPaid ? "Paid" : "Free"}
                          </Badge>
                          <Badge variant="outline">
                            ID: {report.id.slice(0, 8)}...
                          </Badge>
                        </div>
                      </div>
                      <Link href={`/reports/${report.id}`}>
                        <Button size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                          View Report
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}