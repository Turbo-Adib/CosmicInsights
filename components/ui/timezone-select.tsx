"use client";

import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, Clock, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { COMMON_TIMEZONES } from "@/lib/utils/timezone";

interface TimezoneSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  birthDate?: string;
  label?: string;
  placeholder?: string;
  detectFromLocation?: boolean;
  latitude?: number;
  longitude?: number;
}

export function TimezoneSelect({
  value,
  onValueChange,
  birthDate,
  label = "Time zone",
  placeholder = "Select timezone",
  detectFromLocation = false,
  latitude,
  longitude,
}: TimezoneSelectProps) {
  const [open, setOpen] = useState(false);
  const [browserTimezone, setBrowserTimezone] = useState<string>("");

  useEffect(() => {
    // Get browser timezone
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setBrowserTimezone(tz);
  }, []);

  const selectedTimezone = COMMON_TIMEZONES.find(tz => tz.value === value);

  // Auto-detect timezone from location if coordinates are provided
  useEffect(() => {
    if (detectFromLocation && latitude && longitude && !value) {
      // In a real implementation, you would call the timezone API here
      // For now, we'll just use the browser timezone as a fallback
      onValueChange(browserTimezone);
    }
  }, [detectFromLocation, latitude, longitude, browserTimezone, value, onValueChange]);

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              {value ? selectedTimezone?.label || value : placeholder}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search timezone..." />
            <CommandEmpty>No timezone found.</CommandEmpty>
            <CommandGroup>
              {browserTimezone && (
                <>
                  <CommandItem
                    key="browser"
                    value={browserTimezone}
                    onSelect={() => {
                      onValueChange(browserTimezone);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === browserTimezone ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <Globe className="mr-2 h-4 w-4" />
                    Current timezone ({browserTimezone})
                  </CommandItem>
                  <hr className="my-1" />
                </>
              )}
              {COMMON_TIMEZONES.map((timezone) => (
                <CommandItem
                  key={timezone.value}
                  value={timezone.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === timezone.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {timezone.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {birthDate && value && (
        <p className="text-xs text-muted-foreground">
          This timezone will be used to calculate your exact birth chart
        </p>
      )}
    </div>
  );
}