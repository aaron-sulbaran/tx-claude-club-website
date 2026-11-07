"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaCalendarPlus,
  FaStar,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  fetchCalendarEvents,
  CalendarEvent,
  EventType,
} from "../lib/calendar";

// Event type colors matching UT brand
// Event types use the brand kit's pastel fields with ink text, like the
// club's posts. The first class of each badge doubles as the legend dot.
const EVENT_TYPE_STYLES: Record<
  EventType,
  { bg: string; border: string; badge: string; label: string }
> = {
  meeting: { bg: "bg-heather", border: "border-heather", badge: "bg-heather text-ink", label: "General meeting" },
  tabling: { bg: "bg-tan", border: "border-tan", badge: "bg-tan text-ink", label: "Tabling" },
  hackathon: { bg: "bg-clay", border: "border-clay", badge: "bg-clay text-ink", label: "Hackathon" },
  workshop: { bg: "bg-cactus", border: "border-cactus", badge: "bg-cactus text-ink", label: "Workshop" },
  demo: { bg: "bg-peach", border: "border-peach", badge: "bg-peach text-ink", label: "Demo day" },
  social: { bg: "bg-peach", border: "border-peach", badge: "bg-peach text-ink", label: "Social" },
  speaker: { bg: "bg-heather", border: "border-heather", badge: "bg-heather text-ink", label: "Guest speaker" },
  other: { bg: "bg-line", border: "border-line", badge: "bg-line text-ink", label: "Event" },
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export default function EventsPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events on mount
  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      const { events: fetchedEvents, error: fetchError } =
        await fetchCalendarEvents();

      if (fetchError) {
        setError(fetchError);
      } else {
        setEvents(fetchedEvents);
        setError(null);
      }
      setLoading(false);
    }

    loadEvents();
  }, []);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  // Filter events for current month view
  const eventsThisMonth = events.filter(
    (event) =>
      event.date.getMonth() === currentMonth &&
      event.date.getFullYear() === currentYear
  );

  // Get all upcoming events (for sidebar)
  const upcomingEvents = events
    .filter((event) => event.date >= new Date(today.setHours(0, 0, 0, 0)))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const navigateMonth = (direction: number) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const getEventsForDay = (day: number) => {
    return eventsThisMonth.filter((event) => event.date.getDate() === day);
  };

  // Get unique event types for the legend (only from current events)
  const activeEventTypes = [...new Set(events.map((event) => event.type))];

  // Generate Google Calendar add URL
  const getAddToCalendarUrl = (event: CalendarEvent) => {
    const startDate = event.date.toISOString().replace(/-|:|\.\d+/g, "");
    const endDate = new Date(event.date);
    endDate.setHours(endDate.getHours() + 2); // Default 2 hour duration
    const endDateStr = endDate.toISOString().replace(/-|:|\.\d+/g, "");

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: event.title,
      dates: `${startDate}/${endDateStr}`,
      details: event.description,
      location: event.location,
    });

    return `https://calendar.google.com/calendar/render?${params}`;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <PageHeader
          title="Upcoming events"
          intro="Workshops, hackathons, and demos to help you build with Claude."
          field="peach"
          art="grid"
        />

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-subtle">Loading events</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="mx-auto max-w-2xl px-8 py-12">
            <div className="rounded-[4px] border border-line bg-tan p-6 text-center">
              <FaExclamationTriangle className="mx-auto h-8 w-8 text-ink" />
              <h3 className="mt-3 font-semibold text-ink">
                The calendar didn’t load
              </h3>
              <p className="mt-2 text-sm text-subtle">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 rounded-[4px] bg-ink px-4 py-2 text-sm font-medium text-ivory hover:bg-black"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Calendar Section */}
        {!loading && !error && (
          <section className="mx-auto max-w-7xl px-4 py-6 sm:py-10 md:px-8 lg:px-12">
            {/* Event Type Legend - Hidden on mobile, shown on tablet+ */}
            {activeEventTypes.length > 0 && (
              <div className="mb-6 hidden flex-wrap items-center gap-4 sm:flex">
                <span className="text-sm font-medium text-subtle">
                  Event types:
                </span>
                {activeEventTypes.map((type) => {
                  const styles = EVENT_TYPE_STYLES[type];
                  return (
                    <div key={type} className="flex items-center gap-2">
                      <span
                        className={`h-3 w-3 rounded-full ${styles.badge.split(" ")[0]}`}
                      />
                      <span className="text-sm text-subtle">
                        {styles.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-3 lg:grid-rows-[auto_1fr]">
              {/* Next Event - Shows FIRST on mobile, top-right on desktop */}
              <div className="order-1 lg:order-2 lg:col-start-3 lg:row-start-1">
                {upcomingEvents.length > 0 && (() => {
                  const nextEvent = upcomingEvents[0];
                  const nextStyles = EVENT_TYPE_STYLES[nextEvent.type];
                  return (
                    <div
                      className={`rounded-[4px] border-l-4 ${nextStyles.border} ${nextStyles.bg} p-4 sm:p-5`}
                    >
                      <div className="mb-2 flex items-center justify-between sm:mb-3">
                        <span className="text-[10px] font-medium text-subtle sm:text-xs">
                          Next Event
                        </span>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[9px] font-medium sm:px-2 sm:text-[10px] ${nextStyles.badge}`}
                        >
                          {nextStyles.label}
                        </span>
                      </div>
                      <h3 className="text-lg text-ink sm:text-xl">
                        {nextEvent.title}
                      </h3>
                      <div className="mt-2 space-y-1 text-xs text-subtle sm:mt-3 sm:space-y-1.5 sm:text-sm">
                        <div className="flex items-center gap-2">
                          <FaCalendarPlus className="h-3 w-3 shrink-0 text-ink/40 sm:h-3.5 sm:w-3.5" />
                          <span>
                            {nextEvent.date.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaClock className="h-3 w-3 shrink-0 text-ink/40 sm:h-3.5 sm:w-3.5" />
                          <span>
                            {nextEvent.startTime}
                            {nextEvent.endTime && ` - ${nextEvent.endTime}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="h-3 w-3 shrink-0 text-ink/40 sm:h-3.5 sm:w-3.5" />
                          <span>{nextEvent.location}</span>
                        </div>
                      </div>
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-subtle sm:mt-3 sm:line-clamp-none sm:text-sm">
                        {nextEvent.description}
                      </p>
                      <a
                        href={getAddToCalendarUrl(nextEvent)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-3 inline-flex items-center gap-2 rounded-[4px] ${nextStyles.badge} px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-90 sm:mt-4 sm:px-4 sm:py-2 sm:text-sm`}
                      >
                        <FaCalendarPlus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        Add to calendar
                      </a>
                    </div>
                  );
                })()}

                {upcomingEvents.length === 0 && (
                  <div className="rounded-[4px] border border-line bg-card p-6 text-center">
                    <p className="text-sm text-subtle">
                      No upcoming events scheduled. Check back soon!
                    </p>
                  </div>
                )}
              </div>

              {/* Calendar Grid - Shows SECOND on mobile, spans left 2 columns on desktop */}
              <div className="order-2 lg:order-1 lg:col-span-2 lg:row-span-2">
                <div className="rounded-[4px] border border-line bg-card p-3 sm:p-5 md:p-8">
                  {/* Month Navigation */}
                  <div className="mb-4 flex items-center justify-between sm:mb-8">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="rounded-[4px] px-2 py-1.5 text-xs font-medium text-subtle transition-colors hover:bg-tan hover:text-ink sm:px-3 sm:py-2 sm:text-sm"
                    >
                      ← Prev
                    </button>
                    <h2 className="text-xl text-ink sm:text-2xl md:text-3xl">
                      {MONTHS[currentMonth]} {currentYear}
                    </h2>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="rounded-[4px] px-2 py-1.5 text-xs font-medium text-subtle transition-colors hover:bg-tan hover:text-ink sm:px-3 sm:py-2 sm:text-sm"
                    >
                      Next →
                    </button>
                  </div>

                  {/* Day Headers */}
                  <div className="mb-2 grid grid-cols-7 gap-1 sm:mb-3 sm:gap-2">
                    {DAYS.map((day) => (
                      <div
                        key={day}
                        className="py-1 text-center text-[10px] font-medium text-subtle sm:py-2 sm:text-xs md:text-sm"
                      >
                        <span className="sm:hidden">{day.charAt(0)}</span>
                        <span className="hidden sm:inline">{day}</span>
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {/* Empty cells for days before the 1st */}
                    {Array.from({ length: firstDay }).map((_, index) => (
                      <div key={`empty-${index}`} className="h-12 sm:h-20 md:h-28 lg:h-32" />
                    ))}

                    {/* Days of the month */}
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                      const day = index + 1;
                      const dayDate = new Date(currentYear, currentMonth, day);
                      const dayEvents = getEventsForDay(day);
                      const isCurrentDay = isToday(dayDate);
                      const hasFlagship = dayEvents.some((e) => e.isFlagship);

                      return (
                        <div
                          key={day}
                          className={`relative h-12 rounded-[4px] border p-1 transition-colors sm:h-20 sm:rounded-[4px] sm:p-1.5 md:h-28 md:p-2 lg:h-32 ${
                            hasFlagship
                              ? "border-primary bg-gradient-to-br from-primary/5 to-amber-50"
                              : isCurrentDay
                                ? "border-primary/50 bg-primary/5"
                                : "border-transparent hover:border-line hover:bg-tan/50"
                          }`}
                        >
                          <span
                            className={`text-[10px] font-medium sm:text-xs md:text-sm ${
                              isCurrentDay
                                ? "font-bold text-primary"
                                : "text-subtle"
                            }`}
                          >
                            {day}
                          </span>

                          {/* Event indicators - Dots on mobile, full titles on larger screens */}
                          <div className="mt-0.5 flex flex-col gap-0.5 sm:mt-1">
                            {/* Mobile: Show dots only */}
                            <div className="flex flex-wrap gap-1 sm:hidden">
                              {dayEvents.slice(0, 3).map((event) => {
                                const styles = EVENT_TYPE_STYLES[event.type];
                                return (
                                  <button
                                    key={event.id}
                                    onClick={() => setSelectedEvent(event)}
                                    className={`h-2 w-2 rounded-full ${styles.badge.split(" ")[0]} ${
                                      event.isFlagship ? "ring-1 ring-primary" : ""
                                    }`}
                                    aria-label={event.title}
                                  />
                                );
                              })}
                              {dayEvents.length > 3 && (
                                <span className="text-[8px] text-subtle">
                                  +{dayEvents.length - 3}
                                </span>
                              )}
                            </div>
                            {/* Desktop: Show full event titles */}
                            <div className="hidden sm:flex sm:flex-col sm:gap-0.5">
                              {dayEvents.slice(0, 2).map((event) => {
                                const styles = EVENT_TYPE_STYLES[event.type];
                                return (
                                  <button
                                    key={event.id}
                                    onClick={() => setSelectedEvent(event)}
                                    className={`w-full truncate rounded px-1 py-0.5 text-left text-[10px] font-medium transition-all md:text-xs ${styles.bg} ${styles.border} border ${
                                      event.isFlagship
                                        ? "ring-1 ring-primary/50 hover:ring-2 hover:ring-primary"
                                        : "hover:opacity-80"
                                    }`}
                                  >
                                    {event.isFlagship && (
                                      <FaStar className="mr-0.5 inline h-2 w-2 text-primary" />
                                    )}
                                    {event.title}
                                  </button>
                                );
                              })}
                              {dayEvents.length > 2 && (
                                <span className="text-[10px] text-subtle">
                                  +{dayEvents.length - 2} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* All Events - Shows THIRD on mobile, bottom-right on desktop */}
              {upcomingEvents.length > 1 && (
                <div className="order-3 lg:order-3 lg:col-start-3 lg:row-start-2">
                  <div className="flex max-h-[280px] flex-col rounded-[4px] border border-line bg-card sm:max-h-[350px] lg:max-h-none lg:h-full">
                    <h3 className="shrink-0 border-b border-line px-4 py-3 text-base text-ink sm:px-5 sm:py-4 sm:text-base">
                      All Events ({upcomingEvents.length})
                    </h3>
                    <div className="flex flex-col overflow-y-auto lg:max-h-[400px]">
                      {upcomingEvents.slice(1).map((event) => {
                        const styles = EVENT_TYPE_STYLES[event.type];
                        return (
                          <button
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className={`flex items-start gap-2 border-b border-line/70 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-tan/50 sm:gap-3 sm:px-5 sm:py-4`}
                          >
                            {/* Color indicator dot */}
                            <span
                              className={`mt-1 h-2 w-2 shrink-0 rounded-full sm:mt-1.5 sm:h-2.5 sm:w-2.5 ${styles.badge.split(" ")[0]}`}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <span className="text-sm font-semibold text-ink sm:text-base">
                                  {event.title}
                                </span>
                              </div>
                              <div className="mt-0.5 text-[11px] text-subtle sm:mt-1 sm:text-xs">
                                {event.date.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}{" "}
                                · {event.startTime}
                              </div>
                              <div className="mt-0.5 text-[11px] text-primary/70 sm:text-xs">
                                {event.location}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Selected Event Detail Modal/Panel */}
        {selectedEvent && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-0 animate-fade-in sm:items-center sm:p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <div
              className={`max-h-[85vh] w-full overflow-y-auto rounded-t-[8px] bg-card p-5 animate-slide-up sm:max-h-[90vh] sm:max-w-lg sm:rounded-[6px] md:p-8 ${
                selectedEvent.isFlagship
                  ? "ring-2 ring-primary ring-offset-2"
                  : ""
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile drag indicator */}
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted/40 sm:hidden" />

              <div className="mb-3 flex items-start justify-between sm:mb-4">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {selectedEvent.isFlagship && (
                    <span className="flex items-center gap-1 rounded-[4px] bg-tan px-2 py-0.5 text-xs font-medium text-ink sm:py-1">
                      <FaStar className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      Featured
                    </span>
                  )}
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-medium sm:px-2 sm:py-1 sm:text-xs ${EVENT_TYPE_STYLES[selectedEvent.type].badge}`}
                  >
                    {EVENT_TYPE_STYLES[selectedEvent.type].label}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="rounded-full p-1 text-subtle transition-colors hover:bg-muted/20 hover:text-ink"
                >
                  ✕
                </button>
              </div>

              <h2
                className={`text-2xl sm:text-3xl ${selectedEvent.isFlagship ? "text-primary" : "text-ink"}`}
              >
                {selectedEvent.title}
              </h2>

              <div className="mt-3 space-y-1.5 text-sm text-subtle sm:mt-4 sm:space-y-2">
                <div className="flex items-start gap-2">
                  <FaClock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary sm:h-4 sm:w-4" />
                  <span>
                    {selectedEvent.date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })} · {selectedEvent.startTime}
                    {selectedEvent.endTime && ` - ${selectedEvent.endTime}`}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary sm:h-4 sm:w-4" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>

              <p className="mt-3 whitespace-pre-wrap text-sm text-ink sm:mt-4 sm:text-base">
                {selectedEvent.description}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={getAddToCalendarUrl(selectedEvent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-ink px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-black"
                >
                  <FaCalendarPlus className="h-4 w-4" />
                  Add to calendar
                </a>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="inline-flex items-center justify-center rounded-[4px] border border-line px-5 py-2.5 text-sm font-medium text-subtle transition-colors hover:bg-tan"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
