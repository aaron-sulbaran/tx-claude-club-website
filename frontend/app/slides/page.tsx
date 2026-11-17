"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { useState, useEffect, useMemo } from "react";
import {
  FaExternalLinkAlt,
  FaSpinner,
  FaExclamationTriangle,
  FaSlideshare,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { fetchSlides, SlideEntry, getThumbnailUrl } from "../lib/slides";
import {
  EMPTY_FILTER,
  filterOptions,
  filterSlides,
  groupBySemester,
  meetingTypeLabel,
  type FilterValue,
  type SortOrder,
} from "./slide-filters";
import { FilterMenu, SortMenu } from "./SlideControls";

function TypeBadge({ type }: { type: string }) {
  if (!type) return null;
  return (
    <span className="inline-block rounded-lg bg-tan px-2 py-0.5 text-xs font-medium text-ink">
      {meetingTypeLabel(type)}
    </span>
  );
}

function SlideCard({ slide }: { slide: SlideEntry }) {
  const thumbnail = getThumbnailUrl(slide.url);
  const [imgFailed, setImgFailed] = useState(false);
  const showThumbnail = thumbnail && !imgFailed;

  return (
    <a
      href={slide.url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover-fade group flex flex-col overflow-hidden rounded-xl bg-card transition-all hover:border-primary/30"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ivory">
        {showThumbnail ? (
          <img
            src={thumbnail}
            alt={`Thumbnail for ${slide.title}`}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FaSlideshare className="h-10 w-10 text-ink/15 sm:h-12 sm:w-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute right-2 top-2 rounded-lg bg-card/90 p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
          <FaExternalLinkAlt className="h-3 w-3 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-lg text-ink">
            {slide.title}
          </h3>
        </div>
        <p className="mt-1 text-sm text-subtle">
          {slide.date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        {slide.description && (
          <p className="mt-2 text-sm text-subtle line-clamp-2">
            {slide.description}
          </p>
        )}
        {slide.meetingType && (
          <div className="mt-3">
            <TypeBadge type={slide.meetingType} />
          </div>
        )}
      </div>
    </a>
  );
}

export default function SlidesPage() {
  const [slides, setSlides] = useState<SlideEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterValue>(EMPTY_FILTER);
  const [sort, setSort] = useState<SortOrder>("newest");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadSlides() {
      setLoading(true);
      const { slides: fetched, error: fetchError } = await fetchSlides();

      if (fetchError) {
        setError(fetchError);
      } else {
        setSlides(fetched);
        setError(null);
      }
      setLoading(false);
    }

    loadSlides();
  }, []);

  const options = useMemo(() => filterOptions(slides), [slides]);
  const filtered = useMemo(() => filterSlides(slides, filter, search), [slides, filter, search]);
  const groups = useMemo(() => groupBySemester(filtered, sort), [filtered, sort]);

  // One removable chip per ticked option, so what is filtered stays visible
  // without opening the panel.
  const chips = [
    ...options.semesters.filter((o) => filter.semesters.includes(o.key)).map((o) => ({ field: "semesters" as const, ...o })),
    ...options.types.filter((o) => filter.types.includes(o.key)).map((o) => ({ field: "types" as const, ...o })),
    ...options.topics.filter((o) => filter.topics.includes(o.key)).map((o) => ({ field: "topics" as const, ...o })),
  ];
  const removeChip = (field: keyof FilterValue, key: string) =>
    setFilter((f) => ({ ...f, [field]: f[field].filter((k) => k !== key) }));
  const resetAll = () => {
    setFilter(EMPTY_FILTER);
    setSearch("");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <PageHeader
          title="Meeting slides"
          intro="Browse slides from past meetings, workshops, and presentations"
          field="heather"
          art="lightbulb"
        />

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-subtle">Loading slides</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="mx-auto max-w-2xl px-8 py-12">
            <div className="rounded-xl bg-tan p-6 text-center">
              <FaExclamationTriangle className="mx-auto h-8 w-8 text-ink" />
              <h3 className="mt-3 text-lg text-ink">
                The slides didn’t load
              </h3>
              <p className="mt-2 text-sm text-subtle">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-ivory hover:bg-black"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <section className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
            {slides.length > 0 ? (
              <>
                {/* Controls: search, then Filter and Sort, as on the recruiting dashboard */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                  {/* Search: a visible label, since a placeholder alone vanishes on input */}
                  <div className="flex-1 sm:max-w-sm">
                    <label htmlFor="slide-search" className="mb-1.5 block text-sm text-subtle">
                      Search slides
                    </label>
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/40" aria-hidden />
                      <input
                        id="slide-search"
                        type="search"
                        placeholder="Title, description, or topic"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-10 w-full rounded-lg border border-line bg-card pl-9 pr-3 text-sm text-ink placeholder:text-ink/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FilterMenu
                      value={filter}
                      options={options}
                      total={slides.length}
                      resultCount={(draft) => filterSlides(slides, draft, search).length}
                      onApply={setFilter}
                    />
                    <SortMenu value={sort} onChange={setSort} />
                  </div>
                </div>

                {chips.length > 0 && (
                  <ul className="mt-4 flex flex-wrap items-center gap-2" aria-label="Active filters">
                    {chips.map((chip) => (
                      <li key={`${chip.field}-${chip.key}`}>
                        <button
                          type="button"
                          onClick={() => removeChip(chip.field, chip.key)}
                          aria-label={`Remove filter: ${chip.label}`}
                          className="inline-flex min-h-9 items-center gap-2 rounded-full bg-tan px-3.5 text-sm text-ink hover:bg-peach"
                        >
                          {chip.label}
                          <FaTimes aria-hidden className="h-2.5 w-2.5 text-subtle" />
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        type="button"
                        onClick={() => setFilter(EMPTY_FILTER)}
                        className="min-h-9 px-2 text-sm text-primary underline underline-offset-4"
                      >
                        Clear all
                      </button>
                    </li>
                  </ul>
                )}

                {/* Semester sections: a heading and a short gap between each run of decks */}
                {groups.length > 0 ? (
                  <div className="mt-8 flex flex-col gap-12 sm:mt-10 sm:gap-14">
                    {groups.map((group) => (
                      <section key={group.semester.key} aria-labelledby={`sem-${group.semester.key}`}>
                        <h2 id={`sem-${group.semester.key}`} className="text-2xl md:text-3xl">
                          {group.semester.label}
                        </h2>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                          {group.slides.map((slide) => (
                            <SlideCard key={slide.id} slide={slide} />
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                ) : (
                  <div className="mt-8 rounded-xl bg-card p-8 text-center">
                    <p className="text-subtle">No slides match these filters.</p>
                    <button
                      type="button"
                      onClick={resetAll}
                      className="mt-3 text-sm text-primary underline underline-offset-4"
                    >
                      Show all slides
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-xl bg-card p-8 text-center">
                <FaSlideshare className="mx-auto h-12 w-12 text-ink/20" />
                <p className="mt-4 text-subtle">
                  No slides yet! Check back after our next meeting.
                </p>
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
