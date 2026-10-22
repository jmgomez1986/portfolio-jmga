/**
 * Shape of every translated string in the site.
 * Adding a new locale = create `en.ts` with the same shape; no component changes.
 */
export interface HowIWorkItem {
  /** One or two words emphasized in italic serif. */
  keyword: string;
  /** Rest of the sentence. */
  rest: string;
}

export interface ProjectEntry {
  slug: string;
  title: string;
  description: string;
  /** Max 4 tags. */
  tags: string[];
  repoUrl: string;
  liveUrl: string;
  /** Public path to the preview image, or "css" for the built-in placeholder mock. */
  image?: string;
  /** Marks user-replaceable example entries. */
  placeholder?: boolean;
  /** Editor-facing note shown only in data files, never on the site. */
  note?: string;
}

export interface SiteCopy {
  badge: string;
  cvCta: string;
  navLinks: Array<{ label: string; href: string }>;
  hero: {
    eyebrow: string;
    titlePlain: string;
    titleItalic: string;
    intro: string;
    /** Compact stack line shown under the intro. */
    stack: string;
    ctaPrimary: string;
    ctaSecondary: string;
    socials: { github: string; linkedin: string; email: string };
  };
  about: {
    title: string;
    paragraphs: string[];
    howIWorkTitle: string;
    howIWork: HowIWorkItem[];
  };
  skills: {
    title: string;
    intro: string;
    coreLabel: string;
    coreChips: string[];
    sapLine: string;
  };
  projects: {
    title: string;
    intro: string;
    repoLabel: string;
    liveLabel: string;
    placeholderNote: string;
  };
  contact: {
    title: string;
    subtitle: string;
    copyLabel: string;
    copiedLabel: string;
  };
  footer: {
    line: string;
  };
}
