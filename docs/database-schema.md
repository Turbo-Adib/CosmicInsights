# Database Schema Documentation

## Overview

CosmicInsights uses PostgreSQL as its primary database with Prisma as the ORM. The schema is designed to support a comprehensive astrology and numerology SaaS platform with user authentication, personalized insights, subscription management, and compatibility analysis.

## Core Models

### User & Authentication

#### User
The central model that represents registered users in the system.
- Stores basic user information (email, name, profile image)
- Links to authentication accounts, sessions, and all user-related data
- Supports multiple authentication providers through the Account model

#### Account
Manages OAuth provider connections for users.
- Supports multiple providers (Google, GitHub, etc.)
- Stores provider-specific tokens and metadata

#### Session
Tracks active user sessions for authentication.

### User Profile & Birth Data

#### UserProfile
Stores comprehensive birth data and calculated astrological/numerological values.
- **Birth Data**: Date, time, location with precise coordinates
- **Calculated Values**: Sun/Moon/Rising signs, Life Path number, etc.
- These values are cached to avoid recalculation on every request

Key fields:
- `birthTime`: Optional, stored as HH:MM format
- `birthLatitude/birthLongitude`: Precise coordinates for accurate chart calculations
- `timezone`: Essential for proper time conversions

### Reports & Insights

#### Report
Stores generated reports of various types.
- **Content**: Stored as JSON for flexible report structures
- **Types**: Birth charts, numerology profiles, forecasts, compatibility reports
- **Access Control**: `isPremium` flag for subscription-based content

#### DailyInsight
Daily personalized guidance for users.
- Unique per user per day
- Includes moon phases, planetary transits, personal/universal day numbers
- Content stored as JSON for rich, structured data

### Compatibility

#### Compatibility
Manages compatibility analysis between two users.
- Calculates scores for different aspects (sun, moon, rising, numerology)
- Stores detailed analysis, strengths, challenges, and advice
- Prevents duplicate entries with unique constraint on user pairs

### Subscription & Payments

#### Subscription
Manages user subscriptions and Stripe integration.
- Tracks subscription status, plan, and billing periods
- Stores Stripe-specific IDs for payment processing
- Supports multiple subscription tiers (Free, Premium, Professional, Enterprise)

## Enums

### Gender
- MALE, FEMALE, OTHER, PREFER_NOT_TO_SAY

### ReportType
Defines available report types:
- BIRTH_CHART: Complete astrological birth chart
- NUMEROLOGY_PROFILE: Comprehensive numerology analysis
- MONTHLY_FORECAST: Monthly predictions
- YEARLY_FORECAST: Annual overview
- COMPATIBILITY: Relationship compatibility analysis
- CAREER_GUIDANCE: Career-focused insights
- RELATIONSHIP_GUIDANCE: Love and relationship advice
- HEALTH_WELLNESS: Health and wellness recommendations

### SubscriptionStatus
Tracks subscription states:
- ACTIVE: Currently active subscription
- CANCELED: Canceled but still active until period end
- PAST_DUE: Payment failed but grace period active
- UNPAID: Payment failed, access restricted
- TRIALING: In trial period

### SubscriptionPlan
Available subscription tiers:
- FREE: Basic features, limited reports
- PREMIUM: Full access to personal insights
- PROFESSIONAL: Advanced tools for practitioners
- ENTERPRISE: Custom features, API access

## Indexing Strategy

The schema uses several indexing strategies for optimal performance:
- Unique indexes on email, session tokens, and Stripe IDs
- Composite unique indexes on compatibility pairs and daily insights
- Foreign key indexes for all relationships

## Data Privacy Considerations

- All personal data is linked to the User model for easy GDPR compliance
- Cascade deletes ensure complete data removal when a user is deleted
- Sensitive data (birth information) is stored in a separate UserProfile model
- OAuth tokens are stored securely with appropriate field types

## Migration Strategy

To apply this schema:
1. Ensure PostgreSQL is running and accessible
2. Update the DATABASE_URL in your .env file
3. Run `npx prisma migrate dev` to create the database tables
4. Run `npx prisma generate` to generate the Prisma client