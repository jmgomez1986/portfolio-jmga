# Portfolio JMGA — Landing personal (Astro + React islands)

**Objetivo:** landing portfolio personal dark, minimalista y editorial para Juan Matias Gomez Andersen, apuntada al mercado hispanohablante.
**Branch:** `main` (repo nuevo). **Delivery:** `single-pr` eventual + deploy (Cloudflare Pages/Vercel), decisiones del usuario.
**Runner:** `npm run build` (Astro static) + `npm run test` (vitest, contratos de datos).

## Specs

S1. Sitio copy **en español** (mercado hispanohablante). Estructura i18n-ready: todo el copy centralizado en `src/i18n/es.ts` con tipo `SiteCopy`, para agregar `en.ts` + selector de locale a futuro sin refactor.
S2. Paleta: fondo `#0A0A0B`, superficie `#121214`, texto `#EDEDEF`, muted `#9A9AA3`, acento `#7EE787` **solo para interacción** (hover, focus, CTAs, números de sección). Monocromo el resto.
S3. Tipografías: Space Grotesk bold (headings), Inter (body), serif itálica (keyword acento). Fuentes self-hosted (@fontsource), sin requests externos.
S4. Secciones con header único `0N. Título` (número verde + título grande), sin eyebrow ni slogan: 01 About, 02 Skills, 03 Projects, 04 Contact.
S5. Nav fija: "JMGA." + badge "DISPONIBLE PARA TRABAJAR" (pill outline), links internos (About, Skills, Projects, Contact) con scroll suave, botón ghost "Descargar CV" → `/cv.pdf`. Mobile: hamburguesa + overlay full-screen; touch targets ≥ 44px; site 100% responsive (desktop/tablet/mobile).
S6. Hero dos columnas (mobile: stack): izquierda — eyebrow muted "JUAN MATIAS GOMEZ ANDERSEN — PORTFOLIO 2026", headline "Frontend Developer." con la palabra final en serif itálica, intro en español veraz (Angular v11→v21 y TypeScript hoy, expandiendo a React y Node), CTAs "Ver proyectos" (acento sólido) + "Descargar CV" (ghost), links GitHub/LinkedIn con texto visible. Derecha: foto enmarcada, escala de grises por CSS filter con hover a color, borde 1px, esquinas redondeadas.
S7. About: dos párrafos de bio reales + columna "Cómo trabajo" con 4 principios de una línea, keyword en serif itálica verde. Sin código decorativo, sin métricas inventadas, sin stats numéricas fabricadas.
S8. Bio aprobada (texto fuente):
  - P1: "Soy desarrollador de software con más de 14 años de experiencia en IT — los últimos 8 construyendo arquitecturas frontend robustas con Angular, y 6 años anteriores en SAP/ABAP. Mi foco: optimización del rendimiento, gestión predecible del estado global e interfaces rápidas con atención al detalle."
  - P2: "Trabajé en aplicaciones enterprise desde Angular v11 hasta v21 — librerías de componentes con Angular Material, NgRx/RxJS, micro-frontends bajo design systems de cliente, CI/CD y Docker — siempre en equipos Scrum. Hoy trabajo con Angular moderno (Signals, nuevo control flow) y un flujo asistido por IA (Cursor, Copilot, Cline), expandiéndome hacia React (Zustand, Tanstack Query), Node.js y APIs REST."
  - Cómo trabajo: "Performance es un feature fundacional, no un afterthought." / "Los componentes reutilizables componen velocidad de equipo." / "Estado predecible antes que magia — línea base de ingeniería, no un compromiso." / "El craft asistido por IA acelera, nunca baja la vara."
S9. Skills en dos grupos (perfil SAP visible, no oculto):
  - Core Frontend (chips): Angular (v11→21), TypeScript, JavaScript, HTML, CSS, React.js, Zustand, Tanstack Query, Node.js.
  - Línea aparte muted: "También: 6 años de SAP/ABAP enterprise (ABAP POO, BADI's, ALV)".
S10. Projects: filas full-width alternadas (imagen/texto reversible), 2 entradas de ejemplo **placeholder** (usuario edita después; repo/live `#`). Cada fila: preview browser-frame CSS placeholder, título, descripción una línea, 3-4 tags, links "GitHub" + "Live demo" con flechas. La card es data-driven (JSON validado por test): nombre, descripción, tags, repoUrl, liveUrl, imagen (screenshot real cuando exista).
S11. Contact: centrado, "Construyamos algo." grande, email `jmgametal@gmail.com` como link grande con botón copiar (island React), links pill: GitHub (/jmgomez1986), LinkedIn (/in/juanmatiasgomez), CV.
S12. Footer minimal: "JMGA · © 2026 Juan Matias Gomez Andersen", links repetidos muted.
S13. SEO/meta: título + descripción en español, Open Graph básico. Accesibilidad: contraste ≥ 7:1 texto principal, focus visible, `aria-label` en íconos. Sin jerarquía de heading rota (un h1).
S14. Datos duros del usuario (rb Media): LinkedIn https://www.linkedin.com/in/juanmatiasgomez · GitHub https://github.com/jmgomez1986 · email jmgametal@gmail.com · CV `C:\Users\jmgam\Documents\Juan Matias Gomez - CV Frontend Developer.pdf` → `public/cv.pdf`.

