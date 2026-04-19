import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Keep Turbopack rooted at this app. A stray lockfile in the parent folder
// can make Next pick the wrong root, break Tailwind resolution, and thrash.
const turbopackRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  transpilePackages: ["@vercel/analytics"],
  turbopack: {
    root: turbopackRoot,
  },
};

export default nextConfig;
