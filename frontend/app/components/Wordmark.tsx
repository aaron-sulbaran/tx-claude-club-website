// The club lockup from the Figma file (UT-CBC-Design-Logos): the official
// Claude wordmark SVG, then "Builder Club" in the display face, with
// "@ut austin" in display italic. See docs/brand/kit.md.
//
// Every size is in em of the root, so `size` (rem) or a responsive text-*
// class on the root scales the whole lockup. 1em = the height of the Claude
// wordmark SVG.
//
// The SVG is drawn as a mask so it takes the surrounding text color (ink, or
// white on clay). Everything shares one baseline (an empty inline-block's
// baseline is its bottom edge, so items-baseline seats the SVG on it).

const WORDMARK_ASPECT = 176.415 / 41.8456;

// Measured from the SVG paths: the stems of "Claude" end 41.34 units down a
// 41.85-unit box, and the "C" stands 40.3 units tall. So the letters sit a
// hair above the box bottom, and the name's optical midline (half its cap
// height) is 0.4815em above the baseline.
const WORDMARK_BASELINE_INSET = (41.85 - 41.34) / 41.85;
const MIDLINE = 40.3 / 41.85 / 2;

// Newsreader's x-height is 0.512em (measured from the loaded font). A lowercase
// line reads as centered when its x-height band is centered, so "@ut austin"
// is lifted until the middle of its x-height sits on the name's midline.
const NEWSREADER_X_HEIGHT = 0.512;
// Newsreader's font box: 0.74em above the baseline, 0.26em below. With
// leading-none, that is the height each text span adds to the row.
const NEWSREADER_ASCENT = 0.74;
const NEWSREADER_DESCENT = 0.26;

const BUILDER_CLUB_SCALE = 1.25;
const INLINE_HANDLE_SCALE = 1.3;
const SPARK_SCALE = 1.6;

const maskStyle = {
  maskImage: "url(/images/brand/claude-wordmark.svg)",
  WebkitMaskImage: "url(/images/brand/claude-wordmark.svg)",
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
} as const;

export default function Wordmark({
  size,
  layout = "stacked",
  showHandle = true,
  showSpark = false,
  align = "start",
  handleClassName = "",
  sparkClassName = "",
  className = "",
}: {
  /** Height of the Claude wordmark in rem. Omit to size it with a text-* class instead. */
  size?: number;
  /** "stacked" puts @ut austin under the name; "inline" is the one-line header lockup. */
  layout?: "stacked" | "inline";
  showHandle?: boolean;
  showSpark?: boolean;
  /** Stacked only. "center" matches the square Figma lockup (1:225). */
  align?: "start" | "center";
  handleClassName?: string;
  sparkClassName?: string;
  className?: string;
}) {
  const rootStyle = size ? { fontSize: `${size}rem` } : undefined;

  const spark = showSpark && (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/claude_logo.svg"
      alt=""
      className={`inline-block shrink-0 ${sparkClassName}`}
      style={{
        height: `${SPARK_SCALE}em`,
        width: `${SPARK_SCALE}em`,
        // Bottom edge sits on the baseline; drop it until its center is on the midline.
        translate: `0 ${SPARK_SCALE / 2 - MIDLINE}em`,
        marginRight: "0.2em",
      }}
    />
  );

  const name = (
    <>
      <span
        role="img"
        aria-label="Claude"
        className="inline-block shrink-0 bg-current"
        style={{
          ...maskStyle,
          height: "1em",
          width: `${WORDMARK_ASPECT}em`,
          translate: `0 ${WORDMARK_BASELINE_INSET}em`,
        }}
      />
      <span
        className="font-display leading-none"
        style={{ fontSize: `${BUILDER_CLUB_SCALE}em`, fontWeight: 350, letterSpacing: "-0.02em" }}
      >
        Builder Club
      </span>
    </>
  );

  if (layout === "inline") {
    const handleLift = MIDLINE - (NEWSREADER_X_HEIGHT * INLINE_HANDLE_SCALE) / 2;
    // A parent that centers this row centers its layout box, which runs from
    // the tallest item's top (the spark) to the deepest descender space. Shift
    // the row so the name's midline lands where that box's center was, which
    // centers the lockup itself in a navbar.
    const textScale = showHandle ? INLINE_HANDLE_SCALE : BUILDER_CLUB_SCALE;
    const above = Math.max(showSpark ? SPARK_SCALE : 1, NEWSREADER_ASCENT * textScale);
    const below = NEWSREADER_DESCENT * textScale;
    const rowShift = MIDLINE - (above - below) / 2;
    return (
      <span
        className={`inline-flex items-baseline whitespace-nowrap ${className}`}
        style={{ ...rootStyle, gap: "0.3em", translate: `0 ${rowShift}em` }}
      >
        {spark}
        {name}
        {showHandle && (
          <span
            className={`font-display italic leading-none ${handleClassName}`}
            style={{
              fontSize: `${INLINE_HANDLE_SCALE}em`,
              fontWeight: 400,
              marginLeft: `${0.25 / INLINE_HANDLE_SCALE}em`,
              translate: `0 -${handleLift / INLINE_HANDLE_SCALE}em`,
            }}
          >
            @ut austin
          </span>
        )}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex flex-col ${align === "center" ? "items-center" : "items-start"} ${className}`}
      style={rootStyle}
    >
      <span className="inline-flex items-baseline whitespace-nowrap" style={{ gap: "0.3em" }}>
        {spark}
        {name}
      </span>
      {showHandle && (
        <span
          className={`font-display italic leading-none ${handleClassName}`}
          style={{ fontSize: "1.05em", fontWeight: 350, marginTop: `${0.45 / 1.05}em` }}
        >
          @ut austin
        </span>
      )}
    </span>
  );
}
