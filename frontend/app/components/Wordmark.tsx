// The club lockup from the Figma file (UT-CBC-Design-Logos), used in the hero
// and footer: the official Claude wordmark SVG, then "Builder Club" in the
// display face, with a display-italic line underneath. The navbar shows the
// name only and spells out the university in sans (components/Header.tsx).
// See docs/brand/kit.md.
//
// Sizes are in em of the root, so `size` (rem) scales the whole lockup.
// 1em = the height of the Claude wordmark SVG. The SVG is drawn as a mask so it
// takes the surrounding text color (ink, or white on clay), and it shares the
// text baseline (an empty inline-block's baseline is its bottom edge).

const WORDMARK_ASPECT = 176.415 / 41.8456;

// Measured from the SVG paths: the stems of "Claude" end 41.34 units down a
// 41.85-unit box, so the letters sit a hair above the box bottom.
const WORDMARK_BASELINE_INSET = (41.85 - 41.34) / 41.85;

export default function Wordmark({
  size,
  showHandle = true,
  handle = "@ut austin",
  handleScale = 1.05,
  align = "start",
  handleClassName = "",
  className = "",
}: {
  /** Height of the Claude wordmark in rem. Omit to size it with a text-* class on className. */
  size?: number;
  showHandle?: boolean;
  /** The line under the name. The @ handle is for posts and video; pages spell the school out. */
  handle?: string;
  /** Handle size relative to the wordmark height. */
  handleScale?: number;
  /** "center" matches the square Figma lockup (1:225). */
  align?: "start" | "center";
  handleClassName?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex flex-col ${align === "center" ? "items-center" : "items-start"} ${className}`}
      style={size ? { fontSize: `${size}rem` } : undefined}
    >
      <span className="inline-flex items-baseline whitespace-nowrap" style={{ gap: "0.3em" }}>
        <span
          role="img"
          aria-label="Claude"
          className="inline-block shrink-0 bg-current"
          style={{
            maskImage: "url(/images/brand/claude-wordmark.svg)",
            WebkitMaskImage: "url(/images/brand/claude-wordmark.svg)",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            height: "1em",
            width: `${WORDMARK_ASPECT}em`,
            translate: `0 ${WORDMARK_BASELINE_INSET}em`,
          }}
        />
        <span className="font-display leading-none" style={{ fontSize: "1.25em", fontWeight: 350, letterSpacing: "-0.02em" }}>
          Builder Club
        </span>
      </span>
      {showHandle && (
        <span
          className={`font-display italic leading-none ${handleClassName}`}
          style={{ fontSize: `${handleScale}em`, fontWeight: 350, marginTop: `${0.45 / handleScale}em` }}
        >
          {handle}
        </span>
      )}
    </span>
  );
}
