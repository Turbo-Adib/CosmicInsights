# Report Flow Test Plan

## Current Implementation Status

The comprehensive report upsell system is fully implemented with these components:

### 1. **Quiz Flow**
- Quiz completion → Email capture → Save report → Redirect to `/reports/[id]?new=true`

### 2. **Report API** (`/api/reports/[id]`)
- Determines access level: `teaser`, `free`, `basic`, or `premium`
- Filters content based on access level
- Returns locked sections with teasers

### 3. **Report Page** (`/app/reports/[id]/page.tsx`)
- Server-side renders the report
- Uses `ComprehensiveReport` component
- Passes access level and report data

### 4. **ComprehensiveReport Component**
Features implemented:
- ✅ Progress tracking (scroll depth)
- ✅ Smart upsell timing (30s or 50% scroll)
- ✅ Blur effects on locked content
- ✅ Social sharing to unlock sections
- ✅ Limited time offers with countdown
- ✅ Testimonials and social proof
- ✅ Multiple pricing tiers ($19/$49)
- ✅ Animated upsell modal

## Testing Steps

1. **Run the development server**
   ```bash
   npm run dev
   ```

2. **Test as anonymous user**
   - Go to homepage
   - Click "Calculate Your Numbers Free"
   - Complete the quiz
   - Enter email when prompted
   - Verify redirect to report page
   - Check that teaser content is shown
   - Verify upsell modal appears after 30 seconds

3. **Test locked content**
   - Hover over locked sections
   - Click to trigger upsell modal
   - Share on social media to unlock one section
   - Verify countdown timer works

4. **Test pricing flow**
   - Click upgrade button
   - Select a pricing tier
   - Verify redirect to checkout

## Common Issues & Solutions

### Issue: Report not showing upsells
**Solution**: Check browser console for errors. The API might be returning wrong access level.

### Issue: No blur effects or animations
**Solution**: Ensure Framer Motion is installed: `npm install framer-motion`

### Issue: Social sharing not working
**Solution**: Social sharing requires the page to be publicly accessible. Test with ngrok or deploy to staging.

## Environment Variables Needed

```env
DATABASE_URL=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Stripe Setup

1. Create products in Stripe Dashboard:
   - Basic Report: $19
   - Premium Report: $49

2. Get price IDs and update `/app/api/stripe/checkout/route.ts`

3. Set up webhook endpoint for payment confirmation