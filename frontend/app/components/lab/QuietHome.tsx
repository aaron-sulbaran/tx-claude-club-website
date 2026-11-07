import Image from "next/image";
import Link from "next/link";
import MeetingDetails from "./MeetingDetails";
import { MEMBERSHIP_FORM_URL } from "../../lib/membership";

// Quiet: the subtract-first direction. One column of intent: who we are,
// one way to join, when we meet. No embedded form, no icon tiles, no marquee.

const PHOTOS = [
  { src: "/images/GM1.jpg", alt: "Students at a general meeting" },
  { src: "/images/hackathonwinners.jpg", alt: "Spring 2026 hackathon winners on stage" },
  { src: "/images/tabling.jpg", alt: "Club members tabling on campus" },
];

const PERKS = [
  { title: "Free Claude", body: "Access to Claude Pro, API credits, and merch." },
  { title: "Hackathons", body: "Compete and win prizes." },
  { title: "Community", body: "Students across majors who build with AI." },
  { title: "Workshops", body: "Hands-on sessions for every skill level." },
];

export default function QuietHome() {
  return (
    <main className="text-[var(--kit-ink)]">
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-12 sm:px-8 md:pt-20 lg:grid-cols-[1fr_22rem] lg:gap-20 lg:pb-24">
        <div className="max-w-xl">
          {/* COPY: Aaron. Placeholder is the club's name, not a tagline. */}
          <h1 className="text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
            Claude Builder Club at UT Austin
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--kit-gray)]">
            Join a community of builders exploring, creating, and shipping with Claude. Workshops,
            hackathons, and demos every month.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={MEMBERSHIP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-[var(--kit-ink)] px-6 py-3 text-base font-medium text-[var(--kit-ivory)] transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kit-ink)]"
            >
              Join the club
            </a>
            <Link href="/events" className="text-base underline underline-offset-4 hover:text-[var(--color-primary)]">
              See all events
            </Link>
          </div>
        </div>
        <div className="lg:pt-3">
          <MeetingDetails tone="quiet" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PHOTOS.map((photo) => (
            <div key={photo.src} className="relative aspect-[4/3] overflow-hidden rounded-md bg-[var(--kit-line)]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <h2 className="text-2xl md:text-3xl">What you get</h2>
        <dl className="mt-6 grid gap-x-12 sm:grid-cols-2">
          {PERKS.map((perk) => (
            <div key={perk.title} className="border-t border-[var(--kit-line)] py-4">
              <dt className="text-lg font-medium">{perk.title}</dt>
              <dd className="mt-1 text-[var(--kit-gray)]">{perk.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl border-t border-[var(--kit-line)] px-5 py-12 sm:px-8 md:py-16">
        <h2 className="text-2xl">Partner with us</h2>
        <p className="mt-3 max-w-2xl text-[var(--kit-gray)]">
          Want to work with the club on an event around Austin? Email{" "}
          <a href="mailto:claudeattexas@gmail.com" className="text-[var(--kit-ink)] underline underline-offset-2">
            claudeattexas@gmail.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
