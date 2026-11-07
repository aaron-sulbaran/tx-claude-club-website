// The club lockup from the Figma file (UT-CBC-Design-Logos): the official
// Claude wordmark SVG, then "Builder Club" in the display face, with
// "@ut austin" in display italic below. The SVG is drawn as a mask so it takes
// the surrounding text color (ink, or white on clay). An empty inline-block's
// baseline is its bottom edge, so items-baseline sits the SVG on the text
// baseline. See docs/brand/kit.md.

const WORDMARK_ASPECT = 176.415 / 41.8456;

// The spark is taller than the wordmark. Baseline alignment puts its bottom
// edge on the baseline, so it is translated down by half the height
// difference, which centers it on the wordmark itself rather than on a text
// box padded with descender space. (A negative margin does nothing here:
// flex baseline alignment uses the border box.) The CSS translate property
// stays independent of the hover rotate.
const SPARK_SCALE = 1.6;

export default function Wordmark({
  size,
  showHandle = true,
  showSpark = false,
  align = "start",
  handleClassName = "",
  sparkClassName = "",
  className = "",
}: {
  /** Height of the Claude wordmark, in rem. */
  size: number;
  showHandle?: boolean;
  showSpark?: boolean;
  /** "center" matches the stacked Figma lockup (1:225), handle centered under the name. */
  align?: "start" | "center";
  handleClassName?: string;
  sparkClassName?: string;
  className?: string;
}) {
  const height = `${size}rem`;
  return (
    <span className={`inline-flex flex-col ${align === "center" ? "items-center" : "items-start"} ${className}`}>
      <span className="inline-flex items-baseline whitespace-nowrap" style={{ gap: `${size * 0.3}rem` }}>
        {showSpark && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/images/claude_logo.svg"
            alt=""
            className={`inline-block shrink-0 ${sparkClassName}`}
            style={{
              height: `${size * SPARK_SCALE}rem`,
              width: `${size * SPARK_SCALE}rem`,
              translate: `0 ${(size * (SPARK_SCALE - 1)) / 2}rem`,
              marginRight: `${size * 0.15}rem`,
            }}
          />
        )}
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
