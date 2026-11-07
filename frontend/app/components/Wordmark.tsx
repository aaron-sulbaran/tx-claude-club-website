// The club lockup from the Figma file (UT-CBC-Design-Logos): the official
// Claude wordmark SVG, then "Builder Club" in the display face, with
// "@ut austin" in display italic below. The SVG is drawn as a mask so it takes
// the surrounding text color (ink, or white on clay). An empty inline-block's
// baseline is its bottom edge, so items-baseline sits the SVG on the text
// baseline. See docs/brand/kit.md.

const WORDMARK_ASPECT = 176.415 / 41.8456;

export default function Wordmark({
  size,
  showHandle = true,
  handleClassName = "",
  className = "",
}: {
  /** Cap-height-ish size of the wordmark, in rem. */
  size: number;
  showHandle?: boolean;
  handleClassName?: string;
  className?: string;
}) {
  const height = `${size}rem`;
  return (
    <span className={`inline-flex flex-col items-start ${className}`}>
      <span className="inline-flex items-baseline whitespace-nowrap" style={{ gap: `${size * 0.3}rem` }}>
        <span
          role="img"
          aria-label="Claude"
          className="inline-block shrink-0 bg-current"
          style={{
            height,
            width: `${size * WORDMARK_ASPECT}rem`,
            maskImage: "url(/images/brand/claude-wordmark.svg)",
            WebkitMaskImage: "url(/images/brand/claude-wordmark.svg)",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
        <span
          className="font-display leading-none"
          style={{ fontSize: `${size * 1.25}rem`, fontWeight: 350, letterSpacing: "-0.02em" }}
        >
          Builder Club
        </span>
      </span>
      {showHandle && (
        <span
          className={`font-display italic leading-none ${handleClassName}`}
          style={{ fontSize: `${size * 1.05}rem`, fontWeight: 350, marginTop: `${size * 0.45}rem` }}
        >
          @ut austin
        </span>
      )}
    </span>
  );
}
