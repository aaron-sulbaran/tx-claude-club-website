"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { FaFilter, FaSort, FaTimes } from "react-icons/fa";
import {
  EMPTY_FILTER,
  activeCount,
  type FilterOptions,
  type FilterValue,
  type Option,
  type SortOrder,
} from "./slide-filters";

// The Slides page's Filter and Sort menus, after the recruiting dashboard on
// aaronsulbaran.com (itself after Stripe's filter popover and Goldman Sachs'
// filter sheet): a popover under its button on desktop, a bottom sheet on
// phones. Filter choices are staged and committed with Apply, each option shows
// its count, and the header states the result. Sort applies as it is picked.

function useNarrow(): boolean {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setNarrow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return narrow;
}

function Menu({
  label,
  align = "left",
  width,
  trigger,
  children,
}: {
  label: string;
  align?: "left" | "right";
  width: number;
  trigger: (props: { open: boolean; toggle: () => void }) => ReactNode;
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const narrow = useNarrow();
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const wasOpen = useRef(false);
  const close = () => setOpen(false);

  // When the panel closes with focus inside it, focus falls to the body; hand it
  // back to the button that opened the menu.
  useEffect(() => {
    if (wasOpen.current && !open && document.activeElement === document.body) {
      wrapRef.current?.querySelector<HTMLButtonElement>("button[aria-haspopup]")?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("input:not(:disabled), button:not(:disabled)")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: MouseEvent) => {
      if (!narrow && wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    const previousOverflow = document.body.style.overflow;
    if (narrow) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, narrow]);

  const body = open && (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal={narrow}
      aria-label={label}
      style={narrow ? undefined : { width }}
      className={
        narrow
          ? "relative flex max-h-[85dvh] w-full flex-col rounded-t-2xl bg-ivory shadow-[0_-20px_60px_-20px_rgba(20,20,19,0.45)]"
          : `absolute top-full z-40 mt-2 flex max-h-[70vh] flex-col rounded-xl border border-line bg-ivory shadow-[0_24px_60px_-20px_rgba(20,20,19,0.35)] ${
              align === "right" ? "right-0" : "left-0"
            }`
      }
    >
      {narrow && (
        <div className="flex items-center justify-between px-4 pt-2.5">
          <span aria-hidden className="h-1 w-10" />
          <span aria-hidden className="h-1 w-10 rounded-full bg-line" />
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="inline-flex h-10 w-10 items-center justify-end text-subtle hover:text-ink"
          >
            <FaTimes aria-hidden className="h-4 w-4" />
          </button>
        </div>
      )}
      {children(close)}
    </div>
  );

  return (
    <div ref={wrapRef} className="relative">
      {trigger({ open, toggle: () => setOpen((o) => !o) })}
      {body &&
        (narrow
          ? createPortal(
              <div
                className="fixed inset-0 z-50 flex items-end bg-ink/30"
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) close();
                }}
              >
                {body}
              </div>,
              document.body
            )
          : body)}
    </div>
  );
}

