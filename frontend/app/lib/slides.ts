// ============================================================
// Google Sheets API integration: the meeting slides library
// ============================================================
// Sheet columns: Title | Date | Link | Description | Topic | Tags
// The sheet's "Topic" column holds the meeting type (GM, Mini Demo). The
// optional "Tags" column holds subject tags, comma separated (MCP, Claude
// Code); the Slides filter offers a Topic section once any deck has one.
// ============================================================

export interface SlideEntry {
  id: string;
  title: string;
  date: Date;
  url: string;
  description: string;
  meetingType: string;
  topics: string[];
}

interface GoogleSheetsResponse {
  values?: string[][];
  error?: {
    code: number;
    message: string;
  };
}

function extractPresentationId(url: string): string | null {
  // Match Google Slides/Docs/Drive URLs to extract the file ID
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export function getThumbnailUrl(url: string): string | null {
  // Only generate thumbnails for Google Slides URLs
  if (!url.includes("docs.google.com/presentation")) return null;
  const id = extractPresentationId(url);
  if (!id) return null;
  // Export the first slide as PNG; this works reliably for publicly shared presentations
  return `https://docs.google.com/presentation/d/${id}/export/png`;
}

function parseRow(row: string[], index: number): SlideEntry | null {
  const [title, date, url, description, meetingType, tags] = row;

  if (!title || !date || !url) return null;

  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return null;

  return {
    id: `slide-${index}`,
    title: title.trim(),
    date: parsed,
    url: url.trim(),
    description: (description || "").trim(),
    meetingType: (meetingType || "").trim(),
    topics: (tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  };
}

export async function fetchSlides(): Promise<{
  slides: SlideEntry[];
  error: string | null;
}> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;
  const sheetId = process.env.NEXT_PUBLIC_SLIDES_SHEET_ID;

  if (!apiKey || !sheetId) {
    console.error("Missing Google API key or Slides Sheet ID");
    return {
      slides: [],
      error: "Slides configuration missing. Please check environment variables.",
    };
  }

  // Fetch rows from Sheet1, skipping the header row (A2:F)
  const range = encodeURIComponent("Sheet1!A2:F");
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google Sheets API error:", errorData);
      return {
        slides: [],
        error: `API Error: ${errorData.error?.message || response.statusText}`,
      };
    }

    const data: GoogleSheetsResponse = await response.json();

    if (data.error) {
      return {
        slides: [],
        error: data.error.message,
      };
    }

    const slides = (data.values || [])
      .map((row, i) => parseRow(row, i))
      .filter((entry): entry is SlideEntry => entry !== null)
      .sort((a, b) => b.date.getTime() - a.date.getTime()); // Newest first

    return { slides, error: null };
  } catch (err) {
    console.error("Failed to fetch slides:", err);
    return {
      slides: [],
      error: "Failed to load slides. Please try again later.",
    };
  }
}
