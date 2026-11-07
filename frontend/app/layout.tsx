import type { Metadata } from "next";
import { Source_Serif_4, Playfair_Display, Newsreader, Instrument_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { DESIGN_LAB, DESIGN_PREPAINT_SCRIPT } from "./lib/design-lab";
import DesignSwitcher from "./components/lab/DesignSwitcher";

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

// Club brand kit faces (reference/brand/kit.md in the club hub), used only by
// the design lab variants. Not preloaded, so the baseline never fetches them.
const newsreader = Newsreader({
  variable: "--font-kit-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  preload: false,
});

const instrumentSans = Instrument_Sans({
  variable: "--font-kit-sans",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "UT Austin Claude Builder Club",
  description:
    "University of Texas at Austin Claude Builder Club: workshops, hackathons, and demos.",
  icons: {
    icon: "/images/claude_logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={DESIGN_LAB}>
      {DESIGN_LAB && (
        <head>
          <script dangerouslySetInnerHTML={{ __html: DESIGN_PREPAINT_SCRIPT }} />
        </head>
      )}
      <body
        className={`${sourceSerif.variable} ${playfairDisplay.variable}${
          DESIGN_LAB ? ` ${newsreader.variable} ${instrumentSans.variable}` : ""
        } antialiased`}
      >
        {children}
        {DESIGN_LAB && <DesignSwitcher />}
        <Analytics />
      </body>
    </html>
  );
}
