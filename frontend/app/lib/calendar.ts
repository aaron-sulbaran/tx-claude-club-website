// ============================================================
// Google Calendar API Integration
// Fetches events; parsing lives in event-parser.ts.
// ============================================================

import { parseGoogleEvent, type CalendarEvent, type GoogleCalendarEvent } from "./event-parser.ts";

export type { CalendarEvent, EventType } from "./event-parser.ts";

interface GoogleCalendarResponse {
  items: GoogleCalendarEvent[];
  error?: {
    code: number;
    message: string;
  };
}

// ------------------------------------------------------------
// Fake event for local testing. It is added only under `next dev`
// (NODE_ENV is "development"), whatever host or IP the page is opened
// from, and never in a production build. Its description is HTML, the
// way Google Calendar stores it, and long enough to collapse.
// ------------------------------------------------------------

function mockEvents(): CalendarEvent[] {
  const start = new Date();
  start.setDate(start.getDate() + 3);
  start.setHours(18, 0, 0, 0);
  const end = new Date(start);
  end.setHours(20);

  return [
    parseGoogleEvent({
      id: "dev-mock-event",
      summary: "[FAKE] Test Event (dev only)",
      location: "Nowhere, this event is not real",
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
      colorId: "5",
      description:
        "<p><b>This is a fake event for testing.</b> It only appears on the local dev server and is not on the club calendar.</p>" +
        "<p>The description is HTML, like Google Calendar sends it: paragraphs, line breaks,<br>entities like &amp; and &quot;quotes&quot;, and a <a href=\"https://example.com\">link</a>.</p>" +
        "<ul><li>First bullet</li><li>Second bullet</li><li>Third bullet</li></ul>" +
        "<p>This paragraph is filler so the description runs long enough to collapse. " +
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>" +
        "<p>Last paragraph. If you can read this, Show more works.</p>",
    }),
  ];
}

export async function fetchCalendarEvents(): Promise<{
  events: CalendarEvent[];
  error: string | null;
}> {
  const result = await fetchGoogleEvents();
  if (process.env.NODE_ENV !== "development") return result;
  // In dev the mock shows even when the calendar can't load (e.g. no API key).
  if (result.error) console.warn("[calendar] Showing only the dev mock event:", result.error);
  const events = [...result.events, ...mockEvents()].sort((a, b) => a.date.getTime() - b.date.getTime());
  return { events, error: null };
}

async function fetchGoogleEvents(): Promise<{
  events: CalendarEvent[];
  error: string | null;
}> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;
  const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID;

  if (!apiKey || !calendarId) {
    console.error("Missing Google Calendar API key or Calendar ID");
    return {
      events: [],
      error: "Calendar configuration missing. Please check environment variables.",
    };
  }

  // Fetch events from now onwards (or past month for testing)
  // From the start of the school year (August 1), so the Past tab on the
  // events page covers the whole year.
  const now = new Date();
  const schoolYearStart = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
  const timeMin = new Date(schoolYearStart, 7, 1);

  const timeMax = new Date();
  timeMax.setMonth(timeMax.getMonth() + 6); // Show events up to 6 months ahead

  const params = new URLSearchParams({
    key: apiKey,
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "100",
  });

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google Calendar API error:", errorData);
      return {
        events: [],
        error: `API Error: ${errorData.error?.message || response.statusText}`,
      };
    }

    const data: GoogleCalendarResponse = await response.json();

    if (data.error) {
      return {
        events: [],
        error: data.error.message,
      };
    }

    const events = (data.items || []).map(parseGoogleEvent);

    return { events, error: null };
  } catch (err) {
    console.error("Failed to fetch calendar events:", err);
    return {
      events: [],
      error: "Failed to connect to Google Calendar. Please try again later.",
    };
  }
}
