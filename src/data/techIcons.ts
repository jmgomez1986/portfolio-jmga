/**
 * Maps technology labels to local icon files under /icons/ (brand SVGs from
 * devicon, MIT; TanStack SVG and Zustand PNG are their official site assets).
 * Values are full filenames because not every brand ships vector data.
 * Labels arrive verbatim from copy/data ("Angular (v11 → v21)", "React.js"),
 * so matching goes through the first normalized token and known synonyms only.
 */
const ALIASES: Record<string, string> = {
  angular: "angular.svg",
  typescript: "typescript.svg",
  javascript: "javascript.svg",
  react: "react.svg",
  node: "nodejs.svg",
  html: "html5.svg",
  css: "css3.svg",
  ngrx: "ngrx.svg",
  tanstack: "tanstack.svg",
  zustand: "zustand.png",
};

/** Cuts a display label down to its leading technology token. */
export function resolveTechIcon(label: string): string | null {
  const token = label
    .toLowerCase()
    .split(/[\s(.]+/)[0]
    .replace(/\.js$/, "")
    .trim();
  return ALIASES[token] ?? null;
}
