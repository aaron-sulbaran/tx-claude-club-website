import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { WinnerSection, type WinnerData, type TeamMember } from "./WinnerSection";
import {
  FaPalette,
  FaLaptopCode,
  FaLightbulb,
  FaRocket,
  FaHeart,
} from "react-icons/fa";

// ---------------------------------------------------------------------------
// To add media / links for a project:
//   image   — drop photo.jpg into /public/hackathon/2026/<slug>/
//             then set: image: "/hackathon/2026/<slug>/photo.jpg"
//   demoUrl — paste the YouTube, Loom, or Google Drive share link
//   github  — paste the GitHub repo URL
//   linkedin (per team member) — paste the linkedin.com/in/... profile URL
// ---------------------------------------------------------------------------

// Shorthand so each entry stays concise
const m = (name: string, linkedin?: string): TeamMember => ({ name, linkedin });

const winners: WinnerData[] = [
  {
    track: "Best Design / UX",
    icon: <FaPalette />,
    project: "Side Quest",
    team: [
      m("Trisha Nguyen" , "https://www.linkedin.com/in/trisha-nguyen1/"),
      m("Emily Han"     , "https://www.linkedin.com/in/emily-han-a766a5324/"),
    ],
    description:
      "Side Quest is the app that helps you discover things to do nearby, document these quests, and see what your friends are up to. Finish a quest by snapping a photo, then share it to your friends' feed and keep the memories.",
    image: "/hackathon/2026/side-quest/SideQuest Thumbnail.png",
    demoUrl: "https://drive.google.com/file/d/15dT_ly2bwZltgV0r0HY40y4M0qaEQHTa/view?usp=sharing",
    github: "https://github.com/409juice/claude-hackathon-spring-26",
    placeholderGradient:
      "linear-gradient(135deg, #e8935a 0%, #c15f3c 40%, #8b3a1e 100%)",
  },
  {
    track: "Most Technically Challenging",
    icon: <FaLaptopCode />,
    project: "Meta-Harness",
    team: [
      m("Reggie Kung"     , "https://www.linkedin.com/in/reggiekung/"),
      m("Atharv Mungale"  , "https://www.linkedin.com/in/atharv-mungale/"),
      m("Nischay Hegde"   , "https://www.linkedin.com/in/nischay-hegde-ba227b173/" ),
    ],
    description:
      "An agentic system with the ability to edit its own code to improve itself. Self-modifying, self-improving, and built in a day.",
    image: "/hackathon/2026/meta-harness/Meta Harness Thumbnail.png",
    demoUrl: "https://drive.google.com/file/d/151fNpAXExH1RVOmzYPIzJ6-O3emvf7w0/view?usp=sharing",
    github: "https://github.com/nischayhegde/metaharness",
    placeholderGradient:
      "linear-gradient(135deg, #1e293b 0%, #0f2942 50%, #020617 100%)",
  },
  {
    track: "Most Creative",
    icon: <FaLightbulb />,
    project: "NeuroDesign",
    team: [
      m("Rehan Mollick" , "https://www.linkedin.com/in/rehanmollick/" ),
    ],
    description:
      "NeuroDesign predicts how the human brain responds to your designs using Meta's TRIBE v2 fMRI model, then explains the differences with AI. Neuroscience-backed A/B testing, instant and free.",
    image: "/hackathon/2026/neurodesign/Neurodesign Thumbnail.jpg",
    demoUrl: "https://neurodesign-v2.vercel.app/",
    github: "https://github.com/rehanmollick/NeuroDesign",
    placeholderGradient:
      "linear-gradient(135deg, #6d28d9 0%, #a21caf 50%, #1e1b4b 100%)",
  },
  {
    track: "Most Startup-Ready",
    icon: <FaRocket />,
    project: "ExtForge",
    team: [
      m("Kamsi Elele"  , "https://www.linkedin.com/in/kamsiyochukwu-elele/" ),
      m("Brandon Guo"  , "https://www.linkedin.com/in/brandonguo1/" ),
    ],
    description:
      "Building Chrome extensions from scratch for non-technical users. Point, describe, ship. No code required.",
    image: "/hackathon/2026/extforge/ExtForge Thumbnail.jpeg",
    demoUrl: "https://drive.google.com/file/d/1xMYYXG0fymwkYCd--W9LidkhZ4udGrAl/view?usp=sharing",
    github: "https://github.com/nodnarb4/hack.git",
    placeholderGradient:
      "linear-gradient(135deg, #047857 0%, #065f46 50%, #022c22 100%)",
  },
  {
    track: "Most Human-Centered",
    icon: <FaHeart />,
    project: "VisionRx",
    team: [
      m("Martin Rodriguez"    , "https://www.linkedin.com/in/martin-rodriguez22/"),
      m("Paul Salinas"  , "https://www.linkedin.com/in/david-salinas/" ),
      m("Severo Barreras"     , "https://www.linkedin.com/in/severo-barreras/" ),
    ],
    description:
      "VisionRx uses your device's camera to measure face dimensions and estimate a vision prescription through an interactive vision test. Save prescriptions, simulate vision effects, and find better-fitting glasses — all in one platform.",
    image: "/hackathon/2026/visionrx/VisionRx Thumbnail.jpg",
    // demoUrl: "",
    github: "https://github.com/TheMGR111/Claude-Hackathon",
    placeholderGradient:
      "linear-gradient(135deg, #0369a1 0%, #1d4ed8 50%, #0c1a3a 100%)",
  },
];

