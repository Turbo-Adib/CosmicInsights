# Onboarding Flow Documentation

## Overview

The onboarding flow is a multi-step wizard that collects essential birth data from new users to calculate their astrological and numerological profiles. The flow is designed to be intuitive, visually appealing, and privacy-focused.

## Technical Architecture

### Components Structure

```
/components/onboarding/
  ├── onboarding-context.tsx    # State management for wizard
  ├── onboarding-wizard.tsx      # Main wizard container
  └── steps/                     # Individual step components
      ├── welcome-step.tsx
      ├── birth-date-step.tsx
      ├── birth-time-step.tsx
      ├── birth-location-step.tsx
      ├── personal-info-step.tsx
      └── preview-step.tsx
```

### State Management

The onboarding flow uses React Context (`OnboardingContext`) to manage:
- Current step navigation
- Form data persistence
- Step validation
- Progress tracking

## User Flow

### Step 1: Welcome
- Introduces the platform's value proposition
- Shows what data will be collected
- Requires agreement to proceed

### Step 2: Birth Date
- Calendar date picker with constraints (1900-present)
- Shows fun fact based on selected date
- Required field

### Step 3: Birth Time
- Time input with 24-hour format
- Option to indicate "time unknown"
- Explains importance of accurate birth time

### Step 4: Birth Location
- Text input with search functionality
- Currently uses mock data (to be integrated with geocoding API)
- Shows coordinates when location is found
- Privacy notice about location data

### Step 5: Personal Information
- Full name input (for numerology calculations)
- Gender selection
- Explains how name is used in calculations

### Step 6: Preview & Submit
- Shows summary of all collected data
- Explains what happens next
- Creates user profile on submission
- Redirects to dashboard

## API Integration

### Profile Creation Endpoint
`POST /api/user/profile`

Creates a new user profile with:
- Birth data (date, time, location)
- Personal information
- Calculated coordinates and timezone
- Initial free subscription

## Data Validation

Each step includes validation:
- **Birth Date**: Must be valid date between 1900 and today
- **Birth Time**: Valid HH:MM format or "unknown" flag
- **Location**: Must have valid coordinates
- **Name**: Non-empty string
- **Gender**: One of predefined options

## Security & Privacy

- All data is transmitted over HTTPS
- Location data is used only for calculations
- Personal data is linked to authenticated user
- No third-party sharing of personal information

## Planned Enhancements

1. **Location Search Integration**
   - Integrate Google Places or Mapbox API
   - Auto-complete suggestions
   - Timezone detection

2. **Real-time Calculations**
   - Show preliminary insights during onboarding
   - Calculate sun sign immediately after date selection

3. **Progress Persistence**
   - Save incomplete onboarding data
   - Allow users to resume later

4. **Enhanced Validation**
   - Birth certificate name validation
   - Location verification
   - Time zone confirmation

## Error Handling

- Network errors show retry options
- Validation errors display inline
- API errors handled gracefully
- Fallback for failed location search

## Accessibility

- Keyboard navigation support
- Screen reader friendly labels
- High contrast mode support
- Mobile responsive design

## Performance Considerations

- Lazy loading of step components
- Debounced location search
- Optimistic UI updates
- Progress saved to localStorage