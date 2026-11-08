# Texas Claude Builder Club brand kit (interim)

Assembled 2026-11-07 from what Anthropic has actually given the club, plus the club's own Figma file. It replaces the guesswork in the hub's `reference/brand/kit.md` and `claude-visual-system.md`. **When Anthropic sends the promised brand asset kit, that kit wins**: update this file first, then the site, the Instagram templates and the deck template from it.

One rule holds it together: **every surface (site, Instagram, posters, club decks) uses the same two faces, the same palette and the same wordmark.**

## Sources, in order of authority

| Source | What it settles | Where |
|---|---|---|
| Club Figma file "UT-CBC-Design-Logos" (`GoXRf26O4Y1vWJrjH81bjv`), read with the Figma MCP | The lockup is built from an Anthropic library: "Claude" is the official wordmark component, "Builder Club" is **Copernicus Book** at -4% tracking and 1.1 leading, "@ut austin" is Copernicus Book Italic (one frame falls back to Georgia Italic), and the ink is the library token `Primary/Slate (Gray 950)` = `#141413` | Frames `1:313`, `1:341`, `1:170` |
| Anthropic's own decks: content workshop (2026-10-13) and ambassador kickoff | House layout: regular-weight serif headlines, sans body, small tracked caps section labels in deep clay, soft-radius filled cards, pastel tiles, near-white or clay or black pages, ANTHROPIC wordmark bottom right | `reference/program/pdf/content-workshop-slides.pdf`, `kickoff-slides.pdf` in the hub (both flattened images, colors sampled from renders) |
| Anthropic's editable club templates (Google Slides and Docs) | Anthropic's own free stand-ins: **Poppins** and **Lora** | `reference/brand/templates/*.pdf`, `reference/program/pdf/onboarding-slides.pdf`, `hackathon-toolkit.pdf`, `program-faqs.pdf` (embedded fonts read with `pdffonts`) |
| claude.com stylesheets (2026-10-22 research) | Palette tokens and the pastel-field illustration style | hub `reference/brand/claude-visual-system.md` |

## Type

Anthropic's real faces (Copernicus or Anthropic Serif, Styrene or Anthropic Sans) are commercial and were not shared with us. Permission to use Anthropic's branding and logos does not cover foundry font licenses, so no Copernicus or Styrene files go on the web or into shared files. Until the kit arrives, we use free Google Fonts, chosen by setting them next to the Figma lockup:

| Role | Use | Settings | Stands in for |
|---|---|---|---|
| Display: page titles, headlines, wordmark text | **Newsreader** | Weight 350 at 40 px and up, 400 below. Tracking -0.02em. Leading 1.05 to 1.1. Sentence case | Copernicus Book |
| Display italic: "@ut austin", pull quotes | **Newsreader Italic** | Weight 350 to 400, no tracking | Copernicus Book Italic |
| Body and UI | **Instrument Sans** | 400 body, 500 buttons and emphasis. 15 to 18 px body | Anthropic Sans or Styrene |
| Section labels and data keys | **Instrument Sans** | 500, 14 px, **sentence case**, deep clay or gray | The deck's section labels, minus the caps (taste ledger: no tracked caps labels) |

- **Serif everywhere (decided 2026-11-08, design review):**
  - Every heading and title is Newsreader, from page titles down to card and event titles.
  - Titles under about 28 px use weight 500 so they still read as headings.
  - Instrument Sans is for body, UI and labels only.
  - Anthropic's website uses bold sans titles instead. We follow the Figma lockup, and keep one display family so a section never shows three type styles.
- Use labels the way the decks do: one short label above a heading, or as a key in a details card. Never a sentence.
- **Google Slides and Docs:** when editing an Anthropic template, keep its Poppins and Lora; Anthropic picked them. For club-made decks, use Newsreader and Instrument Sans if Slides offers them under "More fonts" (unverified). If it doesn't, Lora is the fallback serif and Poppins the fallback sans.
- **Newsreader vs Lora:** Newsreader stays the serif because, side by side, it's the closer match to Copernicus. Its wedge serifs and italic nearly match. Lora is softer and more calligraphic.

## The wordmark

- **"Claude"** is the official wordmark SVG exported from the Figma library: `frontend/public/images/brand/claude-wordmark.svg`.
  - Never retype it in a font; always use the SVG.
  - Color it ink `#141413`, or white on clay. No other colors.
