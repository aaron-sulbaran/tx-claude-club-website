"use client";

import { useEffect, useState } from "react";
import { fetchCalendarEvents, type CalendarEvent } from "../../lib/calendar";

export type NextMeetingState =
  | { status: "loading" }
  | { status: "found"; event: CalendarEvent }
  | { status: "none" };

// The next event on the club calendar that has not ended yet. Any failure
// (missing config, blocked referrer) collapses to "none" so the page shows a
// plain pointer to Instagram instead of an API error.
export function useNextMeeting(): NextMeetingState {
  const [state, setState] = useState<NextMeetingState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    fetchCalendarEvents().then(({ events, error }) => {
      if (cancelled) return;
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      const upcoming = error ? undefined : events.find((event) => event.date >= startOfToday);
      setState(upcoming ? { status: "found", event: upcoming } : { status: "none" });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function formatMeetingDate(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}
