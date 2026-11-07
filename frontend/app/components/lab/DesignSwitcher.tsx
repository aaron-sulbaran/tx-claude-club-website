"use client";

import { useSyncExternalStore } from "react";
import { DESIGNS, DESIGN_STORAGE_KEY, type DesignId } from "../../lib/design-lab";

function readCurrent(): DesignId {
  const attr = document.documentElement.getAttribute("data-design");
  return (DESIGNS.find((d) => d.id === attr)?.id ?? "baseline") as DesignId;
}

// The <html data-design> attribute is the single source of truth; the
// pre-paint script sets it before React runs, so read it as an external store.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-design"] });
  return () => observer.disconnect();
}

export default function DesignSwitcher() {
  const current = useSyncExternalStore<DesignId>(subscribe, readCurrent, () => "baseline");

  function choose(id: DesignId) {
    document.documentElement.setAttribute("data-design", id);
    try {
      localStorage.setItem(DESIGN_STORAGE_KEY, id);
    } catch {
      // Storage can be blocked; the attribute still switches this view.
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label="Design direction"
      className="fixed bottom-4 right-4 z-[100] flex gap-1 rounded-full bg-[#141413] p-1 text-[13px] shadow-lg"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      {DESIGNS.map((design) => (
        <button
          key={design.id}
          type="button"
          role="radio"
          aria-checked={current === design.id}
          onClick={() => choose(design.id)}
          className={`rounded-full px-3 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97757] ${
            current === design.id ? "bg-[#FAF9F5] text-[#141413]" : "text-[#FAF9F5]/70 hover:text-[#FAF9F5]"
          }`}
        >
          {design.label}
        </button>
      ))}
    </div>
  );
}
