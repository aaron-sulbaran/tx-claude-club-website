import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UT Austin Claude Builder Club",
  description:
    "University of Texas at Austin Claude Builder Club — workshops, hackathons, and demos.",
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
      <body className={`${sourceSerif.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
