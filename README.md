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
- `scripts/generate-og.mjs` — regenera `public/og-image.png` (la tarjeta de link compartido; correr: `node scripts/generate-og.mjs`)
- `public/icons/` — logos de tecnologías (devicon, MIT) servidos localmente, sin CDN externo

## Deploy

Cloudflare Workers Builds construye y publica automáticamente en cada push a `main`
(`juan-matias.gomez-portfolio.workers.dev`). El deploy tarda ~3 minutos.

- **URL canónica**: vive en una sola línea — `site` en `astro.config.mjs` — y de ahí
  se derivan `og:url`, `og:image` (absoluta) y `canonical` en `Layout.astro`.
  Si cambia el dominio, es el único lugar a editar.
- Tras un cambio de subdominio `workers.dev` es normal ver
  `ERR_SSL_VERSION_OR_CIPHER_MISMATCH` por ~30-60 min: emisión de certificado TLS,
  no es un error de configuración.

## Decisiones

- **Disponibilidad visible en toda pantalla**: badge con punto pulsante en el nav
  (desktop) y pill equivalente en el hero (≤860px). El nav badge se oculta en
  mobile porque el espacio es poco y el hero toma su lugar sin scroll.
- **Social card completa** (`og:image`, `canonical`, `twitter:card`): los crawlers
  de WhatsApp/LinkedIn no ejecutan JS ni resuelven rutas relativas, por eso la
  imagen y la URL van absolutas, generadas a partir de `Astro.site`.
- **Scroll-reveal por sección**: el movimiento es 100% CSS (fade + translateY), el
  disparo es un `IntersectionObserver` de una sola pasada. No se usó
  `animation-timeline: view()` (puro CSS) porque el soporte aún no es parejo
  (Firefox y Safari antiguos). Doble seguro de contenido: la clase `reveal-js`
  solo existe si el script corre — sin JS (o si falla) nada se oculta — y
  `prefers-reduced-motion` remite la animación a aparición instantánea.
- **Iconos monocromos con color en hover**: en un diseño dark con un solo accent
  verde, los logos a color permanente pelearían con la identidad; al revés
  funcionan: gris tenue de base, color real recién en hover. Estado estable =
  monocromo, interacción = acento (mismo lenguaje que el resto del sitio).
- **Resolución de íconos con contrato testeado** (`src/data/techIcons.test.ts`):
  cada chip/tag debe resolver a un archivo real en `public/icons` o estar en la
  whitelist text-only (marcas sin logo oficial: Zustand, TanStack Query, Design
  System, CDK). Un typo en el mapa sería una imagen rota en producción; hoy es
  test rojo en vitest.
