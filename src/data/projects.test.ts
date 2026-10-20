import { describe, expect, it } from "vitest";
import projectData from "./projects.json";

/** A flagged example entry may carry stub "#" links. */
function asPlaceholder(project: Record<string, unknown>): boolean {
  return project.placeholder === true;
}

/**
 * Guards the fallback: this JSON is what the user edits to add real
 * projects. A malformed entry must fail the build, not the site.
 */
const projects = projectData as unknown[];

describe("projects data contract", () => {
  it("holds between 1 and 6 entries", () => {
    expect(projects.length).toBeGreaterThanOrEqual(1);
    expect(projects.length).toBeLessThanOrEqual(6);
  });

  it("each entry is a complete, valid project", () => {
    const slugs: string[] = [];
    for (const raw of projects) {
      const project = raw as Record<string, unknown>;

      expect(project.title, "title").toEqual(expect.any(String));
      expect((project.title as string).length).toBeGreaterThan(0);

      expect(project.description, "description").toEqual(expect.any(String));
      expect((project.description as string).length).toBeGreaterThan(0);

      expect(project.tags, "tags").toEqual(expect.any(Array));
      expect(project.tags.length).toBeLessThanOrEqual(4);
      expect(project.tags.length).toBeGreaterThanOrEqual(1);

      // Real entries need real URLs; explicitly flagged placeholders may stub.
      const urlToMatchSha: string = asPlaceholder(project) ? "^#$" : "^https?://\\S+$";
      expect(project.repoUrl, "repoUrl").toEqual(expect.stringMatching(new RegExp(urlToMatchSha, "u")));
      expect(project.liveUrl, "liveUrl").toEqual(expect.stringMatching(new RegExp(urlToMatchSha, "u")));

      slugs.push(project.slug as string);
    }
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