## Tasks

- T1 [S2,S3,S13] Scaffold Astro 5 + React... — done ✓ (commit `2cdb48a`)
- T2 [S1,S8,S9,S10,S11,S14] Copy español en `src/i18n/es.ts` + datos en `src/data/` (profile, skills, projects.json con 2 placeholders) + test vitest de contratos de datos. — done ✓ (7/7 tests verdes)
- T3 [S5,S6] Nav (con badge y CTA CV) + hamburguesa island React + Hero con foto grayscale/hover. — done ✓
- T4 [S4,S7,S10,S11,S12] SectionHeader + About + Skills agrupadas + Projects (filas alternadas, preview browser-frame CSS placeholder) + Contact (island copiar email) + Footer. — done ✓
- T5 QA responsive (3 breakpoints), build limpio, tests verdes, revisión de contraste. — build ✓ (1 página, 1.49s), tests ✓ (7/7), QA usuario detectó bug mobile → T8
- T8 [S5] Fix menú hamburguesa mobile: el overlay usaba `z-index: -1` (quedaba detrás del body, menú invisible) y el `backdrop-filter` de la nav creaba un containing block que rompía `position:fixed` del overlay. Fix: blur eliminado de la nav (fondo sólido), overlay z-index 1 con `.nav-inner` en z-index 2 (la barra queda encima, el menú cubre viewport completo) + guard `[hidden]{display:none}`. — done ✓
- L9 → foto en color al toque: era bundle cacheado del browser del usuario (screenshot con footer viejo); la versión con grayscale constante ya estaba deployada.
- T6 Foto real (usuario pasa 2 fotos en color; elegir la del hero; grayscale en CSS). — done ✓ (elegida "foto 02.png" — camiseta azul, mejor luz y rango tonal en B/N que la alternativa tipo DNI; optimizada a webp 564×590/20KB con sharp; commit pendiente de este último cambio)
- T7 Deploy (Cloudflare Pages/Vercel) + dominio/foto/CV reales. — done ✓ Cloudflare (Workers static assets), https://portfolio-jmga.jmgametal.workers.dev — verificado: HTML 200, contenido completo, /cv.pdf 200 application/pdf, /img/hero.webp 200 image/webp. Repo público: https://github.com/jmgomez1986/portfolio-jmga (push confirmado 1ff9f06). Redeploy automático en cada push a main.
- T2..T4 evidencia de implementation: commit `c66b6ef` (feat).

## Log

- L1 (2026-10-20) — Request original: "necesito crear una landing para mi portfolio personal... dark, limpio y con personalidad... descargar el CV y mostrar los proyectos en los que trabajé, con una visualización previa (imagen), link al repositorio de git y link a la url donde está alojado el proyecto. Mi fuerte es Frontend Developer." Diseño diseñado en Google Stitch e iterado en varias rondas en esta conversación.
- L2 — Skills reales del usuario: "Angular, TypeScript, JavaScript, HTML, CSS, Node.js, React.js, Zustand (React), Tanstack Query (React), ABAP, SAP, ABAP BADI's, ABAP ALV, ABAP POO". Bio aprobada de su extracto → S8.
- L3 — Usuario elige TODO en español + i18n-ready: "apunto a trabajos hispano hablantes... me gustaría incluir, por ahí no ahora, un switch para cambiar entre inglés y español... la aplicación ya se puede dejar preparada para soportar eso". → S1.
- L4 — Usuario: "quiero que mi perfil también muestre mi experiencia en SAP, que no es poca" → S9 agrupada + bio con 6 años SAP/ABAP.
- L5 — Usuario sobre proyectos: "pone uno o 2 de ejemplo para después basarme y editarlos, porque no los tengo terminados" → S10 placeholders data-driven.
- L6 — Fotos: tiene 2 en color, pidió grayscale tratado en sitio ("en Astro se le puede aplicar una capa para que sea en escala de grises?") → S6 filter CSS hover color. Pasará las fotos en la implementación.
- L7 — Stack decidido: Astro + React islands (conversación anterior; usuario: "Vamos por Astro"). Razones: sitio estático, JS mínimo, TSX en islands, contenido data-driven.
- L8 — SPA/ABI warnings: sin métricas inventadas (se eliminó el bloque "system-spec.ts" fabricado del diseño); copy solo con facts del CV/extracto del usuario.
