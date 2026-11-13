// ============================================================
// Google Calendar event parsing: turns the API's raw events into the
// site's CalendarEvent (times, type, flagship, plain-text description).
// Fetching lives in calendar.ts.
// ============================================================

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  type: EventType;
  description: string;
  isFlagship: boolean;
}

export type EventType =
  | "meeting"
  | "tabling"
  | "hackathon"
  | "workshop"
  | "demo"
  | "social"
  | "speaker"
  | "other";

// A Google Calendar API event, as returned by the events list endpoint
export interface GoogleCalendarEvent {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  start: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  colorId?: string;
}

// Map Google Calendar color IDs to event types
// Google Calendar colors: https://developers.google.com/calendar/api/v3/reference/colors
const COLOR_TO_TYPE: Record<string, EventType> = {
  "1": "other", // Lavender
  "2": "demo", // Sage (green)
  "3": "hackathon", // Grape → we'll use for hackathons (purple-ish)
  "4": "social", // Flamingo (pink)
  "5": "workshop", // Banana (yellow)
  "6": "hackathon", // Tangerine (orange) - flagship
  "7": "tabling", // Peacock (teal)
  "8": "other", // Graphite
  "9": "workshop", // Blueberry (blue)
  "10": "demo", // Basil (green)
  "11": "hackathon", // Tomato (red/orange)
};

// Keywords in title/description that indicate event type
const TYPE_KEYWORDS: Record<EventType, string[]> = {
  meeting: ["meeting", "gm", "general meeting", "gm#", "general mtg"],
  tabling: ["tabling", "table", "recruitment", "speedway"],
  hackathon: ["hackathon", "hack", "buildathon", "claudehacks"],
  workshop: ["workshop", "tutorial", "hands-on", "learn", "intro to"],
  demo: ["demo", "showcase", "presentation", "show and tell"],
  social: ["social", "hangout", "mixer", "party", "networking"],
  speaker: ["guest speaker", "speaker", "talk", "fireside", "keynote", "guest lecture"],
  other: [],
};

// Keywords that indicate a flagship/featured event
const FLAGSHIP_KEYWORDS = [
  "flagship",
  "featured",
  "main event",
  "hackathon",
  "claudehacks",
  "★",
  "⭐",
];

function detectEventType(event: GoogleCalendarEvent): EventType {
  const title = (event.summary || "").toLowerCase();
  const description = (event.description || "").toLowerCase();
  const combined = `${title} ${description}`;

  // First, check for keyword matches (more reliable than colors)
  for (const [type, keywords] of Object.entries(TYPE_KEYWORDS)) {
    if (keywords.some((keyword) => combined.includes(keyword))) {
      return type as EventType;
    }
  }

  // Fall back to color-based detection
  if (event.colorId && COLOR_TO_TYPE[event.colorId]) {
    return COLOR_TO_TYPE[event.colorId];
  }

  return "other";
}

function detectIsFlagship(event: GoogleCalendarEvent): boolean {
  const title = (event.summary || "").toLowerCase();
  const description = (event.description || "").toLowerCase();
  const combined = `${title} ${description}`;

  return FLAGSHIP_KEYWORDS.some((keyword) => combined.includes(keyword));
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function parseGoogleEvent(raw: GoogleCalendarEvent): CalendarEvent {
  // Descriptions arrive as HTML; match keywords and display against plain text.
  const event = { ...raw, description: htmlToText(raw.description || "") };
  // Keywords are plain substrings, so leave URLs and emails out of detection
  // ("gm" would match every @gmail.com address).
  const forDetection = { ...event, description: event.description.replace(/\S*(?:https?:\/\/|www\.|@)\S*/gi, " ") };
  // Handle all-day events vs timed events
  const startDateTime = event.start.dateTime || event.start.date || "";
  const endDateTime = event.end.dateTime || event.end.date || "";

  const isAllDay = !event.start.dateTime;

  return {
    id: event.id,
    title: event.summary || "Untitled Event",
    date: new Date(startDateTime),
    startTime: isAllDay ? "All Day" : formatTime(startDateTime),
    endTime: isAllDay ? "" : formatTime(endDateTime),
    location: event.location || "TBA",
    type: detectEventType(forDetection),
    description: event.description || "No description provided.",
    isFlagship: detectIsFlagship(forDetection),
  };
}

// ------------------------------------------------------------
// Descriptions. Google Calendar stores them as loose HTML (<p>, <br>,
// <a>, <ul>, entities). The site shows them as plain text with real
// line breaks, so htmlToText turns that markup into text.
// ------------------------------------------------------------

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  bull: "•",
  middot: "·",
  copy: "©",
  reg: "®",
  trade: "™",
};

function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === "#") {
      const point = code[1] === "x" || code[1] === "X" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(point) && point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : match;
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? match;
  });
}

const BLOCK_TAGS = "p|div|h[1-6]|ul|ol|blockquote|pre|table|tr|section|article|header|footer";

// Real tags only: a name followed by a space, "/" or ">". This leaves plain
// text like "Email us <officer@utexas.edu>" alone.
const TAG = /<\/?[a-z][a-z0-9]*(?=[\s/>])[^>]*>/gi;
const HAS_TAG = new RegExp(TAG.source, "i");

// Google wraps links as google.com/url?q=<real url>; show the real one.
function unwrapGoogleRedirect(url: string): string {
  const match = /^https?:\/\/(?:www\.)?google\.com\/url\?(.*)$/i.exec(url);
  if (!match) return url;
  return new URLSearchParams(match[1]).get("q") || url;
}

export function htmlToText(input: string): string {
  const isHtml = HAS_TAG.test(input);
  if (!isHtml && !/&[#a-z0-9]+;/i.test(input)) return input.trim();

  let text = input.replace(/\r\n?/g, "\n");
  // Source newlines inside HTML are just whitespace; tags carry the structure.
  if (isHtml) text = text.replace(/\s*\n\s*/g, " ");

  text = text
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "")
    // Keep link targets when the visible text doesn't already show them.
    .replace(/<a\b[^>]*?href\s*=\s*["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href: string, inner: string) => {
      const label = inner.replace(TAG, "").trim();
      const url = unwrapGoogleRedirect(decodeEntities(href)).replace(/^mailto:/i, "");
      if (!label) return url;
      return decodeEntities(label) === url || label.includes(url) ? label : `${label} (${url})`;
    })
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li\b[^>]*>/gi, "\n• ")
    .replace(/<\/li>/gi, "")
    .replace(new RegExp(`<\\/?(${BLOCK_TAGS})\\b[^>]*>`, "gi"), "\n\n")
    .replace(TAG, "");

  return decodeEntities(text)
    .replace(/[ \t ]+\n/g, "\n")
    .replace(/\n[ \t ]+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    // A list right after a paragraph only needs one break before its first bullet.
    .replace(/\n\n• /g, "\n• ")
    .trim();
}
