import Link from "next/link";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between">
        <Wordmark size={1.35} handleClassName="text-ivory/80" />

        <div className="flex flex-col gap-3 text-sm md:items-end">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a
              href="https://www.instagram.com/texasclaude"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              Instagram
            </a>
            <a href="mailto:claudeattexas@gmail.com" className="underline-offset-4 hover:underline">
              Email
            </a>
            <Link href="/links" className="underline-offset-4 hover:underline">
              All links
            </Link>
          </div>
          <div className="flex items-center gap-2 text-ivory/80">
            <span>Backed by</span>
            <a href="https://www.anthropic.com" target="_blank" rel="noopener noreferrer" aria-label="Anthropic">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/Anthropic_Logo.svg" alt="Anthropic" className="h-3 w-auto brightness-0 invert" />
            </a>
          </div>
          <p className="text-ivory/60">&copy; {new Date().getFullYear()} Texas Claude Builder Club</p>
        </div>
      </div>
    </footer>
  );
}
