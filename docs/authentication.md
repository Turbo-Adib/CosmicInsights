# Authentication Documentation

## Overview

CosmicInsights uses NextAuth.js for authentication, supporting multiple sign-in methods:
- Email (magic link)
- Google OAuth
- GitHub OAuth

## Configuration

### Environment Variables

Required environment variables for authentication:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Email Provider (for magic links)
EMAIL_SERVER_HOST=smtp.sendgrid.net
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=apikey
EMAIL_SERVER_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@cosmicinsights.com
```

### Auth Configuration

The authentication is configured in `/lib/auth.ts` with:
- Prisma adapter for database session storage
- Custom pages for sign-in, verify, and error states
- Session callbacks to include user profile status

## Authentication Flow

### 1. Sign Up / Sign In
Users can authenticate via:
- **Email**: Sends a magic link to the user's email
- **OAuth**: Redirects to Google/GitHub for authentication

### 2. Profile Check
After authentication, the middleware checks if the user has completed their profile:
- If no profile exists → Redirect to `/onboarding`
- If profile exists → Allow access to protected routes

### 3. Session Management
- Sessions are stored in the database
- Session duration: 30 days
- Session update frequency: 24 hours

## Protected Routes

The following routes are protected by authentication middleware:
- `/dashboard/*` - User dashboard and insights
- `/profile/*` - User profile management
- `/reports/*` - Generated reports
- `/onboarding/*` - New user onboarding

## API Routes

### Authentication Endpoints
- `GET/POST /api/auth/signin` - Sign in page
- `GET/POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session
- `GET/POST /api/auth/callback/*` - OAuth callbacks

## Usage in Components

### Getting Session Data
```typescript
import { useSession } from "next-auth/react"

function Component() {
  const { data: session, status } = useSession()
  
  if (status === "loading") return <Loading />
  if (status === "unauthenticated") return <SignIn />
  
  return <div>Welcome {session.user.email}</div>
}
```

### Sign In/Out
```typescript
import { signIn, signOut } from "next-auth/react"

// Sign in
await signIn("google") // OAuth
await signIn("email", { email: "user@example.com" }) // Magic link

// Sign out
await signOut()
```

### Server-Side Session
```typescript
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

async function ServerComponent() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/auth/signin")
  }
  
  return <div>Welcome {session.user.email}</div>
}
```

## Security Considerations

1. **NEXTAUTH_SECRET**: Must be a random string (32+ characters)
2. **HTTPS Required**: In production, always use HTTPS
3. **CSRF Protection**: Built-in CSRF protection for all auth endpoints
4. **Database Sessions**: More secure than JWT sessions
5. **Email Verification**: Magic links expire after 24 hours

## Customization

### Custom Sign-In Page
The custom sign-in page at `/app/auth/signin/page.tsx` provides:
- Email magic link sign-in
- OAuth provider buttons
- Responsive design with dark mode support

### Session Callbacks
The session callback in `/lib/auth.ts` adds:
- User ID to session object
- Profile completion status

### Middleware Protection
The middleware in `/middleware.ts`:
- Protects specified routes
- Redirects to onboarding if profile incomplete
- Handles authentication state