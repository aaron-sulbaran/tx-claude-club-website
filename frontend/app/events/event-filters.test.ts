import { test } from "node:test";
import assert from "node:assert/strict";
import type { CalendarEvent } from "../lib/calendar.ts";
import { addToCalendarUrl, countLabel, eventsForTab, isUpcoming } from "./event-filters.ts";

const now = new Date(2026, 10, 8, 15, 0); // Nov 8, 2026, 3 PM

function event(id: string, date: Date): CalendarEvent {
  return {
    id,
    title: `Event ${id}`,
    date,
    startTime: "6:00 PM",
    endTime: "7:00 PM",
    location: "GDC 2.216",
    type: "meeting",
    description: "",
    isFlagship: false,
  };
}

const lastWeek = event("last-week", new Date(2026, 10, 1, 18));
const thisMorning = event("this-morning", new Date(2026, 10, 8, 9));
const tonight = event("tonight", new Date(2026, 10, 8, 18));
const nextWeek = event("next-week", new Date(2026, 10, 15, 18));
const lastMonth = event("last-month", new Date(2026, 9, 10, 18));
const events = [nextWeek, lastMonth, tonight, lastWeek, thisMorning];

test("events earlier today still count as upcoming", () => {
  assert.equal(isUpcoming(thisMorning, now), true);
  assert.equal(isUpcoming(lastWeek, now), false);
});

test("upcoming is soonest first", () => {
  assert.deepEqual(
    eventsForTab(events, "upcoming", now).map((e) => e.id),
    ["this-morning", "tonight", "next-week"]
  );
});

test("past is most recent first", () => {
  assert.deepEqual(eventsForTab(events, "past", now).map((e) => e.id), ["last-week", "last-month"]);
});

test("all lists upcoming before past", () => {
  assert.deepEqual(
    eventsForTab(events, "all", now).map((e) => e.id),
    ["this-morning", "tonight", "next-week", "last-week", "last-month"]
  );
});

test("count label reads naturally", () => {
  assert.equal(countLabel(1, "upcoming"), "1 upcoming event");
  assert.equal(countLabel(3, "past"), "3 past events");
  assert.equal(countLabel(0, "all"), "0 events");
});

test("add-to-calendar link carries the title and location", () => {
  const url = new URL(addToCalendarUrl(tonight));
  assert.equal(url.searchParams.get("text"), "Event tonight");
  assert.equal(url.searchParams.get("location"), "GDC 2.216");
  assert.match(url.searchParams.get("dates") ?? "", /^\d{8}T\d{6}Z\/\d{8}T\d{6}Z$/);
});
