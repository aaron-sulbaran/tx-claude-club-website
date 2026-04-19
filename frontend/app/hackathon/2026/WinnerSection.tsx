"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { FaGithub, FaPlay, FaLinkedin } from "react-icons/fa";

export type TeamMember = {
  name: string;
  /** LinkedIn profile URL — if set the name becomes a clickable link */
  linkedin?: string;
};

export type WinnerData = {
  track: string;
  icon: ReactNode;
  project: string;
  team: TeamMember[];
  description: string;
  /** Path relative to /public, e.g. "/hackathon/2026/side-quest/photo.jpg" */
  image?: string;
  /** External demo link — YouTube, Loom, or Google Drive */
  demoUrl?: string;
  /** GitHub repo URL */
  github?: string;
  /** CSS gradient shown when no image is set */
  placeholderGradient: string;
};

export function WinnerSection({
  winner,
  index,
}: {
  winner: WinnerData;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const isReversed = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        transitionDelay: "0.05s",
      }}
      className={`relative flex flex-col md:min-h-[80vh] ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* ---- Media panel ---- */}
      <div className="relative min-h-[280px] w-full overflow-hidden sm:min-h-[360px] md:min-h-0 md:w-[58%]">
        {/* Index number */}
        <span
          className="absolute left-6 top-6 z-10 select-none font-mono text-xs font-bold tracking-[0.3em] text-white/40"
          aria-hidden
        >
          {num}
        </span>

        {winner.image ? (
          <Image
            src={winner.image}
            alt={`${winner.project} — team or product photo`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 58vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: winner.placeholderGradient }}
          >
            <div
              className="text-white/10"
              style={{ fontSize: "clamp(4rem, 12vw, 10rem)", lineHeight: 1 }}
              aria-hidden
            >
              {winner.icon}
            </div>
          </div>
        )}

        {/* Gradient scrim for badge legibility */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Award badge */}
        <div
          className={`absolute bottom-6 z-10 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-md ${
            isReversed ? "left-6" : "right-6"
          }`}
        >
          <span className="text-[var(--color-primary-light)] [&>svg]:h-3.5 [&>svg]:w-3.5">
            {winner.icon}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
            {winner.track}
          </span>
        </div>
      </div>

      {/* ---- Text panel ---- */}
      <div
        className={`flex w-full flex-col justify-center bg-[var(--color-surface)] md:w-[42%] ${
          isReversed ? "md:items-end" : "md:items-start"
        }`}
      >
        <div
          className={`mx-auto w-full max-w-sm px-6 py-10 sm:px-8 sm:py-12 md:mx-0 md:max-w-none md:px-14 md:py-16 ${
            isReversed ? "md:text-right" : "md:text-left"
          }`}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]/70">
            {winner.track}
          </p>

          <h3 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[var(--color-foreground)] sm:text-4xl md:text-5xl">
            {winner.project}
          </h3>

          <p className={`mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm tracking-wide text-[var(--color-foreground)]/45 ${isReversed ? "md:justify-end" : "md:justify-start"}`}>
            {winner.team.map((member, i) => (
              <span key={member.name} className="inline-flex items-center gap-1">
                {i > 0 && <span aria-hidden>·</span>}
                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--color-foreground)]/55 underline-offset-2 transition-colors hover:text-[var(--color-primary)] hover:underline"
                  >
                    {member.name}
                    <FaLinkedin className="h-3 w-3 opacity-60" />
                  </a>
                ) : (
                  <span>{member.name}</span>
                )}
              </span>
            ))}
          </p>

          <div
            className={`mt-7 h-px w-10 bg-[var(--color-primary)]/40 ${
              isReversed ? "md:ml-auto" : "mr-auto"
            }`}
          />

          <p className="mt-6 text-sm leading-[1.75] text-[var(--color-foreground)]/65 sm:text-[15px]">
            {winner.description}
          </p>

          <div
            className={`mt-9 flex flex-wrap gap-3 ${
              isReversed ? "md:justify-end" : "md:justify-start"
            }`}
          >
            {winner.demoUrl && (
              <a
                href={winner.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[var(--color-primary-dark)] hover:shadow-md active:scale-[0.97]"
              >
                <FaPlay className="h-2.5 w-2.5" />
                Watch Demo
              </a>
            )}
            {winner.github && (
              <a
                href={winner.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-foreground)]/15 px-5 py-2.5 text-sm font-semibold text-[var(--color-foreground)]/60 transition-all hover:border-[var(--color-foreground)]/30 hover:text-[var(--color-foreground)] active:scale-[0.97]"
              >
                <FaGithub className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
