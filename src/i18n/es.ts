import type { SiteCopy } from "./types";

export const es: SiteCopy = {
  badge: "Disponible para trabajar",
  cvCta: "Descargar CV",
  navLinks: [
    { label: "Sobre mí", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Proyectos", href: "#projects" },
    { label: "Contacto", href: "#contact" },
  ],
  hero: {
    eyebrow: "Juan Matias Gomez Andersen — Portfolio 2026",
    titlePlain: "Frontend",
    titleItalic: "Developer.",
    intro:
      "Especializado en aplicaciones web de alto rendimiento y arquitecturas frontend robustas con Angular (v11 → v21) y TypeScript — expandiendo hacia React y Node.",
    stack: "Angular · TypeScript · React · Node.js — base SAP/ABAP",
    ctaPrimary: "Ver proyectos",
    ctaSecondary: "Descargar CV",
    socials: { github: "GitHub", linkedin: "LinkedIn", email: "jmgametal@gmail.com" },
  },
  about: {
    title: "Sobre mí",
    paragraphs: [
      "Soy desarrollador de software con más de 14 años de experiencia en IT — los últimos 8 construyendo arquitecturas frontend robustas con Angular, y 6 años anteriores en SAP/ABAP. Mi foco: optimización del rendimiento, gestión predecible del estado global e interfaces rápidas con atención al detalle.",
      "Trabajé en aplicaciones enterprise desde Angular v11 hasta v21 — librerías de componentes con Angular Material, NgRx/RxJS, micro-frontends bajo design systems de cliente, CI/CD y Docker — siempre en equipos Scrum. Hoy trabajo con Angular moderno (Signals, nuevo control flow) y un flujo asistido por IA (Cursor, Copilot, Cline, OpenCode y Gentle AI), expandiéndome hacia React (Zustand, Tanstack Query), Node.js y APIs REST.",
    ],
    howIWorkTitle: "Cómo trabajo",
    howIWork: [
      { keyword: "Performance", rest: " es un feature fundacional del producto, no un afterthought." },
      { keyword: "Buenas prácticas", rest: " en cada commit — no solo en el README." },
      { keyword: "Trabajo en equipo", rest: " y colaboración: scrum real, code review y feedback honesto." },
      { keyword: "Componentes reutilizables", rest: " que el próximo proyecto hereda, no reescribe." },
      { keyword: "Estado predecible", rest: " antes que magia." },
      { keyword: "IA asistida", rest: " acelera el oficio; las decisiones siguen siendo mías." },
    ],
  },
  skills: {
    title: "Skills",
    intro:
      "Foco frontend con 8 años de Angular, y la base backend creciendo: Node.js y APIs REST.",
    coreLabel: "Stack principal",
    coreChips: [
      "Angular (v11 → v21)",
      "TypeScript",
      "JavaScript",
      "React.js",
      "Zustand",
      "Tanstack Query",
      "Node.js",
      "HTML",
      "CSS",
      "Tailwind",
    ],
    sapLine: "También: 6 años de SAP/ABAP enterprise (ABAP POO, BADI's, ALV).",
    toolsLabel: "Herramientas de trabajo",
    toolsChips: ["Git", "GitHub", "Jira", "Postman"],
  },
  projects: {
    title: "Proyectos",
    intro: "Una selección del trabajo que me representa — repositorio y demo para cada uno.",
    repoLabel: "GitHub",
    liveLabel: "Demo",
    placeholderNote: "Ejemplo — reemplazable",
  },
  contact: {
    title: "Construyamos algo.",
    subtitle: "Abierto a roles frontend senior, arquitectura de sistemas y productos digitales de alto impacto.",
    copyLabel: "Copiar email",
    copiedLabel: "¡Copiado!",
  },
  footer: {
    line: "© 2026 Juan Matias Gomez Andersen.",
  },
};
