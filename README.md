# Claude Builder Club Website

An open-source, production-ready website template for Claude Builder Clubs. Built by the **Texas Claude Builder Club** at UT Austin, this project is designed so any club worldwide can fork it, plug in their own API keys, and have a fully functional site up and running in minutes.

## Overview

This website was built entirely with [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) (Anthropic's agentic coding tool) as a real-world demonstration of what you can build with Claude. We designed the site around two core principles:

1. **Zero-code content management** — Club officers update events and meeting slides through Google Calendar and Google Sheets. The website pulls from those sources automatically, so nobody ever needs to touch the codebase to keep content fresh.
2. **Anthropic's design philosophy** — We match Anthropic's conversational, clean, and friendly aesthetic. The site prioritizes readability and functionality, making it easy for visitors to learn about the club, find upcoming events, and access past meeting materials.

The entire site — from the initial scaffold to the API integrations — was built through natural language conversations with Claude Code.

## Inspiration

We took inspiration from [Cambridge's awesome site](https://cambridge-ai-build-club.github.io/CUABC-Web/) and expanded on it with dynamic API-driven content, so club content stays up to date without manual deployments.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16 | React framework with App Router, server-side rendering, and built-in API caching |
| [React](https://react.dev/) | 19 | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety across the codebase |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first CSS framework for responsive styling |
| [Vercel](https://vercel.com/) | — | Hosting and deployment (free tier works great) |
| [Vercel Analytics](https://vercel.com/analytics) | — | Optional visitor analytics |
| [Google Calendar API](https://developers.google.com/calendar/api) | v3 | Live event data for the Events page |
| [Google Sheets API](https://developers.google.com/sheets/api) | v4 | Meeting slides metadata for the Slides page |

## How the API Integrations Work

The site uses two Google API integrations that let non-technical club members manage content without ever touching code. Both use the same Google API key and follow the same pattern: fetch data, cache it for 5 minutes, parse it into typed interfaces, and display it.

### Google Calendar → Events Page (`/events`)

**How it works:**
- The Events page (`frontend/app/events/page.tsx`) calls `fetchCalendarEvents()` from `frontend/app/lib/calendar.ts` on page load.
- That function hits the [Google Calendar API v3](https://developers.google.com/calendar/api/v3/reference/events/list), fetching events from the past month through 6 months ahead.
- Each event is parsed into a typed `CalendarEvent` object with fields like `title`, `date`, `startTime`, `location`, `type`, and `description`.
- **Event type detection** works two ways: first by scanning the event title and description for keywords (e.g., "hackathon", "workshop", "social"), then falling back to Google Calendar color IDs. This means officers just name events naturally and the site categorizes them automatically.
- **Flagship/featured events** are detected by keywords like "flagship", "hackathon", or star emojis in the title or description.
- Results are cached for 5 minutes via Next.js `revalidate`, so the calendar stays current without hammering the API.

**What club members do:** Just create events in the linked Google Calendar like normal. The website picks them up automatically.

### Google Sheets → Meeting Slides Page (`/slides`)

**How it works:**
- The Slides page (`frontend/app/slides/page.tsx`) calls `fetchSlides()` from `frontend/app/lib/slides.ts` on page load.
- That function hits the [Google Sheets API v4](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get), reading rows from `Sheet1` starting at row 2 (skipping the header).
- The Google Sheet has 5 columns: **Title | Date | Link | Description | Topic**.
- Each row is parsed into a typed `SlideEntry` object. Rows missing a title, date, or link are silently skipped.
- If a slide link points to Google Slides, the site automatically generates a thumbnail preview by using Google's built-in PNG export URL.
- The page supports filtering by topic and searching by title or description.
- Results are cached for 5 minutes and sorted newest-first.

**What club members do:** Open the shared Google Sheet, add a new row with the slide info, and the website displays it within 5 minutes.

## Setup

### Prerequisites
- Node.js 18+
- A Google Cloud API key with the **Google Calendar API** and **Google Sheets API** enabled
- A public Google Calendar
- A public Google Sheet with columns: `Title | Date | Link | Description | Topic`

### Getting Started

```bash
# Clone the repo
git clone https://github.com/your-org/your-repo.git
cd your-repo/frontend

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
```

Add your credentials to the `.env` file:

```env
NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY=your_api_key_here
NEXT_PUBLIC_GOOGLE_CALENDAR_ID=your_calendar_id_here
NEXT_PUBLIC_SLIDES_SHEET_ID=your_sheet_id_here
```

```bash
# Run the development server
npm run dev
```

### Getting Your API Credentials

1. **Google API Key**: Go to the [Google Cloud Console](https://console.cloud.google.com/), create a project, enable the **Google Calendar API** and **Google Sheets API**, then create an API key under Credentials. Restrict it to those two APIs for security.
2. **Google Calendar ID**: In Google Calendar settings, find "Integrate calendar" and copy the Calendar ID (looks like `abc123@group.calendar.google.com`). Make sure the calendar is set to **public**.
3. **Google Sheets ID**: Create a Google Sheet, copy the ID from the URL (`https://docs.google.com/spreadsheets/d/THIS_PART/edit`), and set sharing to **"Anyone with the link can view"**.

## What to Change When Forking

Here's what you'll want to customize for your own club:

### Must Change
- **Environment variables** — Plug in your own Google API key, Calendar ID, and Sheets ID (see Setup above).
- **Club name and branding** — Update `frontend/app/layout.tsx` (site metadata) and `frontend/app/components/Header.tsx` (nav bar title and links).
- **Club links** — Update `frontend/app/links/page.tsx` with your own social media, signup forms, and resources.
- **Team photos/info** — Replace team member content on the homepage (`frontend/app/page.tsx`) and in `frontend/public/`.

### Optional Customizations
- **Color theme** — The site uses CSS custom properties defined in `frontend/app/globals.css`. Swap `--primary`, `--cream`, and other values to match your university's brand.
- **Event type keywords** — If your club uses different event names, update the `TYPE_KEYWORDS` map in `frontend/app/lib/calendar.ts` to match your naming conventions.
- **Google Calendar colors** — Update the `COLOR_TO_TYPE` map in `frontend/app/lib/calendar.ts` to map calendar colors to your event types.
- **Slides sheet structure** — The default columns are `Title | Date | Link | Description | Topic`. If you change the column order, update the `parseRow()` function in `frontend/app/lib/slides.ts`.
- **Vercel Analytics** — Analytics are included via `@vercel/analytics`. Remove the import in `frontend/app/layout.tsx` if you don't need it, or it'll work automatically when deployed to Vercel.

## Deployment

The easiest way to deploy is with [Vercel](https://vercel.com/):

1. Push your fork to GitHub.
2. Import the repo in Vercel and set the root directory to `frontend`.
3. Add your three environment variables in the Vercel project settings.
4. Deploy. That's it.

## Credits

Built with Claude Code by the Texas Claude Builder Club at UT Austin.

Inspired by [Cambridge's AI Build Club site](https://cambridge-ai-build-club.github.io/CUABC-Web/).

Feel free to fork and modify for your own club!
