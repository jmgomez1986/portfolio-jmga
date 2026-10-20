// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Static output: the whole site renders to plain HTML at build time.
// React components hydrate only where interactive (islands).
export default defineConfig({
  output: "static",
  integrations: [react()],
});
