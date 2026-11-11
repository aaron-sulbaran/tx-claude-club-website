import Link from "next/link";

// The tower with rays from the club Figma banner (UT-CBC-Design-Logos, 1:120)
// rises out of the ink bar and is cut through the clock, so the clock reads
// as a half circle on the horizon. The clock's center sits at 65.3% of the
// drawing's height (y 255.8 of 392).
const TOWER_VISIBLE_FRACTION = 255.8 / 392;

export default function Footer() {
  return (
    <footer>
      <div className="flex justify-center overflow-hidden bg-clay pt-8 sm:pt-10" aria-hidden>
        <div
          className="relative w-[9.5rem] overflow-hidden sm:w-[12rem]"
          style={{ aspectRatio: `308 / ${392 * TOWER_VISIBLE_FRACTION}` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/brand/tower-rays.svg" alt="" className="absolute left-0 top-0 h-auto w-full" />
        </div>
      </div>

      <div className="bg-ink text-ivory">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-6 text-center text-sm sm:flex-row sm:justify-between sm:px-8 sm:text-left">
          <nav aria-label="Club links" className="flex gap-x-5">
            <a
              href="https://www.instagram.com/texasclaude"
              target="_blank"
              rel="noopener noreferrer"
              className="-my-3 py-3 underline-offset-4 hover:underline"
            >
              Instagram
            </a>
            <a href="mailto:claudeattexas@gmail.com" className="-my-3 py-3 underline-offset-4 hover:underline">
              Email
            </a>
            <Link href="/links" className="-my-3 py-3 underline-offset-4 hover:underline">
              All links
            </Link>
          </nav>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-ivory/60">
            <a
              href="https://www.anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="-my-3 flex items-center gap-1.5 py-3 hover:text-ivory"
            >
              Backed by
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/Anthropic_Logo.svg" alt="Anthropic" className="h-2 w-auto brightness-0 invert opacity-70" />
            </a>
            <span>&copy; {new Date().getFullYear()} Texas Claude Builder Club</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
