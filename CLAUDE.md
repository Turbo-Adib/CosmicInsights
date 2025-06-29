# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CosmicInsights is a personalized numerology and astrology SaaS platform built with Next.js 14+, TypeScript, PostgreSQL, and Prisma. The platform transforms ancient wisdom into actionable guidance for modern life decisions using AI-powered insights.

## Technology Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Authentication**: NextAuth.js with Prisma adapter
- **Payments**: Stripe
- **Email**: SendGrid
- **Styling**: Tailwind CSS with shadcn/ui components
- **Data Visualization**: Recharts
- **Animations**: Framer Motion

## Development Commands

### Running the Application
```bash
npm run dev        # Start development server on http://localhost:3000
npm run build      # Build for production
npm run start      # Start production server
```

### Code Quality
```bash
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
```

### Database Management
```bash
npm run db:push    # Push schema changes to database (development)
npm run db:migrate # Create and apply migrations
npm run db:seed    # Seed database with initial data
npm run db:studio  # Open Prisma Studio for database management
```

## Project Architecture

### Directory Structure
```
/app              # Next.js App Router pages and API routes
/components       # Reusable React components
/lib              # Utility functions and shared logic
  /utils          # Helper functions
/hooks            # Custom React hooks
/types            # TypeScript type definitions
/prisma           # Database schema and migrations
  schema.prisma   # Prisma schema definition
  seed.ts         # Database seeding script
/docs             # Project documentation
/public           # Static assets
```

### Key Features (In Development)
1. **User Authentication**: Email/OAuth login with NextAuth.js
2. **Birth Data Collection**: Comprehensive onboarding flow
3. **Astrological Calculations**: Birth charts, planetary positions
4. **Numerology Calculations**: Life path, expression numbers, etc.
5. **Personalized Dashboard**: Daily insights and reports
6. **Subscription Management**: Freemium model with Stripe
7. **AI-Powered Insights**: Personalized recommendations

### Database Schema
The database uses PostgreSQL with Prisma ORM. Key models include:
- **User**: Authentication and basic user data
- **UserProfile**: Birth data and calculated values
- **Report**: Generated astrology/numerology reports
- **DailyInsight**: Personalized daily guidance
- **Subscription**: Payment and plan management
- **Compatibility**: User compatibility analysis

See `/docs/database-schema.md` for detailed documentation.

## Environment Variables

Required environment variables (see `.env.example`):
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Application URL
- `NEXTAUTH_SECRET`: NextAuth encryption secret
- OAuth providers (optional): Google, GitHub credentials
- `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`: Stripe API keys
- `SENDGRID_API_KEY`: SendGrid email service
- `OPENAI_API_KEY`: For AI-powered insights

## Development Workflow

1. **Database Setup**: Ensure PostgreSQL is running, then run `npm run db:push` to create tables
2. **Seed Data**: Run `npm run db:seed` to populate test data
3. **Start Dev Server**: Run `npm run dev` to start the application
4. **Code Quality**: Always run `npm run lint` and `npm run typecheck` before committing

## Current Implementation Status

- ✅ Next.js project setup with TypeScript and Tailwind CSS
- ✅ Database schema designed and documented
- ✅ Prisma ORM configured with seed data
- ✅ NextAuth.js authentication system implemented
  - Email magic links
  - Google & GitHub OAuth
  - Protected routes middleware
  - Custom auth pages
- ✅ User onboarding flow (basic implementation)
  - Multi-step wizard with progress tracking
  - Birth data collection (date, time, location)
  - Personal information form
  - Profile creation API endpoint
  - Basic dashboard page
- 📋 Location search API integration (pending)
- 📋 Core calculations engine (pending)
- 📋 Enhanced dashboard UI (pending)
- 📋 Subscription system (pending)

## Recent Updates

### Onboarding Flow (New)
- Created 6-step onboarding wizard with Framer Motion animations
- Implemented form validation and state management with React Context
- Built responsive UI with shadcn/ui components
- Added profile creation API endpoint
- Created basic dashboard page with profile display

### Authentication System
- Implemented NextAuth.js with Prisma adapter
- Created custom sign-in pages with email and OAuth options
- Added middleware for route protection and profile checks
- Configured session management with database storage
- Added TypeScript types for extended session data