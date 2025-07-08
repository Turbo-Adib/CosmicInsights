# Admin Access Documentation

## Overview

The admin access system allows designated administrators to view premium content on any report without payment. This is useful for testing, customer support, and quality assurance.

## Setup

### 1. Configure Admin Emails

Add admin email addresses to your `.env.local` file:

```bash
ADMIN_EMAILS="admin@example.com,support@example.com,your-email@example.com"
```

Multiple emails should be comma-separated with no spaces.

### 2. How It Works

When a user with an admin email views any report:
- They automatically receive `premium` access level
- All locked content is unlocked
- An admin notice appears at the top of the report
- The notice shows what the normal access level would be

## Features

### Admin Override
- Server-side authentication check in `/api/reports/[id]/route.ts`
- Compares session email against `ADMIN_EMAILS` environment variable
- Grants premium access regardless of payment status

### Visual Indicators
- Purple admin notice banner at top of report
- Shows "Admin Mode" with explanation
- Displays actual access level for transparency

### Security
- Admin check happens server-side only
- No client-side admin flags
- Based on authenticated session email
- No database modifications required

## Usage

1. Sign in with an admin email address
2. Navigate to any report URL
3. View full premium content with admin notice

Example admin notice:
> **Admin Mode:** Admin access - viewing premium content. Normal access level would be: teaser

## Testing Different Access Levels

To test how reports appear at different access levels:
1. View with admin account (premium access)
2. Sign out and view anonymously (teaser access)
3. Sign in with non-admin account (free access)
4. Purchase report to test paid access flow

## Troubleshooting

### Admin access not working
- Verify email is in `ADMIN_EMAILS` environment variable
- Check email matches exactly (case-sensitive)
- Ensure you're signed in with the correct account
- Restart development server after changing `.env.local`

### No admin notice appearing
- Confirm you're viewing a report page (`/reports/[id]`)
- Check browser console for API errors
- Verify session is authenticated

## Code References

- Admin check: `/app/api/reports/[id]/route.ts:70-71`
- Admin notice UI: `/app/reports/[id]/report-client.tsx:87-94`
- Environment config: `.env.example:40-41`