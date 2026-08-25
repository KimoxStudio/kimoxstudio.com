# kimoxstudio.com

Sitio público del estudio: landing editorial y blog técnico.

**Stack:** Next.js (App Router) con contenido estático — la landing (`app/page.tsx`) tiene el copy escrito directamente en el código, sin CMS ni base de datos — + Markdown en `content/posts` para el blog. Sin backend propio, sin servicios de pago salvo Resend/Upstash para el formulario de contacto. Despliegue exclusivo en **Vercel**.

> Hasta 2026-08 el sitio corría sobre un framework propio de CMS (**kimox-fw**) con un admin en `/admin` para editar el contenido en vivo. Se eliminó en dos fases: primero la landing pasó a ser una página estática con el contenido embebido (`app/page.tsx`), después se retiró el framework entero (`/admin`, las rutas `/api/kx/*`, el proveedor de contenido en git, etc. — ver el historial de commits). Los componentes visuales de cada sección de la landing siguen viviendo en `kx/templates/*` porque son reutilizables y no dependen del framework, solo de React/Zod.

## Características

- **Landing brutalist editorial** en tema oscuro (V3 Poster) — hero, manifiesto, servicios con precios, proyectos, proceso, testimonios, sección "Nosotros" con tarjetas de equipo (tilt 3D), formulario de contacto.
- **Blog técnico** con la misma estética (Familjen Grotesk + IBM Plex Mono): índice con featured + filtros por categoría y detalle de post con `generateStaticParams` (un HTML pre-renderizado por slug).
- **Tres idiomas** ES / EN / JA con conmutador persistido en `localStorage` y `<html lang>` sincronizado.
- **Tema claro / oscuro** con detección automática de `prefers-color-scheme`, conmutador manual, sin flash (script inline antes del primer paint).
- **Cursor custom** suave en landing y blog, deshabilitado en touch.

## Stack

| Pieza | Por qué |
|---|---|
| Next.js App Router | landing y blog rápidos → bajo coste de runtime en Vercel |
| `app/page.tsx` + `kx/templates/*` | Landing estática: copy hardcodeado en el código, secciones reutilizables tipadas con Zod (sin CMS) |
| Markdown + YAML frontmatter | Contenido del blog versionado en git, portable a cualquier stack |
| `js-yaml` | Parser de frontmatter en servidor (sin dependencias de Node Buffer en cliente) |
| pnpm | Gestor de paquetes; `pnpm-lock.yaml` versionado |

## Develop

```bash
pnpm install
pnpm dev                 # http://localhost:5173
```

## Build

```bash
pnpm build               # genera .next/ + páginas estáticas
pnpm start               # sirve la build de producción
```

El build pre-renderiza la landing, el índice del blog y un HTML estático por cada post.

## Deploy (Vercel)

Es la **única plataforma de despliegue** del proyecto. No hay `netlify.toml`, `Dockerfile`, GitHub Actions ni cualquier otro pipeline. Vercel detecta Next.js solo — cero configuración.

```bash
vercel link              # ya hecho
git push                 # despliegue automático
```

## Estructura

```
app/
  layout.jsx              root layout — fuentes, cursor, script de tema
  globals.css             tokens compartidos (dark + light), base, cursor
  page.tsx                landing estática (copy hardcodeado, monta kx/templates/*)
  landing.css             estilos específicos de la landing
  opengraph-image.jsx     imagen OG generada (next/og)
  actions/
    contact.js            Server Action del formulario de contacto
  blog/
    page.jsx               índice del blog (server component → BlogClient)
    blog.css                estilos específicos del blog (mismo lenguaje visual)
    [slug]/page.jsx          detalle de post (SSG vía generateStaticParams)
components/
  Nav.jsx                  navegación
  BlogClient.jsx           listado, filtros, featured
  BlogPostClient.jsx       detalle de post + nav
  TeamCardPhoto.jsx        tarjeta de equipo con tilt 3D
  ThemeToggle.jsx          botón de tema (sol / luna)
lib/
  posts.js                 loader fs de markdown (server-only)
  i18n.js                  strings compartidos ES/EN/JA (nav, footer)
  lang.js                  useLang hook + t() helper (client)
  cursor.js                hooks de cursor (landing y blog)
  theme.js                 useTheme hook (client)
  ratelimit.js             rate limit del formulario de contacto (Upstash)
content/
  posts/*.md               entradas del blog (markdown)
kx/
  templates/*/component.tsx  componentes de cada sección de la landing (React + Zod, sin CMS)
  templates/*/schema.ts      forma de las props de cada sección (Zod)
  stores.ts                  store de idioma compartido entre las secciones montadas
  client-store.ts            store cliente genérico (useSyncExternalStore) usado por stores.ts
  localized.ts                helpers Zod para campos {es, en, ja}
  template-types.ts           tipos de las props que reciben los componentes
public/
  logos/                   variantes del logo (icon, wordmark, etc.)
```

