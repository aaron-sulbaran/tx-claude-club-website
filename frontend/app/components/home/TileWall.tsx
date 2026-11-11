"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

// Modeled on the intro of Anthropic's 2026 Public Benefit Report (anthropic.com
// homepage), rebuilt with DOM tiles instead of a canvas:
//   1. The frame grows from an inset card to full bleed as it scrolls in
//      (CSS scroll-driven animation, see .tile-wall-frame in globals.css).
//   2. On entering view, tiles pop in clustered at the center, staggered by
//      their distance from it (ease-out-cubic, 0.75s).
//   3. They fly outward to a ring around the copy (ease-in-out-cubic).
//   4. The copy fades in last (opacity 1s, cubic-bezier(.33,1,.68,1)), then
//      the tiles drift gently.
// Reduced motion: everything renders in its final state. Research notes:
// docs/research/inspiration/anthropic.md.

type Placement = { left: number; top: number; width: number };
type Tile = {
  src: string;
  alt: string;
  aspect: number;
  /** Pastel field for the hand-drawn illustrations; photos fill edge to edge. */
  field?: string;
  desktop: Placement;
  mobile?: Placement;
};

// Stage aspect ratios (width / height). Positions are percentages of the
// stage, widths are percentages of its width.
const DESKTOP_ASPECT = 16 / 9;
const MOBILE_ASPECT = 3 / 4.4;

const TILES: Tile[] = [
  { src: "/images/GM1.jpg", alt: "Students at a general meeting", aspect: 4 / 3, desktop: { left: 3, top: 6, width: 19 }, mobile: { left: 4, top: 4, width: 54 } },
  { src: "/images/claude-icons/grid.png", alt: "", aspect: 1, field: "bg-peach", desktop: { left: 24.5, top: 3, width: 10 }, mobile: { left: 62, top: 3, width: 22 } },
  { src: "/hackathon/2026/meta-harness/Meta Harness Thumbnail.png", alt: "Meta-Harness, a spring hackathon winner", aspect: 16 / 9, desktop: { left: 39, top: 3, width: 15 } },
  { src: "/images/claude-icons/lightning.png", alt: "", aspect: 1, field: "bg-heather", desktop: { left: 61, top: 2, width: 10 }, mobile: { left: 76, top: 19.5, width: 18 } },
  { src: "/images/hackathonwinners.jpg", alt: "Spring 2026 hackathon winners on stage", aspect: 4 / 3, desktop: { left: 76, top: 5, width: 19 } },
  { src: "/images/claude-icons/hands.png", alt: "", aspect: 1, desktop: { left: 4, top: 41, width: 8 } },
  { src: "/hackathon/2026/neurodesign/Neurodesign Thumbnail.jpg", alt: "NeuroDesign, a spring hackathon winner", aspect: 16 / 9, desktop: { left: 86, top: 39, width: 12 } },
  { src: "/images/tabling.jpg", alt: "Club members tabling on campus", aspect: 4 / 3, desktop: { left: 2, top: 61, width: 16 }, mobile: { left: 42, top: 67, width: 54 } },
  { src: "/images/claude-icons/flowers.png", alt: "", aspect: 1, field: "bg-cactus", desktop: { left: 20.5, top: 69, width: 10 }, mobile: { left: 6, top: 68, width: 22 } },
  { src: "/images/GM2.jpg", alt: "A full room at a general meeting", aspect: 4 / 3, desktop: { left: 40, top: 76, width: 14 } },
  { src: "/images/claude-icons/lightbulb.png", alt: "", aspect: 1, field: "bg-tan", desktop: { left: 63, top: 73, width: 9.5 }, mobile: { left: 18, top: 84, width: 18 } },
  { src: "/hackathon/2026/side-quest/SideQuest Thumbnail.png", alt: "Side Quest, a spring hackathon winner", aspect: 16 / 9, desktop: { left: 78, top: 61, width: 18 } },
];

function placementVars(p: Placement, stageAspect: number, tileAspect: number, suffix: string) {
  const heightPct = (p.width * stageAspect) / tileAspect;
  const dx = 50 - (p.left + p.width / 2);
  const dy = 50 - (p.top + heightPct / 2);
  return {
    [`--l${suffix}`]: `${p.left}%`,
    [`--t${suffix}`]: `${p.top}%`,
    [`--w${suffix}`]: `${p.width}%`,
    [`--dx${suffix}`]: dx,
    [`--dy${suffix}`]: dy,
    [`--dist${suffix}`]: Math.min(1, Math.hypot(dx, dy) / 60),
  };
}

type Phase = "idle" | "pop" | "ring" | "done";

export default function TileWall() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const timers: number[] = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reduced) {
          setPhase("done");
          return;
        }
        setPhase("pop");
        timers.push(window.setTimeout(() => setPhase("ring"), 1400));
        timers.push(window.setTimeout(() => setPhase("done"), 2300));
      },
      { threshold: 0.45 }
    );
    observer.observe(stage);
    return () => {
      observer.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <section className="tile-wall-frame mt-16 bg-[#f5f4ed] md:mt-24">
      <div
        ref={stageRef}
        data-phase={phase}
        className="tile-wall relative mx-auto aspect-[3/4.4] max-w-6xl md:aspect-[16/9]"
      >
        {TILES.map((tile, index) => {
          const vars = {
            ...placementVars(tile.desktop, DESKTOP_ASPECT, tile.aspect, "d"),
            ...(tile.mobile ? placementVars(tile.mobile, MOBILE_ASPECT, tile.aspect, "m") : {}),
            "--aspect": tile.aspect,
            "--drift-delay": `${-index * 0.7}s`,
          } as CSSProperties;
          return (
            <div
              key={tile.src}
              className={`tile-wall-tile ${tile.mobile ? "" : "max-md:hidden"}`}
              style={vars}
            >
              <div className={`relative h-full w-full overflow-hidden rounded-lg ${tile.field ?? "bg-stone"}`}>
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className={tile.field ? "object-contain p-[14%]" : "object-cover"}
                />
              </div>
            </div>
          );
        })}

        <div className="tile-wall-copy absolute inset-x-[8%] top-1/2 -translate-y-1/2 text-center md:inset-x-[30%]">
          {/* COPY: Aaron. Facts from the spring 2026 hackathon page. */}
          <p className="section-label text-primary">Spring 2026</p>
          <h2 className="mt-3 text-3xl leading-[1.08] md:text-5xl">About 100 students built with Claude in one day</h2>
          <Link
            href="/hackathon/2026"
            className="mt-3 inline-block py-2 text-[15px] underline underline-offset-4 hover:text-primary"
          >
            See the winners
          </Link>
        </div>
      </div>
    </section>
  );
}
