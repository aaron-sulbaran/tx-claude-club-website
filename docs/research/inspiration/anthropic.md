# anthropic.com: design and motion notes

Captured 2026-11-07. Two research passes ran the `extract-design` skill against https://www.anthropic.com/ and https://www.anthropic.com/news, then read the served CSS and JS and checked behavior in a browser.

The raw outputs (tokens, the generated Tailwind file, screenshots, downloaded CSS and JS) stayed in the session scratchpad and are not committed. Anthropic's site code and screenshots are theirs, so this page keeps only the specs and what the club took from them.

## What we took, and where it lives

| Pattern on anthropic.com | Club version | File |
|---|---|---|
| Homepage h1 fades in (opacity 0 to 1, 1.45s, `power2.out`) | Hero lockup and details card fade in (1.45s, ease-out-cubic, card 0.2s later) | `globals.css` `.fade-in-hero`, `components/home/PosterHome.tsx` |
| 2026 Public Benefit Report intro: the frame grows to full bleed on scroll, a canvas tile wall pops in from the centre, zooms out, flies to a ring around the title, and the copy fades in last | DOM tile wall built from club photos, illustrations and hackathon project images. It pops in clustered, flies out to a ring, then the copy fades in. The frame grows with a CSS scroll-driven animation | `components/home/TileWall.tsx`, `globals.css` (`.tile-wall*`) |
| /news card hover: title and summary fade to `#87867f` over 0.2s ease-out; images never scale | `.hover-fade` on the Slides and Hackathon cards; removed the thumbnail zoom | `globals.css`, `slides/page.tsx`, `hackathon/page.tsx` |
| Sparse dark footer | Slim ink bar under the Figma tower | `components/Footer.tsx` |

## Public Benefit Report intro, as built by Anthropic

Component `MissionHomepageSizzle`.

**Frame**
- Background `#f5f4ed`. Height is `100lvh - 84px`, or 16:9 from 768px up.
- `clip-path: inset(0 calc(margin*(1-g)) calc(32px*(1-g)) round calc(4px*(1-g)))`.
- `g` comes from framer-motion `useScroll` on a sentinel (offset `["end end", "start 25%"]`), smoothed by `useSpring({stiffness:120, damping:30})`.

**Triggers**
- Images preload one viewport early.
- Playback starts when the sentinel is fully in view, once.
- If loading stalls for 3s, it jumps to the final frame.

**Timeline (12.6s canvas)**

| Time (s) | Step |
|---|---|
| 0 to 4 | Slideshow of feature cards |
| 4.4 to 8.8 | Tiles pop from the centre outward (ease-out-cubic, 0.75s each) |
| 5.5 to 8.8 | Camera pulls out to 0.453× |
| 9.4 to 9.9 | Breathe at 0.92× (ease-out-quart) |
| 9.9 to 11.6 | Tiles fly to a ring around the cleared copy area (ease-in-out-cubic, delay grows with distance from the centre) |
| 10.7 | Copy reveal starts |
| After 12.6 | Tiles keep drifting on an 8px sine |

**Copy reveal**
- `opacity 1s cubic-bezier(.33,1,.68,1)`, under `prefers-reduced-motion: no-preference` only.
- Focus inside the copy reveals it early.

**Reduced motion:** final frame, no animation, with a pause button.

**Our cut**
- About 3s instead of 12.6s, with no slideshow or zoom.
- Built from HTML elements and container query units, so there's no canvas and no framer-motion dependency.
- Reduced motion renders the final state.

## Tokens worth knowing (observed in their CSS)

- **Fonts:** anthropicSans, anthropicSerif and anthropicMono (proprietary; we use Newsreader and Instrument Sans, see `docs/brand/kit.md`).
- **Fluid type:** sizes scale linearly between 390px and 1920px viewports.

| Style | Size (px) | Line height | Weight |
|---|---|---|---|
| Display | 48 → 80 | 112% → 100% | |
| Headline 1 | 32 → 61 | 108% | |
| Card title | 20 → 22 | 125% | 700 |
| Body | 16 → 17 | 153% | |
| Caption | 13 | | letter-spacing .01em |

- **Colors:**
  - Backgrounds: `#faf9f5`, `#f5f4ed`, `#e8e6dc`.
  - Text: `#141413`, `#30302e`, `#5e5d59`, `#87867f`.
  - Borders: `#c2c0b6`, `#dedcd1`.
  - Clay `#d97757`, interactive clay `#c6613f`, focus ring `#154c92`.
- **Grid:** 4 columns, then 12 from 768px. Margins 32, 48, 80px. Gutter 16px.
- **Radius:** 4px media, 8 to 12px buttons, 16px cards.
- **Buttons:** 28, 36 and 44px tall. Primary is ink on ivory. Hover adds a 1px ring.
- **Easing:**
  - `--ease-out-quart cubic-bezier(.165,.84,.44,1)`
  - `--ease-in-out-quart cubic-bezier(.77,0,.175,1)`
  - Row expand `cubic-bezier(.215,.61,.355,1)` over 0.35s
  - Accordion `cubic-bezier(.4,0,.2,1)` over 0.4s
- **Motion gating:** every motion rule is gated on `prefers-reduced-motion`.

## /news patterns not used yet (candidates)

- **Archive table for Events:**
  - Columns: event, place, type, date.
  - A mono count line ("12 events") and an Upcoming / Past / All segmented control.
  - 54px rows with 1px `#dedcd1` top rules, no cards.
  - Rows expand in place, with a 0.35s height ease.
  - On mobile, rows collapse to date and type, then the title.
- **"Latest" trio:** the featured item in the centre six columns, with side stacks of three columns each. A fit for "next event" plus recent ones.
- **Slides:** the 16:9 tile is meta row, then thumbnail (4px radius, 5% inset hairline), then title, then a summary clamped to 4 lines. Tiles sit on top rules, not cards.
