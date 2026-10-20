/** Hard facts from the user — single source of truth for links and assets. */
export const profile = {
  name: "Juan Matias Gomez Andersen",
  initials: "JMGA",
  year: 2026,
  links: {
    email: "jmgametal@gmail.com",
    github: "https://github.com/jmgomez1986",
    githubHandle: "jmgomez1986",
    linkedin: "https://www.linkedin.com/in/juanmatiasgomez",
    linkedinHandle: "juanmatiasgomez",
  },
  /** Public path of the downloadable CV (copied into public/). */
  cvPath: "/cv.pdf",
  /** Public path of the hero portrait (placeholder until the user sends the real one). */
  photo: "/img/hero-placeholder.svg",
  photoAlt: "Retrato de Juan Matias Gomez Andersen",
} as const;
