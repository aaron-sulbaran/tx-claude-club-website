// Decides whether the leadership link on /links should rumble. Pure, so it
// runs under `node --test` (rumble-mode.test.ts). Remove this folder after
// leadership applications close (Fri 2026-11-13).

export type RumbleMode = "rumble" | "static" | "none";

/** Instagram bio traffic: ?ref=ig, or a referrer on instagram.com or l.instagram.com. */
export function isInstagramVisit(search: string, referrer: string): boolean {
  if (new URLSearchParams(search).get("ref") === "ig") return true;
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    return host === "instagram.com" || host.endsWith(".instagram.com");
  } catch {
    return false;
  }
}

/**
 * First visits and every Instagram visit get the cue. Reduced motion gets a
 * static highlight instead of the shake. Repeat visits from elsewhere get nothing.
 */
export function rumbleMode(options: {
  reducedMotion: boolean;
  fromInstagram: boolean;
  seenBefore: boolean;
}): RumbleMode {
  if (options.seenBefore && !options.fromInstagram) return "none";
  return options.reducedMotion ? "static" : "rumble";
}
