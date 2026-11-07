import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { MEMBERSHIP_FORM_URL } from "../lib/membership";

const WHAT_WE_DO = [
  {
    title: "Workshops",
    body: "Hands-on sessions teaching practical AI skills, from prompt engineering to building full applications with Claude.",
  },
  {
    title: "Hackathons",
    body: "Compete in exciting build challenges, collaborate with peers, and create innovative AI-powered projects.",
  },
  {
    title: "Community",
    body: "Join a network of like-minded students passionate about AI, share ideas, and build lasting connections.",
  },
  {
    title: "Resources",
    body: "Access to Claude Pro subscriptions, API credits, exclusive tutorials, and the latest AI development tools.",
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

        <section className="mx-auto grid max-w-6xl gap-8 border-t-2 border-ink px-5 py-14 sm:px-8 md:grid-cols-[14rem_1fr] md:gap-16 md:py-20">
          <h2 className="text-2xl md:text-3xl">What we do</h2>
          <dl className="grid gap-x-12 sm:grid-cols-2">
            {WHAT_WE_DO.map((item) => (
              <div key={item.title} className="border-t border-line py-5 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
                <dt className="font-display text-xl">{item.title}</dt>
                <dd className="mt-2 text-subtle">{item.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 border-t-2 border-ink px-5 py-14 sm:px-8 md:grid-cols-[14rem_1fr] md:gap-16 md:py-20">
          <h2 className="text-2xl md:text-3xl">Backed by Anthropic</h2>
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
                you in the Claude Builder Club.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={MEMBERSHIP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[4px] bg-ink px-6 py-3 font-medium text-ivory transition-colors hover:bg-black"
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
