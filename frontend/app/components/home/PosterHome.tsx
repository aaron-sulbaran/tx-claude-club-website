import Image from "next/image";
import Link from "next/link";
import MeetingDetails from "./MeetingDetails";
import Wordmark from "../Wordmark";
import TileWall from "./TileWall";
import { MEMBERSHIP_FORM_URL } from "../../lib/membership";

// Poster: the homepage reads like the club's own Instagram posts. The hero is
// the end card (clay field, tower and sun, wordmark), and each perk is a small
// poster: one flat pastel field, one hand-drawn illustration, words below.

// Each perk opens the part of the site that explains it: the About sections,
// or the hackathon archive, which already tells that story.
const PERKS = [
  { title: "Free Claude", body: "Claude Pro, API credits, and merch.", art: "grid", field: "bg-peach", href: "/about#free-claude" },
  { title: "Community", body: "Students across majors who build with AI.", art: "flowers", field: "bg-cactus", href: "/about#community" },
  { title: "Hackathons", body: "Build in a day, win prizes.", art: "lightning", field: "bg-heather", href: "/hackathon" },
  { title: "Workshops", body: "Hands-on sessions for every skill level.", art: "lightbulb", field: "bg-tan", href: "/about#workshops" },
];

export default function PosterHome() {
  return (
    <main className="text-ink">
      <section className="bg-clay">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 sm:px-8 md:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 lg:py-20">
          <div className="mx-auto w-48 sm:w-60 lg:w-full lg:max-w-[26rem]">
            <Image
              src="/images/UT%20CBC%20Logos/CBCLogo_ClaudeSun.png"
              alt="Claude Builder Club logo: the UT Tower under the Claude sun"
              width={1080}
              height={1080}
              priority
              sizes="(max-width: 1024px) 240px, 420px"
              className="h-auto w-full"
            />
          </div>
          <div>
            {/* COPY: Aaron. The lockup mirrors the Figma end card: white wordmark, ink handle. */}
            <h1 className="fade-in-hero text-white">
              <span className="hidden lg:block">
                <Wordmark size={3} handleClassName="text-ink" />
              </span>
              <span className="hidden justify-center sm:flex lg:hidden">
                <Wordmark size={2.4} align="center" handleClassName="text-ink" />
              </span>
              <span className="flex justify-center sm:hidden">
                <Wordmark size={1.55} align="center" handleClassName="text-ink" />
              </span>
            </h1>
            <div className="fade-in-hero mx-auto mt-8 max-w-md rounded-xl bg-card p-5 [--fade-delay:0.2s] lg:mx-0">
              <MeetingDetails />
              <a
                href={MEMBERSHIP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center rounded-lg bg-ink px-6 py-3 text-base font-medium text-ivory transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Join the club
              </a>
              <Link
                href="/events"
                className="mt-3 block text-center text-[15px] underline underline-offset-4 hover:text-primary"
              >
                See all events
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end md:gap-16">
          <div>
            <p className="section-label text-primary">Who we are</p>
            {/* COPY: Aaron. */}
            <h2 className="mt-3 text-3xl leading-[1.1] md:text-5xl" style={{ fontWeight: 350 }}>
              A student club at UT Austin for anyone who wants to build with Claude
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-subtle">
            Every month we run workshops, demos, and hackathons, backed by Anthropic. Come to a
            meeting, build something, and meet the people building alongside you.
          </p>
        </div>

        <h2 className="mt-16 text-3xl md:mt-24 md:text-4xl">What you get</h2>
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
          {PERKS.map((perk) => (
            <li key={perk.title}>
              <Link
                href={perk.href}
                className="hover-fade group block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                <div className={`flex aspect-[4/5] items-center justify-center rounded-xl ${perk.field}`}>
                  <Image
                    src={`/images/claude-icons/${perk.art}.png`}
                    alt=""
                    width={512}
                    height={512}
                    sizes="(max-width: 1024px) 30vw, 160px"
                    className="h-auto w-3/5"
                  />
                </div>
                <h3 className="mt-3 text-xl">{perk.title}</h3>
                <p className="mt-1 text-[15px] text-subtle">{perk.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <TileWall />

      <section className="bg-tan">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-12 sm:flex-row sm:items-center sm:gap-10 sm:px-8 md:py-16">
          <Image
            src="/images/claude-icons/hands.png"
            alt=""
            width={512}
            height={512}
            sizes="112px"
            className="h-24 w-24 shrink-0 sm:h-28 sm:w-28"
          />
          <div>
            <h2 className="text-2xl md:text-3xl">Partner with us</h2>
            <p className="mt-2 max-w-xl">
              Want to work with the club on an event around Austin? Email{" "}
              <a href="mailto:claudeattexas@gmail.com" className="underline underline-offset-2">
                claudeattexas@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
