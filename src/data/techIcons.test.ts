import { describe, expect, it } from "vitest";
import { resolveTechIcon } from "./techIcons";
import { es } from "../i18n/es";
import projectData from "./projects.json";
import { existsSync } from "node:fs";
import path from "node:path";

const TEXT_ONLY = new Set(["zustand", "tanstack", "design", "cdk"]);

/**
 * Every technology chip and project tag must resolve to an icon file that
 * actually exists in public/icons, or be whitelisted as text-only (brands
 * without an official logo icon). A mapping typo would surface as a broken
 * <img> on the live site, so the contract is guarded here.
 */
describe("technology icon resolution", () => {
  it("resolves every skill chip to an existing icon or a whitelisted text-only name", () => {
    for (const chip of es.skills.coreChips) {
      assertIconContract(chip, `skill chip "${chip}"`);
    }
  });

  it("resolves every project tag to an existing icon or a whitelisted text-only name", () => {
    for (const project of projectData) {
      for (const tag of project.tags) {
        assertIconContract(tag, `project tag "${tag}"`);
      }
    }
  });
});

function assertIconContract(label: string, source: string): void {
  const key = resolveTechIcon(label);
  if (key === null) {
    expect(TEXT_ONLY, `${source} allows text-only`).toContain(
      label.split(/[\s(.–]/)[0].toLowerCase(),
    );
    return;
  }
  const file = path.join("public", "icons", `${key}.svg`);
  expect(existsSync(file), `${source} should have icon file ${file}`).toBe(true);
}
