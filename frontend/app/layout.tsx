import type { Metadata } from "next";
import { Newsreader, Instrument_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

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
    <html lang="en">
      <body className={`${newsreader.variable} ${instrumentSans.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
