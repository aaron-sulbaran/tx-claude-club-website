import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import Link from "next/link";

export default function HackathonsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 text-ink">
        <PageHeader
          title="Hackathons"
          intro="We host hackathons where UT Austin students build real things with Claude in a single day. More events are in the works."
          field="heather"
          art="lightning"
        />

        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-[14rem_1fr] md:gap-16 md:py-20">
          <h2 className="text-2xl md:text-3xl">Coming up</h2>
          <div className="max-w-xl">
            <p className="text-lg leading-relaxed">
              We&apos;re already planning the next one. Keep an eye on our events page for
              announcements, dates, and registration.
            </p>
            <Link
              href="/events"
              className="mt-6 inline-flex items-center rounded-lg bg-ink px-6 py-3 font-medium text-ivory transition-colors hover:bg-black"
            >
              See upcoming events
            </Link>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 border-t border-line px-5 py-14 sm:px-8 md:grid-cols-[14rem_1fr] md:gap-16 md:py-20">
          <div>
            <h2 className="text-2xl md:text-3xl">Past hackathons</h2>
            <p className="mt-2 text-subtle">The projects, winners, and work from our previous events.</p>
          </div>
          {/* Two cards per row only from lg: at md the section is already two columns, and a
              half-width card there (about 200 px at 768) clipped the lockup. */}
          <ul className="grid gap-5 lg:grid-cols-2">
            <li>
              <Link
                href="/hackathon/2026"
                className="hover-fade group flex h-full flex-col overflow-hidden rounded-xl bg-card"
              >
                {/* Event lockup from the club Figma file (page "Hooked on Claude: hook 'em hand",
                    option 1C): the hook 'em hand with the fingers spread into horns, holding up the
                    Claude spark, then the name in display italic. The mark stands about one and a
                    half times the height of the two lines, as in the Figma frame. */}
                {/* Sized in container units (cqw) so the lockup keeps the Figma proportions at
                    any card width. */}
                <div className="@container bg-heather">
                  <div className="flex aspect-[16/9] items-center justify-center gap-[5.5cqw]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/hackathon/2026/hooked-on-claude-hookem.svg"
                      alt=""
                      width={330}
                      height={398}
                      className="h-[31cqw] w-auto"
                    />
                    <span className="font-display text-[11.5cqw] leading-[0.92] tracking-[-0.02em] italic">
                      Hooked on
                      <br />
                      Claude
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm text-subtle">Spring 2026, April 4 at UT Austin</p>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed">
                    Our first hackathon. About 100 attendees, 5 award categories, 6.5 hours of
                    building time, and some of the most creative Claude-powered projects we&apos;ve
                    seen.
                  </p>
                  <span className="mt-4 text-primary underline underline-offset-4 group-hover:text-primary-dark">
                    See the winners
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
