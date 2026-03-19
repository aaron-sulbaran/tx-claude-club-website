import Header from "./components/Header";
import Hero from "./components/Hero";
import Form from "./components/Form";
import Gallery from "./components/Gallery";
import Outreach from "./components/Outreach";
import Footer from "./components/Footer";
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        
        {/* Hackathon Announcement */}
        <section className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
          <Link href="/hackathon" className="group block">
            <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 px-6 py-5 transition-colors hover:bg-primary/10 sm:flex-row sm:px-8 lg:px-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <FaCalendarAlt className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">We're Hosting a Hackathon!</h3>
                  <p className="mt-1 text-sm text-foreground/70">April 4th | Build anything. All experience levels. $450+ in prizes.</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white transition-opacity group-hover:opacity-90">
                  Learn More
                </span>
              </div>
            </div>
          </Link>
        </section>

        <Form />
        <Gallery />
        <Outreach />
        <section className="bg-primary px-[8%] py-16 sm:py-20 md:py-28">
          <p className="text-center text-5xl font-light leading-tight text-cream sm:text-6xl md:text-left md:text-7xl lg:text-8xl">
            Keep
            <br />
            thinking.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
