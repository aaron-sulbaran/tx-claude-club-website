import Image from "next/image";
import type { ReactNode } from "react";

// Every inner page opens like one of the club's posts: one flat pastel
// field, one hand-drawn illustration, the title in Newsreader.
export type PosterField = "peach" | "heather" | "cactus" | "tan";
export type PosterArt = "flowers" | "grid" | "hands" | "lightbulb" | "lightning" | "shapes" | "horns";

// The hand-drawn set is square PNGs; "horns" is the Hooked on Claude event mark (wide SVG).
const ART: Record<PosterArt, { src: string; width: number; height: number }> = {
  flowers: { src: "/images/claude-icons/flowers.png", width: 512, height: 512 },
  grid: { src: "/images/claude-icons/grid.png", width: 512, height: 512 },
  hands: { src: "/images/claude-icons/hands.png", width: 512, height: 512 },
  lightbulb: { src: "/images/claude-icons/lightbulb.png", width: 512, height: 512 },
  lightning: { src: "/images/claude-icons/lightning.png", width: 512, height: 512 },
  shapes: { src: "/images/claude-icons/shapes.png", width: 512, height: 512 },
  horns: { src: "/hackathon/2026/hooked-on-claude-horns.svg", width: 312, height: 212 },
};

const FIELD_CLASS: Record<PosterField, string> = {
  peach: "bg-peach",
  heather: "bg-heather",
  cactus: "bg-cactus",
  tan: "bg-tan",
};

export default function PageHeader({
  eyebrow,
  title,
  intro,
  field,
  art,
  children,
}: {
  /** Section label above the title, as in Anthropic's decks. Only when the title isn't the section name. */
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  field: PosterField;
  art: PosterArt;
  children?: ReactNode;
}) {
  return (
    <section className={FIELD_CLASS[field]}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-10 sm:px-8 sm:py-14 md:py-16">
        <div className="max-w-2xl">
          {eyebrow && <p className="section-label mb-3 text-primary">{eyebrow}</p>}
          <h1 className="text-4xl leading-[1.05] text-ink sm:text-5xl md:text-6xl">{title}</h1>
          {intro && <p className="mt-4 max-w-xl text-base text-ink sm:text-lg">{intro}</p>}
          {children}
        </div>
        <Image
          src={ART[art].src}
          alt=""
          width={ART[art].width}
          height={ART[art].height}
          priority
          sizes="(max-width: 640px) 80px, 176px"
          className="h-20 w-auto shrink-0 sm:h-36 md:h-44"
        />
      </div>
    </section>
  );
}
