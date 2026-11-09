import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
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
//   image: drop photo.jpg into /public/hackathon/2026/<slug>/
//          then set: image: "/hackathon/2026/<slug>/photo.jpg"
//   demoUrl: paste the YouTube, Loom, or Google Drive share link
//   github: paste the GitHub repo URL
//   linkedin (per team member): paste the linkedin.com/in/... profile URL
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
      "VisionRx uses your device's camera to measure face dimensions and estimate a vision prescription through an interactive vision test. Save prescriptions, simulate vision effects, and find better-fitting glasses, all in one platform.",
    image: "/hackathon/2026/visionrx/VisionRx Thumbnail.jpg",
    // demoUrl: "",
    github: "https://github.com/TheMGR111/Claude-Hackathon",
    placeholderGradient:
      "linear-gradient(135deg, #0369a1 0%, #1d4ed8 50%, #0c1a3a 100%)",
  },
];

const stats = [
  { value: "~100", label: "Attendees" },
  { value: "5", label: "Award categories" },
  { value: "6.5 hrs", label: "Build time" },
  { value: "Apr 4, 2026", label: "Date" },
];

export default function Hackathon2026Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 text-ink">
        <PageHeader
          eyebrow="Hackathons"
          title="Hooked on Claude"
          intro="Our first hackathon. Nine hours, 6.5 hours of building, and some of the most creative Claude-powered projects we've ever seen."
          field="heather"
          art="horns"
        >
          <p className="mt-3 text-ink/80">Spring 2026, April 4 at UT Austin</p>
        </PageHeader>

        <section className="border-b border-line">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-5 py-10 sm:grid-cols-4 sm:px-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-subtle">{stat.label}</dt>
                <dd className="font-display text-3xl sm:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mx-auto max-w-6xl px-5 pb-4 pt-14 sm:px-8 md:pt-20">
          <h2 className="text-3xl md:text-5xl">2026 winners</h2>
          <p className="mt-3 max-w-lg text-lg text-subtle">
            Five award categories. Each project built in a single afternoon.
          </p>
        </div>

        <div className="mt-8 divide-y divide-line border-y border-line">
          {winners.map((winner, i) => (
            <WinnerSection key={winner.project} winner={winner} index={i} />
          ))}
        </div>

        <section className="bg-clay">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
            <h2 className="text-3xl leading-snug md:text-5xl">To everyone who built with us, thank you.</h2>
            <p className="mt-5 max-w-lg text-lg">
              We&apos;ll be back. Stay tuned at <span className="font-semibold">txclaude.org</span>{" "}
              and{" "}
              <a
                href="https://www.instagram.com/texasclaude"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-4"
              >
                @texasclaude
              </a>{" "}
              on Instagram.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
