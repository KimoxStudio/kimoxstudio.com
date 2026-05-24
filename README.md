# kimoxstudio.com

Sitio público del estudio: landing editorial, blog técnico y `/admin` para editar contenido sin tocar el repo a mano.

**Stack:** Next.js 14 (App Router, SSG) + Decap CMS git-based + Markdown en `content/`. Sin base de datos, sin backend propio, sin servicios de pago. Despliegue exclusivo en **Vercel**.

## Características

- **Landing brutalist editorial** en tema oscuro (V3 Poster) — hero, manifiesto, servicios con precios, proyectos, proceso, testimonios, sección "Nosotros" con tarjetas de equipo (tilt 3D), formulario de contacto.
- **Blog técnico** con la misma estética (Familjen Grotesk + IBM Plex Mono): índice con featured + filtros por categoría y detalle de post con `generateStaticParams` (un HTML pre-renderizado por slug).
- **Tres idiomas** ES / EN / JA con conmutador persistido en `localStorage` y `<html lang>` sincronizado.
- **Tema claro / oscuro** con detección automática de `prefers-color-scheme`, conmutador manual, sin flash (script inline antes del primer paint).
- **Cursor custom** suave en landing y blog, deshabilitado en touch.
- **Decap CMS** en `/admin/` que commitea Markdown directamente a GitHub.

## Stack

| Pieza | Por qué |
|---|---|
| Next.js 14 App Router | SSG real para landing y blog → cero coste de runtime en Vercel |
| Decap CMS | Open source, edita Markdown en GitHub vía OAuth, no requiere DB |
| Markdown + YAML frontmatter | Contenido versionado en git, portable a cualquier stack |
| `js-yaml` | Parser de frontmatter en servidor (sin dependencias de Node Buffer en cliente) |
| pnpm | Gestor de paquetes; `pnpm-lock.yaml` versionado |

## Develop

```bash
pnpm install
pnpm dev                 # http://localhost:5173
pnpm dlx decap-server    # en otra terminal: backend local del CMS
```

Con `decap-server` activo, abre <http://localhost:5173/admin/> y los cambios se escriben directos a `content/posts/*.md` y `content/site/studio.json`.

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

### CMS auth en producción

`public/admin/config.yml` usa el GitHub backend a través del proxy OAuth gratuito de Netlify (`api.netlify.com`). Esto es **solo para autenticar** al editor: el sitio entero sigue desplegándose y sirviéndose desde Vercel. Es la opción más simple y no añade infraestructura.

Si en algún momento se prefiere quitar esa dependencia externa:

1. **OAuth shim en Vercel:** una función serverless (3 endpoints: `/auth`, `/callback`, `/success`) que haga el handshake con GitHub. Apuntar `backend.base_url` a la URL de la función.
2. **Decap Bridge** (servicio gestionado, gratuito hasta cierto tráfico): `backend.base_url: "https://oauth.decapbridge.com"`.

## Estructura

```
app/
  layout.jsx              root layout — fuentes, cursor, script de tema
  globals.css             tokens compartidos (dark + light), base, cursor
  page.jsx                landing (importa landing.css)
  landing.css             estilos específicos de la landing
  blog/
    page.jsx              índice del blog (server component → BlogClient)
    blog.css              estilos específicos del blog (mismo lenguaje visual)
    [slug]/page.jsx       detalle de post (SSG vía generateStaticParams)
components/
  LandingClient.jsx       todas las secciones de la landing
  BlogClient.jsx          listado, filtros, featured
  BlogPostClient.jsx      detalle de post + nav
  ThemeToggle.jsx         botón de tema (sol / luna)
lib/
  posts.js                loader fs de markdown (server-only)
  i18n.js                 strings compartidos ES/EN/JA
  lang.js                 useLang hook + t() helper (client)
  cursor.js               hooks de cursor (landing y blog)
  theme.js                useTheme hook (client)
content/
  posts/*.md              entradas del blog (editables desde Decap)
  site/studio.json        metadatos del estudio (editables desde Decap)
public/
  admin/                  shell de Decap CMS + config.yml
  logos/                  variantes del logo (icon, wordmark, etc.)
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

**Desde Decap (recomendado para no-devs):** ir a `/admin/`, login con GitHub, editar visualmente con campos ES/EN/JA, publicar (commit a `master`).

**Desde el editor (devs):** modificar `content/posts/*.md` directamente. El frontmatter es YAML con las claves `slug`, `date`, `read_time`, `glyph`, `featured`, `category` (es/en/ja), `title` (es/en/ja), `excerpt` (es/en/ja), `body` (es/en/ja). El cuerpo se renderiza con `white-space: pre-wrap`, así que los saltos de línea se preservan.

## Notas de diseño

- Paleta y tipografía heredadas del prototipo aprobado (V3 Poster).
- Naranja base `#ff5c28` en oscuro y `#e0461a` en claro para mantener contraste WCAG.
- Sin imágenes en el equipo todavía — placeholders con caras estilizadas que reaccionan al cursor (tilt 3D, no eye-tracking, para que sea sustituible por fotos reales sin perder el efecto).
