"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Wordmark from "./Wordmark";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Events", href: "/events" },
  { label: "Hackathons", href: "/hackathon" },
  { label: "Slides", href: "/slides" },
  { label: "Links", href: "/links" },
];

// The lockup is the club name (official Claude wordmark plus "Builder Club" in
// the display serif) with the university spelled out underneath in the body
// sans: two styles, each with one job.
// No hamburger: on phones the links move to their own row under the lockup.
export default function Header() {
  const pathname = usePathname();
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Each link pads to a ~45 px tap target (py-3) and gives the extra back (-my-2), so the rows
  // keep the height py-1 gave them; the underline sits at bottom-2 to stay under the text.
  const links = navLinks.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      aria-current={isCurrent(link.href) ? "page" : undefined}
      className="group relative -my-2 shrink-0 py-3 text-ink"
    >
      {link.label}
      <span
        className={`absolute bottom-2 left-0 h-px bg-ink transition-all duration-300 ease-out group-hover:w-full ${
          isCurrent(link.href) ? "w-full" : "w-0"
        }`}
      />
    </Link>
  ));

  return (
    <header className="sticky top-0 z-50 border-b border-ink/15 bg-ivory">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/claude_logo.svg"
            alt=""
            className="h-7 w-7 shrink-0 transition-transform duration-300 ease-out group-hover:rotate-12 sm:h-8 sm:w-8"
          />
          <span className="flex flex-col gap-1">
            {/* The official Claude wordmark sets "Claude" bold, as in the hero and the Figma lockups. */}
            <Wordmark showHandle={false} className="text-[1rem] text-ink sm:text-[1.1rem]" />
            <span className="text-[0.8125rem] leading-tight text-subtle">The University of Texas at Austin</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 text-[15px] md:flex lg:gap-8">
          {links}
        </nav>
      </div>

      <nav
        aria-label="Main"
        className="flex justify-between gap-3 overflow-x-auto border-t border-ink/10 px-5 py-2.5 text-[14px] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
      >
        {links}
      </nav>
    </header>
  );
}
