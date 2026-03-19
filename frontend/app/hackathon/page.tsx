import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaLaptopCode, FaClock, FaTrophy, FaUsers, FaArrowRight, FaVideo } from "react-icons/fa";

const LUMA_RSVP_URL = "https://luma.com/xoaxsea5";
const JOTFORM_SIGNUP_URL = "https://www.jotform.com/253555944387168";
const PARTNER_EMAIL = "claudeattexas@gmail.com";

export default function HackathonPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-cream">
        {/* Hero Section */}
        <section className="bg-surface px-4 py-16 text-center sm:px-8 sm:py-20 md:py-24">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              Hooked on Claude Hackathon
            </h1>
            <p className="mt-4 text-base font-semibold text-primary sm:text-lg md:text-xl">
              Saturday, April 4th | 10:00 AM - 7:30 PM
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70 sm:mt-6 sm:text-base md:text-xl">
              Build anything. Solve real problems. All experience levels welcome.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={LUMA_RSVP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:px-8 sm:py-3 sm:text-base"
              >
                RSVP on Luma
              </a>
            </div>
          </div>
        </section>

        {/* What to Expect Section */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              What to Expect
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70 sm:mt-6 sm:text-base md:text-lg">
              This is a 9-hour hackathon where anyone, at any experience level, can join in and build a product that solves any problem. Teams or solo participants welcome. The goal is to ship something real in a single day.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-muted/20 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FaLaptopCode className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground sm:text-lg">Build Anything</h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground/70 sm:text-sm">
                No theme restrictions. Pick a problem you care about and build a solution using Claude.
              </p>
            </div>
            <div className="rounded-xl border border-muted/20 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FaUsers className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground sm:text-lg">All Levels Welcome</h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground/70 sm:text-sm">
                Whether you have never coded before or you ship software daily, there is a place for you here.
              </p>
            </div>
            <div className="rounded-xl border border-muted/20 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FaClock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground sm:text-lg">Ship in a Day</h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground/70 sm:text-sm">
                6.5 hours of focused building time. Enough to create something meaningful, short enough to stay energized.
              </p>
            </div>
            <div className="rounded-xl border border-muted/20 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FaTrophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground sm:text-lg">Win Prizes</h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground/70 sm:text-sm">
                $450+ in cash prizes across 5 categories, plus free Claude Pro and $25 in API credits for all CBC members.
              </p>
            </div>
          </div>
        </section>

        {/* Schedule & Timeline Section */}
        <section className="bg-surface/50 px-4 py-12 sm:px-8 sm:py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
              Schedule
            </h2>
            <div className="mt-10 space-y-6 sm:mt-12">
              {[
                { time: "10:00 AM", event: "Opening Ceremony" },
                { time: "10:30 AM", event: "Hacking Begins" },
                { time: "12:30 PM - 1:30 PM", event: "Lunch Served" },
                { time: "5:00 PM", event: "Submissions Due" },
                { time: "5:30 PM - 6:30 PM", event: "Judging" },
                { time: "7:00 PM - 7:30 PM", event: "Awards Ceremony" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2 border-l-[3px] border-primary/20 pl-4 sm:flex-row sm:items-center sm:gap-6 sm:pl-6">
                  <div className="w-44 flex-shrink-0 text-sm font-bold text-primary sm:text-base">
                    {item.time}
                  </div>
                  <div className="text-sm font-medium text-foreground sm:text-base md:text-lg">
                    {item.event}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-8 sm:py-16 md:py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Categories</h2>
            <p className="mt-3 text-sm text-foreground/70 sm:text-base">
              Submit your project to the general pool. Winners are selected per category.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Best Design / UX", desc: "The most polished, intuitive, and well-crafted user experience." },
              { name: "Most Technically Challenging", desc: "The project that pushed the boundaries of what is possible." },
              { name: "Most Creative", desc: "The most original idea or unexpected use of AI." },
              { name: "Most Startup-Ready", desc: "The project with the clearest path to becoming a real product." },
              { name: "Most Human-Centered", desc: "The project focused on safety, accessibility, or meaningfully helping people." },
            ].map((cat, i) => (
              <div key={i} className="rounded-xl bg-surface p-5 shadow-sm border border-muted/10">
                <h3 className="font-semibold text-foreground">{cat.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{cat.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm font-medium text-foreground/80 sm:mt-10 sm:text-base">
            <span className="text-primary font-bold">Prize pool: $450+ in cash prizes.</span> Final amounts per category TBD.
          </p>
        </section>

        {/* How to Prepare */}
        <section className="px-4 py-12 sm:px-8 sm:py-16 md:py-20 bg-primary text-white">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-2xl font-bold sm:text-3xl">How to Prepare</h2>
            
            <div className="mt-8 rounded-2xl bg-white/10 p-6 backdrop-blur-md sm:p-8">
              <h3 className="text-lg font-bold sm:text-xl">Claim Your Credits</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
                Every Texas CBC member gets <strong className="text-white">free Claude Pro</strong> and <strong className="text-white">$25 in API credits</strong> via the Claude Developer Console.
              </p>
              <div className="mt-4">
                <p className="text-sm font-medium sm:text-base">To claim your credits, you must attend a General Meeting before the hackathon:</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-white/90 sm:text-base">
                  <li>Tuesday, March 24th</li>
                  <li>Tuesday, March 31st</li>
                </ul>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <span className="text-sm font-medium sm:text-base">Not a member yet?</span>
                <a
                  href={JOTFORM_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
                >
                  Sign Up Here
                </a>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-bold sm:text-xl">Preparation Tips</h3>
              <ul className="mt-5 space-y-4 text-sm leading-relaxed text-white/90 sm:text-base">
                <li className="flex items-start gap-3">
                  <FaArrowRight className="mt-1.5 h-3.5 w-3.5 shrink-0 text-white/70" />
                  <span>Familiarize yourself with Claude&apos;s capabilities. Try the API, explore Claude Code, or just have a conversation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaArrowRight className="mt-1.5 h-3.5 w-3.5 shrink-0 text-white/70" />
                  <span>Think about problems you care about. The best hackathon projects come from genuine motivation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaArrowRight className="mt-1.5 h-3.5 w-3.5 shrink-0 text-white/70" />
                  <span>Find teammates early or plan to go solo. Both are totally fine.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section id="partners" className="bg-surface/50 px-4 py-12 sm:px-8 sm:py-16 md:py-20">
          <div className="mx-auto max-w-4xl rounded-2xl border border-primary/20 bg-surface p-8 shadow-sm sm:p-12">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Become a Partner</h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/70 sm:text-base md:text-lg">
              The Claude Hackathon brings together hundreds of UT Austin students spanning engineering, business, design, and the sciences to build AI-powered products in a single day. We are looking for partners who want to support the next generation of builders.
            </p>
            <div className="mt-8 text-sm text-foreground/80 sm:text-base">
              <p className="font-semibold text-foreground">How you can contribute:</p>
              <ul className="mt-3 list-inside list-disc space-y-2 text-foreground/70">
                <li>Sponsor prizes or provide additional API credits for participants</li>
                <li>Send representatives to judge projects and interact with student builders</li>
                <li>Provide mentorship or office hours during the event</li>
                <li>Get your brand in front of technically-minded UT Austin students</li>
              </ul>
            </div>
            <div className="mt-8">
              <a
                href={`mailto:${PARTNER_EMAIL}`}
                className="inline-flex items-center justify-center rounded-md border-2 border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white sm:px-8 sm:py-3 sm:text-base"
              >
                Interested? Reach out
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
