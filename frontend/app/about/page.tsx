import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { MEMBERSHIP_FORM_URL } from "../lib/membership";

// One section per benefit, in the same order as the homepage tiles, which
// link here by id. Hackathons also has its own archive at /hackathon.
// COPY: Aaron. One or two sentences each, on purpose.
const WHAT_WE_DO = [
  {
    id: "free-claude",
    title: "Free Claude",
    art: "grid",
    field: "bg-peach",
    body: "Come to our general meetings to unlock the benefits Anthropic backs us with: Claude Pro, API credits to build real projects, and club merch as it comes in.",
    link: { label: "See upcoming meetings", href: "/events" },
  },
  {
    id: "community",
    title: "Community",
    art: "flowers",
    field: "bg-cactus",
    body: "Whether you've been coding for years or just started using AI, there's a place for you here. We're building a community of builders across every major at UT Austin.",
    link: { label: "Join the club", href: MEMBERSHIP_FORM_URL },
  },
  {
    id: "hackathons",
    title: "Hackathons",
    art: "lightning",
    field: "bg-heather",
    body: "One-day build sprints where teams ship something real with Claude and compete for prizes. Our spring 2026 hackathon drew about 100 students.",
    link: { label: "See past hackathons", href: "/hackathon" },
  },
  {
    id: "workshops",
    title: "Workshops",
    art: "lightbulb",
    field: "bg-tan",
    body: "Hands-on sessions where you build alongside us, from your first prompt to shipping an agent. Missed one? Slides from past workshops are on the Slides page.",
    link: { label: "Browse past slides", href: "/slides" },
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 text-ink">
        <PageHeader
          title="About the Claude Builder Club"
          intro="Empowering UT Austin students to build the future with AI"
          field="cactus"
          art="flowers"
        />

        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-[14rem_1fr] md:gap-16 md:py-20">
          <h2 className="text-2xl md:text-3xl">Our mission</h2>
          <div className="max-w-2xl">
            <p className="text-lg leading-relaxed">
              The Claude Builder Club at UT Austin is dedicated to fostering a community of students
              passionate about artificial intelligence. We provide hands-on experience with
              cutting-edge AI tools, connect students with industry opportunities, and create a
              space for innovation and collaboration.
            </p>
            <a
              href="https://www.anthropic.com/constitution"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-primary underline underline-offset-4 hover:text-primary-dark"
            >
              Read Anthropic&apos;s constitution for Claude
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-6xl border-t border-line px-5 py-14 sm:px-8 md:py-20">
          <h2 className="text-2xl md:text-3xl">What we do</h2>
          <div className="mt-8 divide-y divide-line">
            {WHAT_WE_DO.map((item) => {
              const external = item.link.href.startsWith("http");
              return (
                <article
                  key={item.id}
                  id={item.id}
                  className="grid scroll-mt-32 gap-5 py-8 first:pt-0 sm:grid-cols-[8rem_1fr] sm:gap-8 md:grid-cols-[14rem_1fr] md:gap-16"
                >
                  <div className={`flex aspect-square w-24 items-center justify-center rounded-xl sm:w-full md:w-40 ${item.field}`}>
                    <Image
                      src={`/images/claude-icons/${item.art}.png`}
                      alt=""
                      width={512}
                      height={512}
                      sizes="160px"
                      className="h-auto w-3/5"
                    />
                  </div>
                  <div className="max-w-xl self-center">
                    <h3 className="text-2xl md:text-3xl">{item.title}</h3>
                    <p className="mt-3 text-lg leading-relaxed text-subtle">{item.body}</p>
                    {external ? (
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-primary underline underline-offset-4 hover:text-primary-dark"
                      >
                        {item.link.label}
                      </a>
                    ) : (
                      <Link
                        href={item.link.href}
                        className="mt-4 inline-block text-primary underline underline-offset-4 hover:text-primary-dark"
                      >
                        {item.link.label}
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 border-t border-line px-5 py-14 sm:px-8 md:grid-cols-[14rem_1fr] md:gap-16 md:py-20">
          {/* The official Anthropic wordmark, drawn as a mask so it takes the ink color.
              Its capitals are sized to the serif's x-height, so the logo sits under
              "Backed by" without outweighing it. */}
          <h2 className="text-2xl md:text-3xl">
            Backed by
            <span
              role="img"
              aria-label="Anthropic"
              className="mt-[0.45em] block bg-current"
              style={{
                maskImage: "url(/images/Anthropic_Logo.svg)",
                WebkitMaskImage: "url(/images/Anthropic_Logo.svg)",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                height: "0.5em",
                aspectRatio: "1024.2 / 115",
              }}
            />
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed">
            As an official Claude Builder Club, we&apos;re proud to be supported by Anthropic, the
            creators of Claude. This partnership gives our members exclusive access to resources,
            tools, and opportunities to learn directly from industry leaders.
          </p>
        </section>

        <section className="bg-clay">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between md:py-16">
            <div>
              <h2 className="text-3xl md:text-4xl">Ready to join?</h2>
              <p className="mt-3 max-w-xl text-lg">
                Whether you&apos;re an AI enthusiast or just getting started, there&apos;s a place for
                you in the Texas Claude Builder Club.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={MEMBERSHIP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-ink px-6 py-3 font-medium text-ivory transition-colors hover:bg-black"
              >
                Join the club
              </a>
              <a href="/events" className="underline underline-offset-4">
                See upcoming events
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
