const cards = [
  { icon: "/images/claude-icons/grid.png", title: "FREE Claude", desc: "Access to Claude Pro, API Credits, and merch" },
  { icon: "/images/claude-icons/lightning.png", title: "Hackathons", desc: "Compete & win tons of amazing prizes" },
  { icon: "/images/claude-icons/flowers.png", title: "Community", desc: "Connect with students passionate about AI" },
  { icon: "/images/claude-icons/lightbulb.png", title: "Learn", desc: "Hands-on tutorials for all skill-levels" },
];

export default function Form() {
  return (
    <section className="px-4 py-10 sm:px-8 sm:py-12 md:py-16">
      {/* Full-width form */}
      <div className="overflow-hidden rounded-xl border border-muted/20">
        <iframe
          id="JotFormIFrame-253555944387168"
          title="Registration Form"
          src="https://www.jotform.com/253555944387168"
          style={{
            minWidth: "100%",
            maxWidth: "100%",
            height: 2000,
            border: "none",
          }}
          scrolling="yes"
          allowFullScreen
        />
      </div>

      {/* Cards below form */}
      <div className="mx-auto mt-10 max-w-6xl sm:mt-12">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
          What's in it for you?
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4 md:grid-cols-4">
          {cards.map((item) => (
            <div key={item.title} className="flex items-start gap-2.5 rounded-lg border border-muted/20 bg-cream/30 p-3 sm:gap-3 sm:p-4">
              <img src={item.icon} alt="" className="h-10 w-10 flex-shrink-0 sm:h-12 sm:w-12" />
              <div>
                <p className="text-sm font-semibold text-foreground sm:text-base">{item.title}</p>
                <p className="text-xs text-foreground/60 sm:text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
