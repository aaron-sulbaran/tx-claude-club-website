import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { FaCalendarAlt, FaTrophy, FaArrowRight } from "react-icons/fa";

export default function HackathonsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-cream">
        {/* Hero */}
        <section className="border-b border-muted/20 bg-surface px-4 py-10 text-center sm:px-8 sm:py-16 md:py-20">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Hackathons
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-foreground/70 sm:mt-6 sm:text-base md:text-lg">
            We host hackathons where UT Austin students build real things with Claude in a single day. More events are in the works.
          </p>
        </section>

        {/* Coming soon */}
        <section className="px-4 py-10 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-surface p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <FaCalendarAlt className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              More hackathons coming soon
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/60 sm:text-base">
              We&apos;re already planning the next one. Keep an eye on our events page for announcements, dates, and registration.
            </p>
            <div className="mt-7">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:px-8 sm:py-3 sm:text-base"
              >
                See upcoming events
                <FaArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Past hackathons */}
        <section className="px-4 py-10 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <FaTrophy className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                Past hackathons
              </h2>
            </div>
            <p className="mt-2 text-sm text-foreground/60 sm:text-base">
              Explore the projects, winners, and work from our previous events.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Spring 2026 */}
              <Link href="/hackathon/2026" className="group block">
                <div className="flex h-full flex-col rounded-xl border border-muted/20 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      Spring 2026
                    </span>
                    <FaArrowRight className="h-3.5 w-3.5 text-foreground/30 transition-colors group-hover:text-primary" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground sm:text-lg">
                    Hooked on Claude
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-foreground/60 sm:text-sm">
                    Our first hackathon. ~100 attendees, 5 award categories, 6.5 hours of building time, and some of the most creative Claude-powered projects we&apos;ve seen.
                  </p>
                  <p className="mt-4 text-xs font-medium text-foreground/40">
                    April 4, 2026 · UT Austin
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
