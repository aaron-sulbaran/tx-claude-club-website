import type { ReactNode } from "react";
import Image from "next/image";
import { FaGithub, FaPlay, FaLinkedin } from "react-icons/fa";

export type TeamMember = {
  name: string;
  /** LinkedIn profile URL; if set, the name becomes a clickable link */
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
  /** External demo link: YouTube, Loom, or Google Drive */
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
  const isReversed = index % 2 === 1;

  return (
    <section
      className={`relative flex flex-col md:min-h-[70vh] ${
        isReversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {/* ---- Media panel ---- */}
      <div className="relative min-h-[280px] w-full overflow-hidden sm:min-h-[360px] md:min-h-0 md:w-[58%]">
        {winner.image ? (
          <Image
            src={winner.image}
            alt={`${winner.project}: team or product photo`}
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
      </div>

      {/* ---- Text panel ---- */}
      <div
        className={`flex w-full flex-col justify-center bg-card md:w-[42%] ${
          isReversed ? "md:items-end" : "md:items-start"
        }`}
      >
        <div
          className={`mx-auto w-full max-w-sm px-6 py-10 sm:px-8 sm:py-12 md:mx-0 md:max-w-none md:px-14 md:py-16 ${
            isReversed ? "md:text-right" : "md:text-left"
          }`}
        >
          <p className="text-primary">{winner.track}</p>

          <h3 className="mt-3 text-3xl leading-tight text-ink sm:text-4xl md:text-5xl">
            {winner.project}
          </h3>

          <p className={`mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-subtle ${isReversed ? "md:justify-end" : "md:justify-start"}`}>
            {winner.team.map((member) => (
              <span key={member.name} className="inline-flex items-center gap-1">
                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-ink underline decoration-line underline-offset-2 hover:decoration-ink"
                  >
                    {member.name}
                    <FaLinkedin className="h-3 w-3 opacity-60" aria-hidden />
                  </a>
                ) : (
                  <span>{member.name}</span>
                )}
              </span>
            ))}
          </p>

          <div
            className={`mt-7 h-0.5 w-10 bg-ink ${
              isReversed ? "md:ml-auto" : "mr-auto"
            }`}
          />

          <p className="mt-6 text-base leading-[1.7] text-ink">
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
                className="inline-flex items-center gap-2 rounded-[4px] bg-ink px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-black"
              >
                <FaPlay className="h-2.5 w-2.5" />
                Watch demo
              </a>
            )}
            {winner.github && (
              <a
                href={winner.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[4px] border-2 border-ink px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-tan"
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
