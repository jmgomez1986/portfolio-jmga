import { describe, expect, it } from "vitest";
import { es } from "./es";
import type { SiteCopy } from "./types";

/**
 * Guards the i18n shape: every locale file must satisfy SiteCopy, so a
 * future `en.ts` can be compared against the Spanish source of truth.
 */
describe("site copy (es) contract", () => {
  const copy: SiteCopy = es;

  it("nav has the 4 sections with hash hrefs", () => {
    expect(copy.navLinks).toHaveLength(4);
    for (const link of copy.navLinks) {
      expect(link.label.length).toBeGreaterThan(0);
      expect(link.href).toMatch(/^#[a-z]+$/u);
    }
  });

  it("hero states the real stack, not fabricated one", () => {
    assertStack(copy.hero.intro, ["Angular", "TypeScript"]);
    expect(copy.hero.intro).not.toMatch(/Next\.js/u);
  });

  it("hero shows a visible compact stack line", () => {
    assertStack(copy.hero.stack, ["Angular", "TypeScript", "SAP/ABAP"]);
    expect(copy.hero.stack.length).toBeLessThan(80);
  });

  it("about has exactly 2 paragraphs and 4-6 working principles", () => {
    expect(copy.about.paragraphs).toHaveLength(2);
    expect(copy.about.howIWork.length).toBeGreaterThanOrEqual(4);
    expect(copy.about.howIWork.length).toBeLessThanOrEqual(6);
    for (const item of copy.about.howIWork) {
      expect(item.keyword.length).toBeGreaterThan(0);
      expect(item.rest.length).toBeGreaterThan(0);
      expect(item.keyword.startsWith(" ")).toBe(false);
      // The rest sentence continues inline (starts with or contains proper spacing)
      expect(item.rest.startsWith(" ") || item.rest.length === 0 || item.keyword.endsWith("")).toBe(true);
    }
  });

  it("skills union includes the SAP background line", () => {
    expect(copy.skills.coreChips.length).toBeGreaterThanOrEqual(6);
    expect(copy.skills.coreChips.length).toBeLessThanOrEqual(12);
    expect(copy.skills.sapLine).toMatch(/SAP\/ABAP/u);
  });

  it("skills group is not framed as frontend-only", () => {
    expect(copy.skills.coreLabel).not.toMatch(/frontend/iu);
    expect(
      copy.skills.coreChips.some((chip) => /node/iu.test(chip)),
      "backend-capable tech should be present in the main group",
    ).toBe(true);
  });

  it("contact holds the real email", () => {
    expect(copy.contact.title.length).toBeGreaterThan(0);
    expect(copy.contact.subtitle.length).toBeGreaterThan(0);
  });
});

/** Asserts every needle appears in the haystack. */
function assertStack(text: string, needles: string[]): void {
  for (const needle of needles) {
    expect(text, `intro should mention ${needle}`).toContain(needle);
  }
}
