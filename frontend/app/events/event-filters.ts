// Pure helpers for the events archive. Kept free of React and of the calendar
// fetch so they run under `node --test` (see event-filters.test.ts).

import type { CalendarEvent } from "../lib/calendar.ts";

export type EventsTab = "upcoming" | "past" | "all";

export const EVENTS_TABS: { id: EventsTab; label: string }[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
  { id: "all", label: "All" },
];

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** An event counts as upcoming for its whole day, so tonight's meeting stays listed. */
export function isUpcoming(event: CalendarEvent, now: Date): boolean {
  return event.date >= startOfDay(now);
}

/**
 * Upcoming events soonest first; past events most recent first; "all" puts
 * upcoming first, then past, so the list always starts with what's next.
 */
export function eventsForTab(events: CalendarEvent[], tab: EventsTab, now: Date): CalendarEvent[] {
  const upcoming = events
    .filter((event) => isUpcoming(event, now))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  const past = events
    .filter((event) => !isUpcoming(event, now))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  if (tab === "upcoming") return upcoming;
  if (tab === "past") return past;
  return [...upcoming, ...past];
}

export function countLabel(count: number, tab: EventsTab): string {
  const noun = count === 1 ? "event" : "events";
  if (tab === "all") return `${count} ${noun}`;
  return `${count} ${tab} ${noun}`;
}

export function addToCalendarUrl(event: CalendarEvent): string {
  const toStamp = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, "");
  const end = new Date(event.date);
  end.setHours(end.getHours() + 2);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toStamp(event.date)}/${toStamp(end)}`,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}
