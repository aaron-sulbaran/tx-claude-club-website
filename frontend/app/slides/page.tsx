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
} from "react-icons/fa";
import { fetchSlides, SlideEntry, getThumbnailUrl } from "../lib/slides";

function TopicBadge({ topic }: { topic: string }) {
  if (!topic) return null;
  return (
    <span className="inline-block rounded-[4px] bg-tan px-2 py-0.5 text-xs font-medium text-ink">
      {topic}
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
      className="group flex flex-col overflow-hidden rounded-[4px] border border-line bg-card transition-all hover:border-primary/30"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ivory">
        {showThumbnail ? (
          <img
            src={thumbnail}
            alt={`Thumbnail for ${slide.title}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FaSlideshare className="h-10 w-10 text-ink/15 sm:h-12 sm:w-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute right-2 top-2 rounded-[4px] bg-card/90 p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
          <FaExternalLinkAlt className="h-3 w-3 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-ink line-clamp-2 sm:text-base">
            {slide.title}
          </h3>
        </div>
        <p className="mt-1 text-xs text-subtle sm:text-sm">
          {slide.date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        {slide.description && (
          <p className="mt-2 text-xs text-subtle line-clamp-2 sm:text-sm">
            {slide.description}
          </p>
        )}
        {slide.topic && (
          <div className="mt-3">
            <TopicBadge topic={slide.topic} />
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
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
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

  // Collect unique topics
  const topics = useMemo(() => {
    const set = new Set<string>();
    slides.forEach((s) => {
      if (s.topic) set.add(s.topic);
    });
    return ["All", ...Array.from(set).sort()];
  }, [slides]);

  // Filter slides
  const filtered = useMemo(() => {
    return slides.filter((s) => {
      const matchesTopic = selectedTopic === "All" || s.topic === selectedTopic;
      const matchesSearch =
        !search ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      return matchesTopic && matchesSearch;
    });
  }, [slides, selectedTopic, search]);

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
            <div className="rounded-[4px] border border-line bg-tan p-6 text-center">
              <FaExclamationTriangle className="mx-auto h-8 w-8 text-ink" />
              <h3 className="mt-3 font-semibold text-ink">
                The slides didn’t load
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

        {/* Content */}
        {!loading && !error && (
          <section className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
            {slides.length > 0 ? (
              <>
                {/* Filters */}
                <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
                  {/* Search */}
                  <div className="relative flex-1 sm:max-w-xs">
                    <FaSearch className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/40" />
                    <input
                      type="text"
                      placeholder="Search slides..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-[4px] border border-line bg-card py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Topic chips */}
                  {topics.length > 1 && (
                    <div className="flex flex-wrap gap-2">
                      {topics.map((topic) => (
                        <button
                          key={topic}
                          onClick={() => setSelectedTopic(topic)}
                          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors sm:text-sm ${
                            selectedTopic === topic
                              ? "bg-ink text-ivory"
                              : "border border-line bg-card text-ink hover:bg-tan"
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Grid */}
                {filtered.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    {filtered.map((slide) => (
                      <SlideCard key={slide.id} slide={slide} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[4px] border border-line bg-card p-8 text-center">
                    <p className="text-subtle">
                      No slides match your search. Try a different filter.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-[4px] border border-line bg-card p-8 text-center">
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