## Formulario de contacto

El form en `/#contact` envía a un **Server Action** (`app/actions/contact.js`) que:

1. Valida con `zod`.
2. Comprueba un **honeypot** (campo `website` oculto) y un **time gate** (mínimo 2 s desde que se cargó la página).
3. Aplica **rate limit por IP** (3/hora, 10/día) usando Upstash Ratelimit.
4. Envía el email vía **Resend** (`replyTo` = email del visitante).

Variables de entorno (ver `.env.example`):

| Variable | Para qué | Requerida |
|---|---|---|
| `RESEND_API_KEY` | Clave API de Resend | sí (producción) |
| `RESEND_FROM` | Remitente verificado en Resend | recomendada |
| `RESEND_TO` | Destinatario, default `kimoxstudio@gmail.com` | opcional |
| `UPSTASH_REDIS_REST_URL` o `KV_REST_API_URL` | Endpoint REST del Redis para rate limit | sí (producción) |
| `UPSTASH_REDIS_REST_TOKEN` o `KV_REST_API_TOKEN` | Token REST | sí (producción) |

En desarrollo, si faltan las variables, el server action **loguea el mensaje a la consola del servidor** en vez de enviar email, y el rate limit se salta. Útil para probar sin dar de alta nada.

Setup productivo, una vez:

**Resend (manual):**

```bash
vercel env add RESEND_API_KEY production
vercel env add RESEND_FROM production
vercel env add RESEND_TO production
```

**Redis para rate limit — vía Vercel Marketplace (recomendado):**

Vercel dashboard → tu proyecto → **Storage** → **Create** → **Upstash Redis**. Vercel inyecta `KV_REST_API_URL` y `KV_REST_API_TOKEN` automáticamente; el código los lee sin más. No necesitas crear cuenta de Upstash separada.

**Alternativa Upstash directo:**

Crea Redis en <https://upstash.com>, copia URL + token, y mete `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` con `vercel env add`.

Local: `cp .env.example .env.local` y edita con tus credenciales.

## Editar contenido

**Landing:** el copy vive directamente en `app/page.tsx` (props hardcodeadas por sección, en los tres idiomas ES/EN/JA). Para cambiarlo, edita ese archivo y haz commit — no hay editor visual ni previsualización en vivo.

**Blog:** editar `content/posts/*.md` directamente. El frontmatter es YAML con las claves `slug`, `date`, `read_time`, `glyph`, `featured`, `category` (es/en/ja), `title` (es/en/ja), `excerpt` (es/en/ja), `body` (es/en/ja). El cuerpo se renderiza con `white-space: pre-wrap`, así que los saltos de línea se preservan.

## Notas de diseño

- Paleta y tipografía heredadas del prototipo aprobado (V3 Poster).
- Naranja base `#ff5c28` en oscuro y `#e0461a` en claro para mantener contraste WCAG.
- Fotos reales del equipo con tilt 3D y máscara de "revelar foto divertida" que sigue al cursor; las posiciones de encuadre se controlan con `objectPositionSerious` / `objectPositionFun` por miembro en `lib/i18n.js`.
