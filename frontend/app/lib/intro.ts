// Runs in <head> before first paint, so a first visit never flashes the page
// before the intro and a repeat visit never flashes the intro. Plays on the
// homepage once per browser tab: sessionStorage survives a refresh but not a
// new tab. Skipped for reduced motion. If the intro never finishes (script
// error, very slow hydration), the 6s fail-safe shows the page anyway.
export const INTRO_STORAGE_KEY = "txc-intro-seen";

export const INTRO_PREPAINT_SCRIPT = `(function(){try{if(location.pathname!=="/")return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;if(sessionStorage.getItem("${INTRO_STORAGE_KEY}"))return;sessionStorage.setItem("${INTRO_STORAGE_KEY}","1");var d=document.documentElement;d.setAttribute("data-intro","play");setTimeout(function(){if(d.getAttribute("data-intro")!=="finished")d.setAttribute("data-intro","finished")},6000)}catch(e){}})();`;
