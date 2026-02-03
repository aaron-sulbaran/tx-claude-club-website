export default function Hero() {
  return (
    <section className="flex flex-col items-center px-4 pb-16 pt-12 text-center sm:px-8 sm:pb-24 sm:pt-20 md:pb-36 md:pt-32">
      <div className="flex items-center justify-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-6xl">
          UT Austin&apos;s Premier AI Club
        </h1>
      </div>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 sm:mt-10 sm:text-lg md:text-xl">
        Join a community of builders exploring, creating,
        and shipping with Claude. Workshops, hackathons, and demos every month.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:gap-5">
        <a
          href="/events"
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:px-10 sm:py-3.5 sm:text-base md:text-lg"
        >
          View Events
        </a>
        <a
          href="/about"
          className="inline-flex items-center justify-center rounded-md border-2 border-primary px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white sm:px-10 sm:py-3.5 sm:text-base md:text-lg"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}
