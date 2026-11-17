import { test } from "node:test";
import assert from "node:assert/strict";
import type { SlideEntry } from "../lib/slides.ts";
import {
  EMPTY_FILTER,
  activeCount,
  filterOptions,
  filterSlides,
  groupBySemester,
  meetingTypeLabel,
  semesterOf,
} from "./slide-filters.ts";

function slide(id: string, date: Date, meetingType: string, topics: string[] = [], title = `Deck ${id}`): SlideEntry {
  return { id, title, date, url: `https://example.com/${id}`, description: `About ${id}`, meetingType, topics };
}

// Mirrors the live sheet: one fall 2026 GM, the spring 2026 run, plus a fall 2025 deck.
const fallGm = slide("fall-gm", new Date(2026, 9, 27), "GM", ["Knowledge graphs"]);
const mbaDemo = slide("mba", new Date(2026, 3, 21), "Mini Demo");
const springGm4 = slide("gm4", new Date(2026, 2, 31), "GM", ["MCP", "Figma"], "Figma MCP");
const springGm1 = slide("gm1", new Date(2026, 1, 10), "GM");
const lastFall = slide("last-fall", new Date(2025, 10, 4), "Mini Demo", ["MCP"]);
const all = [springGm1, fallGm, lastFall, mbaDemo, springGm4];

test("semesters follow UT's calendar", () => {
  assert.equal(semesterOf(new Date(2026, 0, 15)).label, "Spring 2026");
  assert.equal(semesterOf(new Date(2026, 4, 31)).label, "Spring 2026");
  assert.equal(semesterOf(new Date(2026, 5, 1)).label, "Summer 2026");
  assert.equal(semesterOf(new Date(2026, 7, 1)).label, "Fall 2026");
  assert.equal(semesterOf(new Date(2026, 11, 31)).label, "Fall 2026");
});

test("the default view groups every deck by semester, newest first", () => {
  const groups = groupBySemester(filterSlides(all, EMPTY_FILTER, ""), "newest");
  assert.deepEqual(
    groups.map((g) => [g.semester.label, g.slides.map((s) => s.id)]),
    [
      ["Fall 2026", ["fall-gm"]],
      ["Spring 2026", ["mba", "gm4", "gm1"]],
      ["Fall 2025", ["last-fall"]],
    ]
  );
});

test("oldest first reverses semesters and the decks inside them", () => {
  const groups = groupBySemester(all, "oldest");
  assert.deepEqual(groups.map((g) => g.semester.label), ["Fall 2025", "Spring 2026", "Fall 2026"]);
  assert.deepEqual(groups[1].slides.map((s) => s.id), ["gm1", "gm4", "mba"]);
});

test("filters combine across sections and widen within one", () => {
  const ids = (value: typeof EMPTY_FILTER, q = "") => filterSlides(all, value, q).map((s) => s.id);
  assert.deepEqual(ids({ ...EMPTY_FILTER, types: ["GM"] }), ["gm1", "fall-gm", "gm4"]);
  assert.deepEqual(ids({ ...EMPTY_FILTER, semesters: ["2026-spring", "2025-fall"], types: ["Mini Demo"] }), [
    "last-fall",
    "mba",
  ]);
  assert.deepEqual(ids({ ...EMPTY_FILTER, topics: ["MCP"] }), ["last-fall", "gm4"]);
  assert.deepEqual(ids(EMPTY_FILTER, "figma"), ["gm4"]);
  assert.equal(activeCount({ semesters: ["2026-fall"], types: ["GM"], topics: [] }), 2);
});

test("filter options carry counts, semesters newest first", () => {
  const options = filterOptions(all);
  assert.deepEqual(
    options.semesters.map((o) => `${o.label} ${o.count}`),
    ["Fall 2026 1", "Spring 2026 3", "Fall 2025 1"]
  );
  assert.deepEqual(
    options.types.map((o) => `${o.label} ${o.count}`),
    ["General meeting 3", "Mini Demo 2"]
  );
  assert.deepEqual(
    options.topics.map((o) => `${o.label} ${o.count}`),
    ["Figma 1", "Knowledge graphs 1", "MCP 2"]
  );
});

test("meeting type codes are spelled out", () => {
  assert.equal(meetingTypeLabel("GM"), "General meeting");
  assert.equal(meetingTypeLabel("Mini Demo"), "Mini Demo");
});
