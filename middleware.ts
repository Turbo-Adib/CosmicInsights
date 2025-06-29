import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Allow access to onboarding if user doesn't have a profile
    if (req.nextUrl.pathname.startsWith("/onboarding")) {
      return NextResponse.next()
    }

    // Redirect to onboarding if user doesn't have a profile
    const token = req.nextauth.token
    const hasProfile = token?.hasProfile as boolean

    if (!hasProfile && !req.nextUrl.pathname.startsWith("/onboarding")) {
      return NextResponse.redirect(new URL("/onboarding", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/reports/:path*",
    "/onboarding/:path*",
  ],
}