const images = [
  { src: "/images/GM1.jpg", alt: "General meeting" },
  { src: "/images/hackathonwinners.jpg", alt: "Hackathon winners" },
  { src: "/images/tabling.jpg", alt: "Tabling"},
  { src: "/images/GM2.jpg", alt: "General meeting"},
];

export default function Gallery() {
  return (
    <section className="overflow-hidden bg-cream pb-16 pt-10 sm:pb-20 sm:pt-14 md:pb-24 md:pt-16">
      <h2 className="mb-6 px-4 text-center text-xl font-bold text-foreground sm:mb-8 sm:text-2xl md:text-3xl">
        What we've been up to...
      </h2>
      <style>{`
        @keyframes gallery-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .gallery-track { 
          animation: gallery-scroll 16s linear infinite; 
          width: max-content;
        }
        @media (min-width: 640px) { .gallery-track { animation-duration: 50s; } }
        @media (min-width: 768px) { .gallery-track { animation-duration: 60s; } }
      `}</style>
      <div className="gallery-track flex">
        {[...Array(4)].map((_, groupIndex) => (
          <div key={`group-${groupIndex}`} className="flex flex-shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6">
            {images.map((img, i) => (
              <img
                key={`img-${groupIndex}-${i}`}
                src={img.src}
                alt={img.alt}
                style={{ height: "clamp(16rem, 30vw, 100rem)" }}
                className="w-auto flex-shrink-0 rounded-lg object-cover"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
