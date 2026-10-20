# Portfolio — Juan Matias Gomez Andersen

Landing de portfolio personal. Dark, minimalista, editorial — construida con **Astro 5 + React islands**.

## Stack

- [Astro](https://astro.build) — output estático, JS mínimo (islands solo donde hay interacción)
- React 19 — dos islands: menú mobile y botón copiar email
- Fuentes self-hosted vía @fontsource (Space Grotesk, Inter, Newsreader)
- Tests de contrato de datos con Vitest

## Comandos

```bash
npm install
npm run dev      # servidor de desarrollo en localhost:4321
npm run build    # build estático a dist/
npm run test     # tests de contratos de datos
```

## Estructura

- `src/i18n/es.ts` — todo el copy del sitio (i18n-ready: un futuro `en.ts` habilita toggle de idioma)
- `src/data/` — perfil, skills y proyectos (JSON validado por tests; agregar un proyecto = editar el JSON)
- `src/components/` — secciones Astro
- `src/islands/` — componentes React hidratados selectivamente
