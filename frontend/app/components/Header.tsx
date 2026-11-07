"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Events", href: "/events" },
  { label: "Hackathons", href: "/hackathon" },
  { label: "Slides", href: "/slides" },
  { label: "Links", href: "/links" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/15 bg-ivory">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="group flex items-center gap-2" aria-label="Claude Builder Club at UT Austin, home">
          <Image
            src="/images/claude_logo.svg"
            alt=""
            width={28}
            height={28}
            className="h-6 w-6 transition-transform duration-300 ease-out group-hover:rotate-12 sm:h-7 sm:w-7"
          />
          <span className="font-display text-lg leading-none text-ink sm:text-xl">
            <span className="font-semibold">Claude</span> Builder Club{" "}
            <span className="italic text-subtle">@ut austin</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-[15px] text-ink md:flex lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-ink transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-[4px] text-ink transition-colors hover:bg-tan md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <FaTimes className="h-5 w-5" />
          ) : (
            <FaBars className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`grid transition-all duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-ink/15 bg-ivory px-5 pb-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-[4px] px-3 py-3 text-base text-ink transition-colors hover:bg-tan"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

    </header>
  );
}
