# CosmicInsights

A personalized numerology and astrology SaaS platform that transforms ancient wisdom into actionable guidance for modern life decisions using AI-powered insights.

## Features

- **Personalized Numerology Quiz**: 16personalities-style quiz with one-click answers and comprehensive analysis
- **Birth Chart Calculations**: Life Path, Expression Number, Day Number, and Personal Year cycles
- **AI-Powered Insights**: Personalized recommendations based on numerological profiles
- **User Authentication**: Secure login with NextAuth.js (email magic links + OAuth)
- **Subscription Management**: Freemium model with Stripe integration
- **Responsive Design**: Modern UI with Tailwind CSS and shadcn/ui components

## Technology Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Authentication**: NextAuth.js with Prisma adapter
- **Payments**: Stripe
- **Styling**: Tailwind CSS with shadcn/ui components
- **Data Visualization**: Recharts
- **Animations**: Framer Motion

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CosmicInsights
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in the required environment variables in `.env`

4. **Set up the database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

Required environment variables (see `.env.example`):

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Application URL
- `NEXTAUTH_SECRET`: NextAuth encryption secret
- OAuth providers (optional): Google, GitHub credentials
- `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`: Stripe API keys
- `SENDGRID_API_KEY`: SendGrid email service
- `OPENAI_API_KEY`: For AI-powered insights

## Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Code Quality
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

### Database
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and apply migrations
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio

## Project Structure

```
/app              # Next.js App Router pages and API routes
/components       # Reusable React components
  /quiz           # Quiz-specific components
  /ui             # shadcn/ui components
/lib              # Utility functions and shared logic
  /numerology     # Numerology calculation engine
  /utils          # Helper functions
/hooks            # Custom React hooks
/types            # TypeScript type definitions
/prisma           # Database schema and migrations
/docs             # Project documentation
/pigbank-knowledge # Numerology knowledge base
```

## Key Features Implementation

### Numerology Quiz
- 15-question personality assessment
- One-click answers with auto-advance
- Birth data collection (date, time, location)
- Real-time progress tracking

### Analysis Engine
- Life Path Number calculation with master numbers (11, 22, 33)
- Day Number and Expression Number analysis
- Personal Year cycles and compatibility charts
- Detailed interpretations based on ancient numerology wisdom

### User Dashboard
- Comprehensive numerology report with 4 tabs:
  - Core Numbers & Meanings
  - Current Life Cycles
  - Personality Insights
  - Compatibility Analysis
- Cosmic Alignment Score
- Personalized action plans

## Database Schema

The application uses PostgreSQL with Prisma ORM. Key models:

- **User**: Authentication and basic user data
- **UserProfile**: Birth data and calculated numerology values
- **Report**: Generated astrology/numerology reports
- **DailyInsight**: Personalized daily guidance
- **Subscription**: Payment and plan management

See `/docs/database-schema.md` for detailed documentation.

## Authentication

Built with NextAuth.js supporting:
- Email magic links
- Google OAuth
- GitHub OAuth
- Protected routes with middleware
- Session management with database storage

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.