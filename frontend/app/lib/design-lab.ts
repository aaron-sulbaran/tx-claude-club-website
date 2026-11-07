// Design lab: lets Aaron flip between homepage directions on dev and on
// Vercel preview deployments. Production always renders the baseline, and
// none of the lab markup ships there.
export const DESIGN_LAB =
  process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview";

export const DESIGNS = [
  { id: "baseline", label: "Current" },
  { id: "quiet", label: "Quiet" },
  { id: "poster", label: "Poster" },
] as const;

export type DesignId = (typeof DESIGNS)[number]["id"];

export const DESIGN_STORAGE_KEY = "txc-design";

// Runs before first paint so a stored choice never flashes the baseline.
// A ?design=<id> query param wins over the stored choice and is remembered.
export const DESIGN_PREPAINT_SCRIPT = `(function(){try{var ids=${JSON.stringify(
  DESIGNS.map((d) => d.id)
)};var q=new URLSearchParams(location.search).get("design");var s=localStorage.getItem("${DESIGN_STORAGE_KEY}");var v=ids.indexOf(q)>-1?q:s;if(q&&ids.indexOf(q)>-1)localStorage.setItem("${DESIGN_STORAGE_KEY}",q);if(v&&ids.indexOf(v)>-1)document.documentElement.setAttribute("data-design",v);}catch(e){}})();`;
