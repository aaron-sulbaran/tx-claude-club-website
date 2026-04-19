// Type shim for @vercel/analytics/next.
// Turbopack has a bug resolving this subpath export, so tsconfig.json redirects
// it to the dist file. TypeScript needs this declaration to find the types.
declare module "@vercel/analytics/next" {
  export { Analytics } from "@vercel/analytics";
}
