import type { SlideEntry } from "../lib/slides.ts";

// Pure logic behind the Slides page: which semester a deck belongs to, the
// filter (semester, meeting type, topic) and search, and the grouping into
// semester sections. The page only renders what these return.

export interface Semester {
  key: string; // "2026-fall"
  label: string; // "Fall 2026"
  order: number; // sorts semesters in time
}

// UT's calendar: spring runs January to May, summer June and July, fall
// August to December.
export function semesterOf(date: Date): Semester {
  const year = date.getFullYear();
  const month = date.getMonth();
  const term = month <= 4 ? "Spring" : month <= 6 ? "Summer" : "Fall";
  const rank = term === "Spring" ? 0 : term === "Summer" ? 1 : 2;
  return { key: `${year}-${term.toLowerCase()}`, label: `${term} ${year}`, order: year * 3 + rank };
}

// The sheet's meeting type column holds short codes; the page spells them out.
const MEETING_TYPE_LABELS: Record<string, string> = {
  GM: "General meeting",
};

export function meetingTypeLabel(type: string): string {
  return MEETING_TYPE_LABELS[type] ?? type;
}

export type SortOrder = "newest" | "oldest";

export interface FilterValue {
  semesters: string[]; // Semester keys
  types: string[]; // meeting type codes, as in the sheet
  topics: string[];
}

export const EMPTY_FILTER: FilterValue = { semesters: [], types: [], topics: [] };

export function activeCount(value: FilterValue): number {
  return value.semesters.length + value.types.length + value.topics.length;
}

// Nothing ticked in a section means that section does not filter.
export function matchesFilter(slide: SlideEntry, value: FilterValue): boolean {
  if (value.semesters.length && !value.semesters.includes(semesterOf(slide.date).key)) return false;
  if (value.types.length && !value.types.includes(slide.meetingType)) return false;
  if (value.topics.length && !slide.topics.some((t) => value.topics.includes(t))) return false;
  return true;
}

export function matchesSearch(slide: SlideEntry, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [slide.title, slide.description, ...slide.topics].some((field) => field.toLowerCase().includes(q));
}

export function filterSlides(slides: SlideEntry[], value: FilterValue, query: string): SlideEntry[] {
  return slides.filter((s) => matchesFilter(s, value) && matchesSearch(s, query));
}

export interface Option {
  key: string;
  label: string;
  count: number;
}

export interface FilterOptions {
  semesters: Option[];
  types: Option[];
  topics: Option[];
}

// Every choice the data offers, with how many decks each holds. Semesters run
// newest first; types and topics alphabetically.
export function filterOptions(slides: SlideEntry[]): FilterOptions {
  const semesters = new Map<string, Option & { order: number }>();
  const types = new Map<string, Option>();
  const topics = new Map<string, Option>();
  const bump = (map: Map<string, Option>, key: string, label: string) => {
    const hit = map.get(key);
    if (hit) hit.count += 1;
    else map.set(key, { key, label, count: 1 });
  };

  for (const slide of slides) {
    const sem = semesterOf(slide.date);
    const hit = semesters.get(sem.key);
    if (hit) hit.count += 1;
    else semesters.set(sem.key, { key: sem.key, label: sem.label, count: 1, order: sem.order });
    if (slide.meetingType) bump(types, slide.meetingType, meetingTypeLabel(slide.meetingType));
    for (const topic of slide.topics) bump(topics, topic, topic);
  }

  const byLabel = (a: Option, b: Option) => a.label.localeCompare(b.label);
  return {
    semesters: [...semesters.values()].sort((a, b) => b.order - a.order).map(({ key, label, count }) => ({ key, label, count })),
    types: [...types.values()].sort(byLabel),
    topics: [...topics.values()].sort(byLabel),
  };
}

export interface SemesterGroup {
  semester: Semester;
  slides: SlideEntry[];
}

export function groupBySemester(slides: SlideEntry[], order: SortOrder): SemesterGroup[] {
  const sign = order === "newest" ? -1 : 1;
  const sorted = [...slides].sort((a, b) => sign * (a.date.getTime() - b.date.getTime()));
  const groups: SemesterGroup[] = [];
  for (const slide of sorted) {
    const semester = semesterOf(slide.date);
    const last = groups[groups.length - 1];
    if (last && last.semester.key === semester.key) last.slides.push(slide);
    else groups.push({ semester, slides: [slide] });
  }
  return groups;
}
