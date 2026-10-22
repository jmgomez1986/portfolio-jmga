/**
 * Maps technology labels to local icon slug files under /icons/<slug>.svg
 * (brand SVGs from devicon, MIT). Labels arrive verbatim from copy/data
 * ("Angular (v11 → v21)", "React.js"), so matching goes through the first
 * normalized token and known synonyms only.
 */
const ALIASES: Record<string, string> = {
  angular: "angular",
  typescript: "typescript",
  javascript: "javascript",
  react: "react",
  node: "nodejs",
  html: "html5",
  css: "css3",
  ngrx: "ngrx",
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
