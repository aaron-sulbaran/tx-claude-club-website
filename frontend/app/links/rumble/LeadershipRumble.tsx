"use client";

import { useEffect, useState, type ReactNode } from "react";
import styles from "./LeadershipRumble.module.css";
import { isInstagramVisit, rumbleMode, type RumbleMode } from "./rumble-mode";

// Wraps the leadership application link on /links so visitors from the
// Instagram bio see which item to tap: about 0.8s after load it shakes twice
// with a fading clay ring, and an "Apply here" tag appears. First visit only
// (localStorage), plus every Instagram visit. Reduced motion gets a static
// ring instead. The link inside stays a normal link with the same text.
// Remove the wrapper and this folder after applications close (Fri 2026-11-13).

const SEEN_KEY = "txc-leadership-rumble-seen";
const START_DELAY_MS = 800;

function readSeen(): boolean {
  try {
    return window.localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false; // Blocked storage: treat as a first visit, so it still plays.
  }
}

function markSeen() {
  try {
    window.localStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Blocked storage: nothing to remember.
  }
}

export default function LeadershipRumble({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<RumbleMode>("none");

  useEffect(() => {
    const next = rumbleMode({
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      fromInstagram: isInstagramVisit(window.location.search, document.referrer),
      seenBefore: readSeen(),
    });
    if (next === "none") return;
    const timer = window.setTimeout(() => {
      setMode(next);
      markSeen();
    }, next === "rumble" ? START_DELAY_MS : 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={styles.wrap} data-mode={mode}>
      {children}
      {mode !== "none" && (
        <span className={styles.hint} aria-hidden>
          Apply here
        </span>
      )}
    </div>
  );
}