const stats = [
  { value: "~100", label: "Attendees" },
  { value: "5", label: "Award Categories" },
  { value: "6.5 hrs", label: "Build Time" },
  { value: "Apr 4, 2026", label: "Date" },
];

export default function Hackathon2026Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-[var(--color-cream)]">

        {/* ---- Hero ---- */}
        <section className="relative overflow-hidden border-b border-[var(--color-muted)]/20 bg-[var(--color-surface)] px-6 pb-14 pt-16 text-center sm:px-10 sm:pb-20 sm:pt-24">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 39px, var(--color-foreground) 39px, var(--color-foreground) 40px)",
            }}
            aria-hidden
          />
          <p className="relative text-[11px] font-bold uppercase tracking-[0.35em] text-[var(--color-foreground)]/40">
            Archive · Spring 2026
          </p>
          <h1 className="relative mt-5 text-4xl font-bold leading-tight tracking-tight text-[var(--color-foreground)] sm:text-5xl md:text-6xl lg:text-7xl">
            Hooked on Claude
          </h1>
          <p className="relative mt-4 text-sm font-semibold tracking-wide text-[var(--color-primary)] sm:text-base">
            April 4, 2026 · UT Austin
          </p>
          <p className="relative mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--color-foreground)]/60 sm:text-base md:text-lg">
            Our first hackathon. Nine hours, 6.5 hours of building, and some of
            the most creative Claude-powered projects we&apos;ve ever seen.
          </p>
        </section>

        {/* ---- Stats bar ---- */}
        <section className="border-b border-[var(--color-muted)]/20 bg-[var(--color-surface)] px-6 py-10 sm:px-10">
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-y-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-[var(--color-primary)] sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-[var(--color-foreground)]/45">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Winners header ---- */}
        <div className="px-6 pb-2 pt-16 text-center sm:px-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[var(--color-primary)]/60">
            Five categories · One day
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-4xl md:text-5xl">
            2026 Winners
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--color-foreground)]/55">
            Scroll through every project. Each one built in a single afternoon.
          </p>
          <div className="mx-auto mt-8 flex flex-col items-center gap-1.5 text-[var(--color-foreground)]/30">
            <span className="text-[11px] uppercase tracking-[0.25em]">scroll</span>
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              className="animate-bounce"
              aria-hidden
            >
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
              <rect
                x="7" y="5" width="2" height="5" rx="1"
                fill="currentColor"
                style={{ animation: "scrollDot 1.8s ease-in-out infinite" }}
              />
            </svg>
          </div>
        </div>

        {/* ---- Winner sections ---- */}
        <div className="mt-10 divide-y divide-[var(--color-muted)]/15">
          {winners.map((winner, i) => (
            <WinnerSection key={winner.project} winner={winner} index={i} />
          ))}
        </div>

        {/* ---- Closing ---- */}
        <section className="relative overflow-hidden bg-[var(--color-primary)] px-6 py-20 text-center sm:px-10 sm:py-28">
          <div
            className="pointer-events-none absolute -top-20 left-1/2 h-40 w-[120%] -translate-x-1/2 rounded-[50%] bg-white/5"
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/40">
              Thank you
            </p>
            <h2 className="mt-5 text-3xl font-bold leading-snug text-white sm:text-4xl md:text-5xl">
              To everyone who built with us.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-white/70 sm:text-base">
              We&apos;ll be back. Stay tuned at{" "}
              <span className="font-semibold text-white">txclaude.org</span> and{" "}
              <span className="font-semibold text-white">@texasclaude</span> on
              Instagram.
            </p>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          60%       { transform: translateY(6px); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
