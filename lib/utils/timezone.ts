// Timezone utility functions

interface TimezoneInfo {
  timezone: string;
  offset: string;
  abbreviation: string;
}

// Get timezone from coordinates using timezone API
export async function getTimezoneFromCoordinates(
  latitude: number,
  longitude: number,
  timestamp?: number
): Promise<TimezoneInfo | null> {
  try {
    // Using TimeZoneDB API (free tier available)
    const apiKey = process.env.TIMEZONE_API_KEY;
    if (!apiKey) {
      console.warn('TIMEZONE_API_KEY not set, using browser timezone');
      return null;
    }

    const time = timestamp || Math.floor(Date.now() / 1000);
    const response = await fetch(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}&time=${time}`
    );

    if (response.ok) {
      const data = await response.json();
      if (data.status === 'OK') {
        return {
          timezone: data.zoneName,
          offset: data.formatted,
          abbreviation: data.abbreviation,
        };
      }
    }
  } catch (error) {
    console.error('Timezone API error:', error);
  }

  return null;
}

// Get timezone for a specific date (important for historical birth dates)
export function getHistoricalTimezone(
  timezone: string,
  date: Date
): { offset: number; isDST: boolean } {
  // This is a simplified version - in production, you'd use a library like moment-timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const offset = date.getTimezoneOffset();
  
  // Rough DST detection (this is simplified)
  const month = date.getMonth();
  const isDST = month >= 3 && month <= 9; // Very rough approximation

  return { offset, isDST };
}

// Common timezones for manual selection
export const COMMON_TIMEZONES = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'America/New_York', label: 'Eastern Time (US & Canada)' },
  { value: 'America/Chicago', label: 'Central Time (US & Canada)' },
  { value: 'America/Denver', label: 'Mountain Time (US & Canada)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)' },
  { value: 'America/Phoenix', label: 'Arizona' },
  { value: 'America/Anchorage', label: 'Alaska' },
  { value: 'Pacific/Honolulu', label: 'Hawaii' },
  { value: 'Europe/London', label: 'London' },
  { value: 'Europe/Paris', label: 'Paris' },
  { value: 'Europe/Berlin', label: 'Berlin' },
  { value: 'Europe/Moscow', label: 'Moscow' },
  { value: 'Asia/Dubai', label: 'Dubai' },
  { value: 'Asia/Kolkata', label: 'Mumbai' },
  { value: 'Asia/Shanghai', label: 'Shanghai' },
  { value: 'Asia/Tokyo', label: 'Tokyo' },
  { value: 'Australia/Sydney', label: 'Sydney' },
  { value: 'Pacific/Auckland', label: 'Auckland' },
];