- **"Builder Club"** is display type, set right after it at the wordmark's cap height.
- **"@ut austin"** is display italic on the line below.
- **Lockups in Figma:**
  - Ink lockup with the photographic tower, the spark and the ANTHROPIC wordmark, on clay: `1:341`.
  - Hand-drawn tower and sun with a white wordmark, on clay: `1:313`.
  - Exported PNGs are in the hub's `reference/brand/logos/`.
- **Club logo:** the hand-drawn tower plus the Claude spark as the sun (`CBCLogo_ClaudeSun.png`).
- **Navbar lockup** (2026-11-08):
  - The spark, then "Claude Builder Club" in Newsreader, with "The University of Texas at Austin" in Instrument Sans underneath.
  - The @ handle is for posts and video, not the navbar.
  - No hamburger menu: on phones the links get their own row.

## Color

| Token | Hex | Use | Source |
|---|---|---|---|
| Ink | `#141413` | Text, buttons, footer, wordmark | Figma token Primary/Slate (Gray 950) |
| Ivory | `#F0EEE6` | Page background (site and stories) | claude.com gray-150 |
| Paper | `#FAF9F5` | Cards on ivory, deck page | claude.com gray-050 |
| Stone | `#E8E6DC` | Filled cards on paper, progress track | claude.com gray-200, deck cards `#EDECE8` |
| Line | `#D6D3C7` | Hairlines | Club posts |
| Gray | `#5E5D59` | Secondary text, keys | claude.com, club posts |
| Faint | `#87867F` | Hover fade only, never resting text (3.3:1) | anthropic.com fg-4 |
| Clay | `#D97757` | Fields: hero, end card, progress bars. **Never text on light backgrounds** (2.7:1) | claude.com, Figma frames |
| Deep clay | `#863311` | Section labels and text links (7.2:1 on ivory) | Sampled from the workshop deck labels |
| Peach | `#EBC9B7` | Pastel field | claude.com |
| Heather | `#CBCADB` | Pastel field | claude.com, deck tiles `#CAC9DA` |
| Cactus | `#BCD1CA` | Pastel field | claude.com, deck tiles `#BBD0C9` |
| Tan | `#EADFC8` | Pastel field, club stories | Club posts |

Pastel and clay fields always carry ink text. White text appears only on clay at display sizes (the end card and the white lockup).

## Shape and layout

- **Cards:** filled, no border, 12 px radius on the web. That's the deck's soft corner, scaled down.
- **Buttons:** ink fill, ivory text, 8 px radius.
- **Pastel tiles:** one idea per tile. Never a pastel next to a pastel of the same color.
- **Illustrations:** the hand-drawn set (`frontend/public/images/claude-icons/`), centered on one flat pastel field. At most one clay accent per graphic.
- **Measure:** about 30 characters for headlines, about 60 for body.
- **Motion, after anthropic.com** (details in `docs/research/inspiration/anthropic.md`):
  - Fades are opacity-led. Use ease-out-cubic `cubic-bezier(.33,1,.68,1)`, about 1 to 1.5s for reveals and 0.2s for hovers.
  - Hovering a card fades its text to `#87867f`. Images never scale.
  - One signature moment per page at most (the homepage tile wall).
  - Nothing bouncy. Every effect sits under `prefers-reduced-motion: no-preference`.
- **Don'ts:**
  - No gradients, glows or purple-blue "AI" imagery.
  - No stock photos.
  - No all-caps copy beyond labels.
  - No em dashes.

## Compliance carried from Anthropic's decks

- Every club post carries #ClaudePartner.
- Get a signed release from anyone pictured.
- Don't speak for Anthropic.
- No competitor comparisons.
- Free Claude Pro may be mentioned on the website, not on Instagram (decision 2026-11-06).

## Open items

- The official Anthropic brand asset kit (promised, not yet received). When it lands, check the fonts, the exact clay and label colors, and any rules for the ambassador lockup.
- Whether Google Slides offers Newsreader and Instrument Sans.
- The hub's `reference/brand/kit.md` still lists JetBrains Mono for labels. This kit moves labels to Instrument Sans caps to match Anthropic's decks; the Instagram templates should follow it.
