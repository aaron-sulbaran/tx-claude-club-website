"use client";

import { useEffect, useRef } from "react";

// First-visit intro, after the club's end-card motion (docs/brand/kit.md) and
// the Weekend Robotics intro Aaron pointed at: clay fills the screen, the
// Claude spark appears, then flies down into the hero and lands exactly on the
// sun of the tower logo. The page reveals around it and the tower rises.
//
// INTRO_PREPAINT_SCRIPT (app/lib/intro.ts) decides before first paint whether
// to play: the homepage, once per browser tab (sessionStorage, so a refresh
// skips it and a new tab plays it again), never with reduced motion. It sets
// html[data-intro]: "play", then this component moves it to "reveal" and
// "finished". The CSS for each state is in globals.css.

// Where the sun sits inside brand/tower-sun.png (CBCLogo_ClaudeSun.png with its
// flat clay background made transparent), measured from its pixels:
// a square 0.309 of the image wide, centered at (0.763, 0.210).
const SUN = { cx: 0.763, cy: 0.21, size: 0.309 };

const EASE_OUT_CUBIC = "cubic-bezier(0.33, 1, 0.68, 1)";
const EASE_IN_OUT_QUART = "cubic-bezier(0.77, 0, 0.175, 1)";

export default function IntroOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const overlay = overlayRef.current;
    const spark = sparkRef.current;
    if (root.dataset.intro !== "play" || !overlay || !spark) return;

    let cancelled = false;
    const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

    async function run() {
      if (!overlay || !spark) return;
      // 1. The spark arrives in the middle of the clay screen.
      await spark.animate(
        [
          { opacity: 0, transform: "scale(0.55) rotate(-50deg)" },
          { opacity: 1, transform: "scale(1) rotate(0deg)" },
        ],
        { duration: 450, easing: EASE_OUT_CUBIC, fill: "forwards" }
      ).finished;
      await wait(100);
      if (cancelled) return;

      // 2. Fly into the hero and shrink onto the sun. Measured now, after
      //    layout has settled.
      const target = document.querySelector<HTMLElement>("[data-intro-target]");
      const sparkBox = spark.getBoundingClientRect();
      if (target) {
        const box = target.getBoundingClientRect();
        const sunX = box.left + SUN.cx * box.width;
        const sunY = box.top + SUN.cy * box.height;
        const dx = sunX - (sparkBox.left + sparkBox.width / 2);
        const dy = sunY - (sparkBox.top + sparkBox.height / 2);
        const scale = (SUN.size * box.width) / sparkBox.width;
        await spark.animate(
          [
            { transform: "translate(0, 0) scale(1)" },
            { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
          ],
          { duration: 750, easing: EASE_IN_OUT_QUART, fill: "forwards" }
        ).finished;
      }
      if (cancelled) return;

      // 3. The page shows through, the tower rises under the spark, and the
      //    rest of the hero fades in (CSS keyed on data-intro="reveal").
      root.dataset.intro = "reveal";
      overlay.style.pointerEvents = "none";
      overlay.animate([{ backgroundColor: "rgb(217 119 87)" }, { backgroundColor: "rgb(217 119 87 / 0)" }], {
        duration: 450,
        easing: "ease-out",
        fill: "forwards",
      });
      await wait(650);
      await spark.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, easing: "ease-out", fill: "forwards" })
        .finished;
      if (cancelled) return;
      root.dataset.intro = "finished";
    }

    run().catch(() => {
      root.dataset.intro = "finished";
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div ref={overlayRef} className="intro-overlay" aria-hidden>
      <span ref={sparkRef} className="intro-spark" />
    </div>
  );
}
