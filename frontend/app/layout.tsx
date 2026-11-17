import type { Metadata } from "next";
import { Newsreader, Instrument_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { INTRO_PREPAINT_SCRIPT } from "./lib/intro";

// Brand kit faces (docs/brand/kit.md): Newsreader stands in for Copernicus,
// Instrument Sans for Anthropic Sans. The opsz axis lets display sizes use
// Newsreader's sharper display cut.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UT Austin Claude Builder Club",
  description:
    "University of Texas at Austin Claude Builder Club: workshops, hackathons, and demos.",
  // The favicon is app/icon.png (and app/apple-icon.png): the club's tower and sun
  // on a clay square, cropped tight so the tower still reads at 16 px.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the intro script sets html[data-intro] before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_PREPAINT_SCRIPT }} />
      </head>
      <body className={`${newsreader.variable} ${instrumentSans.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
