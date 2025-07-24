# CosmicInsights - Numerology & Astrology Platform

A modern web application that provides personalized numerology and astrology insights with AI-powered analysis.

## Features

- 🔮 **Comprehensive Numerology Calculations**: Life Path, Expression, Soul Urge, and more
- 🌟 **Detailed Personality Analysis**: In-depth insights into personality traits and life guidance
- 💑 **Compatibility Analysis**: Discover relationship dynamics between individuals
- 📊 **Beautiful Visualizations**: Interactive charts and compatibility wheels
- 🎯 **AI-Powered Insights**: Personalized recommendations using OpenAI
- 💰 **Premium Reports**: Stripe integration for paid comprehensive reports
- 🔐 **Admin Panel**: Manage and view all generated reports

## Technology Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Authentication**: NextAuth.js with Prisma adapter
- **Payments**: Stripe
- **Styling**: Tailwind CSS with shadcn/ui components
- **Data Visualization**: Recharts
- **Animations**: Framer Motion

## Local Development Setup

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or cloud)
- Stripe account (for payment processing)
- SendGrid account (for email notifications)
- OpenAI API key (for AI-powered insights)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd CosmicInsights
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your credentials:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/cosmicinsights"
   
   # NextAuth (required even though auth is simplified)
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Stripe
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   
   # Email
   SENDGRID_API_KEY="SG...."
   
   # AI
   OPENAI_API_KEY="sk-..."
   ```

4. **Set up the database**
   ```bash
   # Push the schema to your database
   npm run db:push
   
   # Seed with sample data (optional)
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application.

### Stripe Webhook Setup (for local development)

To test Stripe webhooks locally, use the Stripe CLI:

```bash
# Install Stripe CLI (if not already installed)
# macOS: brew install stripe/stripe-cli/stripe
# Windows: scoop install stripe
# Linux: See https://stripe.com/docs/stripe-cli

# Login to Stripe
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret and add to .env.local
```

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
/app                 # Next.js App Router pages and API routes
  /admin            # Admin panel for report management
  /api              # API routes
  /reports          # Report viewing pages
/components         # React components
  /quiz            # Numerology quiz components
  /reports         # Report visualization components
  /ui              # UI components (shadcn/ui)
/lib               # Utilities and business logic
  /numerology      # Numerology calculations
/prisma            # Database schema and migrations
/public            # Static assets
/types             # TypeScript type definitions
```

## Key Pages

- **`/`** - Homepage with numerology quiz
- **`/test-report`** - Generate a test report without payment
- **`/reports/[id]`** - View generated reports
- **`/admin`** - Admin panel for managing all reports
- **`/checkout`** - Stripe checkout for premium reports

## Usage Flow

1. **Take the Quiz**: Users complete a 15-question personality assessment
2. **Enter Birth Data**: Name and birth date for numerology calculations
3. **View Free Report**: Basic numerology insights are shown
4. **Upgrade Option**: Users can purchase comprehensive reports via Stripe
5. **Admin Access**: View all reports at `/admin` (protected by basic auth)

## Deployment

The app is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add all environment variables from `.env.example`
4. Deploy

For other platforms:
- Ensure Node.js 18+ is available
- Set up PostgreSQL database
- Configure environment variables
- Run `npm run build` and `npm start`

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check `DATABASE_URL` format: `postgresql://user:password@host:port/database`
- For SSL connections, add `?sslmode=require` to the URL

### Stripe Webhooks Not Working
- Ensure webhook endpoint is accessible
- Check webhook signing secret matches
- Use Stripe CLI for local testing

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run typecheck`

## License

Private and proprietary