"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationResult {
  place_name: string;
  center: [number, number]; // [longitude, latitude]
  text: string;
  context?: Array<{
    id: string;
    text: string;
  }>;
}

interface LocationSearchProps {
  value: string;
  latitude?: number;
  longitude?: number;
  onLocationSelect: (location: {
    placeName: string;
    latitude: number;
    longitude: number;
    timezone?: string;
  }) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export function LocationSearch({
  value,
  latitude,
  longitude,
  onLocationSelect,
  placeholder = "Enter city, state, country",
  label = "Birth location",
  required = false,
}: LocationSearchProps) {
  const [query, setQuery] = useState(value || "");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchTimeout = useRef<NodeJS.Timeout>();
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search for locations using Mapbox Geocoding API
  const searchLocations = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setResults([]);
      return;
    }

    // Check if Mapbox token is available
    if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
      console.warn("Mapbox API token not configured. Location search disabled.");
      // For demo purposes, return some example locations
      setResults([
        {
          place_name: "New York, New York, United States",
          center: [-74.006, 40.7128] as [number, number],
          text: "New York",
        },
        {
          place_name: "Los Angeles, California, United States",
          center: [-118.2437, 34.0522] as [number, number],
          text: "Los Angeles",
        },
        {
          place_name: "London, England, United Kingdom",
          center: [-0.1276, 51.5074] as [number, number],
          text: "London",
        },
        {
          place_name: "Tokyo, Japan",
          center: [139.6503, 35.6762] as [number, number],
          text: "Tokyo",
        },
        {
          place_name: "Sydney, New South Wales, Australia",
          center: [151.2093, -33.8688] as [number, number],
          text: "Sydney",
        },
      ].filter(location => 
        location.place_name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
      setShowResults(true);
      return;
    }

    setIsLoading(true);
    try {
      // Using Mapbox API
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&types=place,locality,region,country&limit=5`
      );

      if (response.ok) {
        const data = await response.json();
        setResults(data.features || []);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Location search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search
  const handleInputChange = (value: string) => {
    setQuery(value);
    setSelectedIndex(-1);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      searchLocations(value);
    }, 300);
  };

  // Handle location selection
  const selectLocation = (location: LocationResult) => {
    const [lng, lat] = location.center;
    setQuery(location.place_name);
    setShowResults(false);
    
    // Extract country for timezone estimation
    const country = location.context?.find(c => c.id.startsWith('country'))?.text;
    
    onLocationSelect({
      placeName: location.place_name,
      latitude: lat,
      longitude: lng,
      // You would need a proper timezone API for accurate timezone detection
      // This is a placeholder - implement proper timezone detection
      timezone: undefined,
    });
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          selectLocation(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-2">
      {label && <Label htmlFor="location-search">{label}</Label>}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            id="location-search"
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => results.length > 0 && setShowResults(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="pl-9 pr-9"
            required={required}
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
          )}
          {!isLoading && latitude && longitude && (
            <MapPin className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
          )}
        </div>

        {showResults && results.length > 0 && (
          <div
            ref={resultsRef}
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md"
          >
            {results.map((result, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectLocation(result)}
                className={cn(
                  "flex w-full items-start rounded-sm px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                  selectedIndex === index && "bg-accent text-accent-foreground"
                )}
              >
                <MapPin className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                <span className="text-left">{result.place_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      
      {latitude && longitude && (
        <p className="text-xs text-muted-foreground">
          Coordinates: {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
        </p>
      )}
    </div>
  );
}