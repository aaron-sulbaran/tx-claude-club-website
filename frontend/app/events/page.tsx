"use client";

import { useEffect, useId, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { fetchCalendarEvents, type CalendarEvent, type EventType } from "../lib/calendar";
import { EVENTS_TABS, addToCalendarUrl, countLabel, eventsForTab, isUpcoming, type EventsTab } from "./event-filters";

// Laid out like the archive on anthropic.com/news: a featured "next up"
// item, then ruled rows (no cards) under an Upcoming / Past / All switch.
// Rows open in place. See docs/research/inspiration/anthropic.md.

const INSTAGRAM_URL = "https://www.instagram.com/texasclaude";

// Event types use the brand kit's pastel fields; the label carries the
// meaning, the swatch only echoes it.
const EVENT_TYPES: Record<EventType, { label: string; swatch: string }> = {
  meeting: { label: "General meeting", swatch: "bg-heather" },
  tabling: { label: "Tabling", swatch: "bg-tan" },
  hackathon: { label: "Hackathon", swatch: "bg-clay" },
  workshop: { label: "Workshop", swatch: "bg-cactus" },
  demo: { label: "Demo day", swatch: "bg-peach" },
  social: { label: "Social", swatch: "bg-peach" },
  speaker: { label: "Guest speaker", swatch: "bg-heather" },
  other: { label: "Event", swatch: "bg-line" },
};

function formatDay(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatTime(event: CalendarEvent) {
  if (!event.startTime) return "";
  return event.endTime ? `${event.startTime} to ${event.endTime}` : event.startTime;
}

function TypeLabel({ type }: { type: EventType }) {
  const { label, swatch } = EVENT_TYPES[type];
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-ink/15 ${swatch}`} aria-hidden />
      {label}
    </span>
  );
}

function AddToCalendar({ event, tone = "ink" }: { event: CalendarEvent; tone?: "ink" | "quiet" }) {
  return (
    <a
      href={addToCalendarUrl(event)}
      target="_blank"
      rel="noopener noreferrer"
      className={
        tone === "ink"
          ? "inline-flex h-11 items-center rounded-lg bg-ink px-5 text-[15px] font-medium text-ivory transition-shadow duration-200 hover:shadow-[0_0_0_1px_var(--color-ink)] hover:bg-black"
          : "inline-flex h-9 items-center rounded-lg border border-line bg-card px-4 text-sm font-medium text-ink transition-shadow duration-200 hover:shadow-[0_0_0_1px_var(--color-line)]"
      }
    >
      Add to calendar
    </a>
  );
}

function NextUp({ event }: { event: CalendarEvent }) {
  return (
    <section aria-labelledby="next-up" className="border-b border-line pb-12 md:pb-16">
      <p id="next-up" className="label-caps text-primary">
        Next up
      </p>
      <div className="mt-4 grid gap-6 md:grid-cols-[11rem_1fr] md:gap-12">
        <p className="font-display text-ink">
          <span className="block text-6xl leading-none md:text-7xl">{event.date.getDate()}</span>
          <span className="mt-2 block text-xl">{event.date.toLocaleDateString("en-US", { month: "long" })}</span>
          <span className="block text-xl text-subtle">{event.date.toLocaleDateString("en-US", { weekday: "long" })}</span>
        </p>
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl">{event.title}</h2>
          <p className="mt-3 text-[15px] text-subtle">
            <TypeLabel type={event.type} />
          </p>
          <dl className="mt-4 grid grid-cols-[5.5rem_1fr] gap-y-2 text-[15px]">
            {formatTime(event) && (
              <>
                <dt className="label-caps self-center text-subtle">Time</dt>
                <dd>{formatTime(event)}</dd>
              </>
            )}
            {event.location && (
              <>
                <dt className="label-caps self-center text-subtle">Place</dt>
                <dd>{event.location}</dd>
              </>
            )}
          </dl>
          {event.description && (
            <p className="mt-4 line-clamp-4 whitespace-pre-wrap text-[15px] leading-relaxed text-subtle">
              {event.description}
            </p>
          )}
          <div className="mt-6">
            <AddToCalendar event={event} />
          </div>
        </div>
      </div>
    </section>
  );
}

function EventRow({ event, upcoming }: { event: CalendarEvent; upcoming: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <li className="border-t border-line">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="-mx-3 grid w-[calc(100%+1.5rem)] grid-cols-[1fr_1.5rem] items-center gap-x-6 gap-y-1 rounded-lg px-3 py-4 text-left transition-colors duration-200 hover:bg-[#f5f4ed] md:grid-cols-[9rem_minmax(0,1.6fr)_minmax(0,1.2fr)_9.5rem_1.5rem] md:py-3.5"
      >
        <span className="col-start-1 flex flex-wrap gap-x-3 text-sm text-subtle md:col-auto md:text-[15px] md:text-ink">
          {formatDay(event.date)}
          <span className="text-subtle md:hidden">
            <TypeLabel type={event.type} />
          </span>
        </span>
        <span className="col-start-1 line-clamp-2 text-base font-medium text-ink md:col-auto md:line-clamp-1 md:text-[15px]">
          {event.title}
          {event.isFlagship && <span className="label-caps ml-2 align-middle text-primary">Flagship</span>}
        </span>
        <span className="hidden truncate text-[15px] text-subtle md:block">{event.location}</span>
        <span className="hidden text-[15px] text-subtle md:block">
          <TypeLabel type={event.type} />
        </span>
        <FaChevronDown
          aria-hidden
          className={`col-start-2 row-span-2 row-start-1 h-3 w-3 justify-self-end text-subtle transition-transform duration-150 ease-out md:col-auto md:row-span-1 md:row-auto ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div id={panelId} className="event-row-panel" data-open={open}>
        <div className="overflow-hidden">
          <div className="event-row-details grid gap-4 pb-6 pt-1 md:grid-cols-[9rem_1fr] md:gap-6">
            <div className="hidden md:block" />
            <div className="max-w-2xl">
              <dl className="grid grid-cols-[5.5rem_1fr] gap-y-2 text-[15px]">
                {formatTime(event) && (
                  <>
                    <dt className="label-caps self-center text-subtle">Time</dt>
                    <dd>{formatTime(event)}</dd>
                  </>
                )}
                {event.location && (
                  <>
                    <dt className="label-caps self-center text-subtle">Place</dt>
                    <dd>{event.location}</dd>
                  </>
                )}
              </dl>
              {event.description && (
                <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-subtle">{event.description}</p>
              )}
              {upcoming && (
                <div className="mt-4">
                  <AddToCalendar event={event} tone="quiet" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; events: CalendarEvent[] };

export default function EventsPage() {
  const [load, setLoad] = useState<LoadState>({ status: "loading" });
  const [tab, setTab] = useState<EventsTab>("upcoming");

  useEffect(() => {
    let active = true;
    fetchCalendarEvents().then(({ events, error }) => {
      if (!active) return;
      setLoad(error ? { status: "error", message: error } : { status: "ready", events });
    });
    return () => {
      active = false;
    };
  }, []);

  const now = new Date();
  const events = load.status === "ready" ? load.events : [];
  const upcoming = eventsForTab(events, "upcoming", now);
  const [nextEvent, ...laterEvents] = upcoming;
  // The next event already has the featured spot, so the Upcoming list starts after it.
  const listed = tab === "upcoming" ? laterEvents : eventsForTab(events, tab, now);
  const pastCount = events.length - upcoming.length;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 text-ink">
        <PageHeader
          title="Events"
          intro="Workshops, hackathons, and demos to help you build with Claude."
          field="peach"
          art="grid"
        />

        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 md:py-16">
          {load.status === "loading" && (
            <p className="py-10 text-subtle" aria-live="polite">
              Checking the club calendar
            </p>
          )}

          {load.status === "error" && (
            <div className="rounded-xl bg-tan p-6">
              <h2 className="text-2xl">The calendar didn&apos;t load</h2>
              <p className="mt-2 text-[15px] text-subtle">
                Try again in a moment. Dates also go up on{" "}
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  Instagram
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 inline-flex h-9 items-center rounded-lg bg-ink px-4 text-sm font-medium text-ivory hover:bg-black"
              >
                Try again
              </button>
            </div>
          )}

          {load.status === "ready" && (
            <>
              {nextEvent && <NextUp event={nextEvent} />}

              <section aria-labelledby="all-events" className={nextEvent ? "pt-12 md:pt-16" : ""}>
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <h2 id="all-events" className="text-3xl md:text-4xl">
                    {tab === "upcoming" && nextEvent ? "After that" : tab === "past" ? "Past events" : "All events"}
                  </h2>
                  <div role="tablist" aria-label="Which events" className="flex rounded-lg bg-stone p-1">
                    {EVENTS_TABS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        role="tab"
                        aria-selected={tab === option.id}
                        onClick={() => setTab(option.id)}
                        className={`h-8 rounded-md px-4 text-sm font-medium transition-colors duration-200 ${
                          tab === option.id ? "bg-ink text-ivory" : "text-subtle hover:text-ink"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="label-caps mt-6 border-b border-line pb-3 text-subtle">
                  {countLabel(listed.length, tab)}
                </p>

                <div className="mt-2 hidden grid-cols-[9rem_minmax(0,1.6fr)_minmax(0,1.2fr)_9.5rem_1.5rem] gap-x-6 py-2 md:grid">
                  {["Date", "Event", "Place", "Type"].map((heading) => (
                    <span key={heading} className="label-caps text-subtle">
                      {heading}
                    </span>
                  ))}
                </div>

                {listed.length > 0 ? (
                  <ul className="border-b border-line">
                    {listed.map((event) => (
                      <EventRow key={event.id} event={event} upcoming={isUpcoming(event, now)} />
                    ))}
                  </ul>
                ) : (
                  <div className="border-t border-line py-10">
                    <p className="max-w-xl text-lg">
                      {tab === "past"
                        ? "No past events this school year yet."
                        : nextEvent
                          ? "Nothing else on the calendar yet."
                          : "Nothing on the calendar yet."}{" "}
                      Dates go up on{" "}
                      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                        Instagram
                      </a>{" "}
                      first.
                    </p>
                    {tab === "upcoming" && pastCount > 0 && (
                      <button
                        type="button"
                        onClick={() => setTab("past")}
                        className="mt-4 text-[15px] text-primary underline underline-offset-4 hover:text-primary-dark"
                      >
                        See past events
                      </button>
                    )}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