function MenuButton({
  open,
  toggle,
  active,
  children,
}: {
  open: boolean;
  toggle: () => void;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={toggle}
      aria-expanded={open}
      aria-haspopup="dialog"
      className={`inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors ${
        active ? "border-ink bg-ink text-ivory" : "border-line bg-card text-ink hover:bg-tan"
      }`}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------- Filter

export function FilterMenu({
  value,
  options,
  resultCount,
  total,
  onApply,
}: {
  value: FilterValue;
  options: FilterOptions;
  resultCount: (draft: FilterValue) => number;
  total: number;
  onApply: (next: FilterValue) => void;
}) {
  const active = activeCount(value);
  return (
    <Menu
      label="Filter slides"
      align="right"
      width={320}
      trigger={({ open, toggle }) => (
        <MenuButton open={open} toggle={toggle} active={active > 0}>
          <FaFilter aria-hidden className="h-3 w-3" />
          Filter
          {active > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ivory px-1.5 text-xs font-semibold tabular-nums text-ink">
              {active}
            </span>
          )}
        </MenuButton>
      )}
    >
      {(close) => (
        <FilterBody
          value={value}
          options={options}
          resultCount={resultCount}
          total={total}
          onApply={(next) => {
            onApply(next);
            close();
          }}
        />
      )}
    </Menu>
  );
}

// Mounted fresh on every open, so the draft always starts from what is applied.
function FilterBody({
  value,
  options,
  resultCount,
  total,
  onApply,
}: {
  value: FilterValue;
  options: FilterOptions;
  resultCount: (draft: FilterValue) => number;
  total: number;
  onApply: (next: FilterValue) => void;
}) {
  const [draft, setDraft] = useState<FilterValue>(value);
  // Ticking every option in a section is the same as ticking none: store none.
  const set = (field: keyof FilterValue, all: Option[]) => (keys: string[]) =>
    setDraft((d) => ({ ...d, [field]: keys.length === all.length ? [] : keys }));
  const count = resultCount(draft);

  return (
    <>
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 pb-3 pt-3.5">
        <div>
          <h2 className="text-xl">Filter slides</h2>
          <p className="mt-1 text-xs tabular-nums text-subtle">
            {count === total ? `All ${total} decks` : `${count} of ${total} decks`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDraft(EMPTY_FILTER)}
          disabled={activeCount(draft) === 0}
          className="min-h-10 rounded-full px-2 text-sm font-medium text-primary disabled:opacity-40"
        >
          Clear all
        </button>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto px-4 py-3.5">
        <Section label="Semester" options={options.semesters} selected={draft.semesters} onChange={set("semesters", options.semesters)} />
        <Section label="Meeting type" options={options.types} selected={draft.types} onChange={set("types", options.types)} />
        {options.topics.length > 0 && (
          <Section label="Topic" options={options.topics} selected={draft.topics} onChange={set("topics", options.topics)} />
        )}
      </div>

      <div className="border-t border-line p-3">
        <button
          type="button"
          onClick={() => onApply(draft)}
          className="min-h-11 w-full rounded-lg bg-ink text-sm font-medium text-ivory transition-colors hover:bg-black"
        >
          {count === 1 ? "Show 1 deck" : `Show ${count} decks`}
        </button>
      </div>
    </>
  );
}

// One section: a parent checkbox (all, some, none) and one row per option with
// its count. Nothing ticked means the section does not filter.
function Section({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: Option[];
  selected: string[];
  onChange: (keys: string[]) => void;
}) {
  const parentRef = useRef<HTMLInputElement>(null);
  const some = selected.length > 0 && selected.length < options.length;
  useEffect(() => {
    if (parentRef.current) parentRef.current.indeterminate = some;
  }, [some]);
  const toggle = (key: string) =>
    onChange(selected.includes(key) ? selected.filter((k) => k !== key) : [...selected, key]);

  return (
    <fieldset className="flex flex-col">
      <legend className="sr-only">{label}</legend>
      <Row>
        <input
          ref={parentRef}
          type="checkbox"
          checked={selected.length > 0 && !some}
          onChange={() => onChange(selected.length > 0 ? [] : options.map((o) => o.key))}
          className="h-4 w-4 accent-primary"
        />
        <span className="section-label flex-1 text-subtle">{label}</span>
      </Row>
      {options.map((option) => (
        <Row key={option.key} indent>
          <input
            type="checkbox"
            checked={selected.includes(option.key)}
            onChange={() => toggle(option.key)}
            className="h-4 w-4 accent-primary"
          />
          <span className="flex-1 text-sm text-ink">{option.label}</span>
          <span className="text-xs tabular-nums text-subtle">{option.count}</span>
        </Row>
      ))}
    </fieldset>
  );
}

function Row({ children, indent = false }: { children: ReactNode; indent?: boolean }) {
  return (
    <label className={`flex min-h-10 cursor-pointer items-center gap-3 ${indent ? "pl-7" : ""}`}>{children}</label>
  );
}

// ---------------------------------------------------------------- Sort

const SORT_LABELS: Record<SortOrder, string> = { newest: "Newest first", oldest: "Oldest first" };

export function SortMenu({ value, onChange }: { value: SortOrder; onChange: (next: SortOrder) => void }) {
  return (
    <Menu
      label="Sort slides"
      align="right"
      width={220}
      trigger={({ open, toggle }) => (
        <MenuButton open={open} toggle={toggle} active={false}>
          <FaSort aria-hidden className="h-3 w-3" />
          <span>
            Sort<span className="font-normal text-subtle">: {SORT_LABELS[value]}</span>
          </span>
        </MenuButton>
      )}
    >
      {(close) => (
        <fieldset className="flex flex-col px-4 py-3">
          <legend className="sr-only">Sort slides</legend>
          {(Object.keys(SORT_LABELS) as SortOrder[]).map((order) => (
            <Row key={order}>
              <input
                type="radio"
                name="slide-sort"
                checked={value === order}
                onChange={() => {
                  onChange(order);
                  close();
                }}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-sm text-ink">{SORT_LABELS[order]}</span>
            </Row>
          ))}
        </fieldset>
      )}
    </Menu>
  );
}
