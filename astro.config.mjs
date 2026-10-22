// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Static output: the whole site renders to plain HTML at build time.
// React components hydrate only where interactive (islands).
export default defineConfig({
  // Canonical origin: baked into og:url/canonical in Layout. Update this one
  // line if the Cloudflare workers.dev subdomain changes.
  site: "https://juan-matias.gomez-portfolio.workers.dev",
  output: "static",
  integrations: [react()],
});
