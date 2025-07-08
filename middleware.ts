import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simple middleware for public access
export function middleware(request: NextRequest) {
  // All routes are now publicly accessible
  return NextResponse.next()
}

// Empty matcher - no protected routes
export const config = {
  matcher: [],
}