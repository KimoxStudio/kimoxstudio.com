# DESIGN.md: kimoxstudio.com

Site design rules, taken from the code (`app/globals.css`, `app/landing.css`, `app/[locale]/blog/blog.css`, `components/`, `kx/templates/`) and from real screenshots (home, blog and post; light and dark theme; 1440 px and 390 px; ES/EN/JA). All values are the ones in the code. If you change the code, update this document.

Scope: home (`app/[locale]/page.tsx` → `kx/templates/*`), blog (`components/BlogClient.jsx`) and post (`components/BlogPostClient.jsx`). The generic templates in `kx/templates/` that the home does not import (`hero`, `card`, `entry`, `stack`, `two-column`, `carousel`, `contact-form`, `entry-list`) use their own inline styles and do **not** follow this system.

---

## 1. Character

1. **Typographic poster.** Section headlines are set in Familjen Grotesk 700, UPPERCASE, at huge size (up to 150–220 px), with line height < 1 and strongly negative tracking. Typography carries the visuals, not photos.
2. **Three typographic voices with fixed roles:** grotesque for reading and shouting, mono for labels and interface, italic serif for the emotional accent (one or two words).
3. **A single color accent** (`--orange`, which is actually blue) plus a secondary green (`--olive`) used sparingly. The rest is a scale of bluish grays.
4. **Grid of rules, no shadows.** Structure is drawn with 1 px borders (`--rule`). Square corners, no `box-shadow`. Depth is expressed with background layers (`--bg` → `--bg-2` → `--bg-3`).
5. **Dark by default**, with a light theme matching it token for token.
6. **Editorial interaction:** custom cursor, `hover` that fills with accent or shifts a few pixels, `→ ↗` arrows on CTAs.

---

## 2. Color

Source: `app/globals.css:2-45`. The theme is applied with `data-theme` on `<html>`; a pre-hydration script sets it (`app/[locale]/layout.jsx:113-124`). Precedence: `localStorage['kimox-theme']`, then `prefers-color-scheme`, and `dark` if all else fails. `ThemeToggle` changes it.

### Tokens

| Token | Dark | Light | Role |
|---|---|---|---|
| `--bg` | `#0a0d13` | `#eef1f6` | Page background; text on accent |
| `--bg-2` | `#10141c` | `#e4e8f0` | Alternate section (process, team), row `hover`, panel, `code` |
| `--bg-3` | `#171d27` | `#d8dee9` | Third level: highlighted step, card `hover`, screenshot frames |
| `--card` | `#12161e` | `#e4e8f0` | **Unused** (0 references) |
| `--ink` | `#eef1f6` | `#10131a` | Headlines, strong text, primary button `hover` |
| `--ink-2` | `#c3cad6` | `#333a48` | Body text, navigation links |
| `--ink-3` | `#838d9e` | `#656d7c` | Metadata, mono labels, footer |
| `--mute` | `#5c6577` | `#88909c` | Form `placeholder` only |
| `--orange` | `#4c7dff` | `#2451d6` | **Accent (blue).** CTAs, italics, numbering, active states |
| `--orange-2` | `#83a3ff` | `#3f6bff` | **Unused** |
| `--orange-tint` | `rgba(76,125,255,.14)` | `rgba(36,81,214,.12)` | Form error message background |
| `--orange-rgb` | `76, 125, 255` | `36, 81, 214` | For `rgba(var(--orange-rgb), α)` |
| `--olive` | `#9fc79f` | `#3f6b45` | Secondary accent: 4th hero line, success, post cover `c-3` |
| `--rule` | `#1e2530` | `#d7dce6` | Default rules and borders |
| `--rule-2` | `#2c3542` | `#c2c9d6` | Borders of chips, labels and frames (slightly more visible) |
| `--cursor-ring` | `rgba(238,241,246,.35)` | `rgba(16,19,26,.35)` | Cursor ring |
| `--nav-bg` | `rgba(10,13,19,.86)` | `rgba(238,241,246,.86)` | Navigation bar (with `blur(14px)`) |
| `--hero-fill` | `#0a0d16` | `#eff0f8` | Fill behind the hero image |
| `--hero-muted` | `#838d9e` | `#333a48` | **Unused** |

### Color rules

- The accent is used on at most one element per visual block: one italic word, the numbering, a price, the main CTA.
- Text on `--orange` or `--olive` is always `--bg`.
- `--olive` never goes on CTAs or links. It is decorative only or signals success.
- Surfaces are distinguished by background (`--bg-2` and `--bg-3`), never by shadow.
- The name `--orange` is historical. **The value is blue.** Do not rename it in a UI PR.

### Measured contrast (WCAG, token values)

| Pair | Dark | Light | Verdict |
|---|---|---|---|
| `--ink` / `--bg` | 17.18 | 16.41 | OK |
| `--ink-2` / `--bg` | 11.80 | 10.08 | OK |
| `--ink-3` / `--bg` | 5.81 | 4.60 | OK (in light, barely) |
| `--ink-3` / `--bg-2` | 5.50 | **4.24** | Fails AA in light for small text (10–11 px labels in process and team) |
| `--orange` / `--bg` (and `--bg` on `--orange`) | 5.26 | 5.75 | OK |
| `--orange` / `--bg-2` | 4.99 | 5.31 | OK |
| `--olive` / `--bg` | 10.32 | 5.45 | OK |
| `--mute` / `--bg` (placeholder) | **3.32** | **2.85** | Fails AA |
| `--ink` / `--orange` (cover `c-5`, 110 px) | 3.26 | **2.85** | In light, does not reach even the 3:1 for large text |
| `--rule` / `--bg` (input bottom border) | 1.26 | 1.21 | Fails the 3:1 for non-text components |

---

## 3. Typography

Loaded with a `<link>` to Google Fonts (`app/[locale]/layout.jsx:138`), not with `next/font`. The TTFs in `app/fonts/` (IBM Plex Mono) are used only by the OG images.

| Family | Weights loaded | Use |
|---|---|---|
| `'Familjen Grotesk', 'Helvetica Neue', sans-serif` | 400, 500, 600, 700 | `body` font. Headlines 700; body 400; quotes and standfirsts 500 |
| `'IBM Plex Mono', ui-monospace, monospace` (`.mono`) | 400, 500, 600 | Navigation, buttons, labels, metadata, chips, forms, footer |
| `'Instrument Serif', serif` italic (`.serif`) | 400 normal and italic | Only `<em>` inside headlines, bridge and closing lines, testimonial quote marks |

No Japanese font is loaded: on `/ja` the CJK glyphs fall back to the system font (verified in the screenshot).

### Scale (actual px from the code)

| Role | Size | Weight / line height / tracking | Notes |
|---|---|---|---|
| Footer wordmark `.footer-big` | `clamp(72px,16vw,220px)` (≤640: `clamp(56px,16vw,96px)`) | 700 / 0.85 / -0.055em | UPPERCASE |
| Contact H2 | `clamp(72px,11vw,200px)` (≤640: `clamp(40px,13vw,72px)`) | 700 / 0.86 / -0.055em | UPPERCASE |
| Blog H1 | `clamp(56px,9vw,160px)` (≤1100: `clamp(48px,11vw,96px)`) | 700 / 0.88 / -0.045em | UPPERCASE |
| Section H2 `.poster-section .head h2` | `clamp(56px,9vw,150px)` | 700 / 0.86 / -0.05em | UPPERCASE |
| Post H1 | `clamp(40px,7vw,110px)` | 700 / 0.92 / -0.045em | Inline style |
| Hero H1 | `clamp(32px,5.2vw,92px)` (≤1024: `clamp(36px,11vw,72px)`) | 700 / 0.9 / -0.04em | 4 staggered lines with `padding-left` |
| Team block H3 | `clamp(40px,6vw,88px)` | 700 / 0.9 / -0.04em | |
| Step number `.step .num` | 88 | 700 / 1 / -0.05em | `opacity .18` except on `hover` or the first one |
| Blog featured H2 | `clamp(36px,4.5vw,64px)` | 700 / 1 / -0.035em | |
| Price | 46 (services), `clamp(40px,5vw,62px)` (web as a service) | 700 / 0.9–1 / -0.04em | |
| Service H3 | 36 | 700 / 1 / -0.03em | UPPERCASE |
| Project name | 32 | 700 / 1 / -0.025em | UPPERCASE |
| Manifesto | `clamp(22px,2.2vw,32px)` | 400 / 1.32 | |
| Testimonial quote | `clamp(24px,2.6vw,36px)` | 500 / 1.22 / -0.02em | `text-wrap: balance` |
| Step H3 / post body H2 | 26 / 32 | 700 / 1 | UPPERCASE |
| Post card title | 24 | 700 / 1.1 / -0.025em | UPPERCASE, `balance` |
| Post standfirst | 24 | 500 / 1.4 | |
| Lead (hero, contact, blog) | 18 | 400 / 1.45 | `--ink-2` |
| Post body | 18 | 400 / 1.6 | max width 780 px |
| Standard body | 16–17 | 400 / 1.5–1.6 | |
| Small body (cards, steps, bio) | 14 | 400 / 1.5–1.6 | |
| Button | 14 (hero: 13; pill: 12) | Mono 600, `.04em`, UPPERCASE | |
| Navigation link | 12 | Mono 500, `.04em` | lowercase, prefixed with `/`: `/proyectos` |
| Label / eyebrow | 11 | Mono, `.12–.14em`, UPPERCASE | `--ink-3` or `--orange` 600 |
| Chip, tag, minimal meta | 10 | Mono, `.04–.12em` | |

### Typography rules

- Headlines in Familjen 700 UPPERCASE. The larger the size, the more negative the tracking (-0.02em at 26 px, -0.055em at 200 px). Display line height between 0.85 and 1.
- The highlighted word in a headline goes in `<em>`: Instrument Serif italic, 400, `--orange`, `text-transform: none`. End the headline with a period: `Lo que <em>construimos</em>.`
- All interface text (buttons, labels, metadata, chips) is Plex Mono, UPPERCASE, with positive tracking. Size 10 to 14 px.
- Two-digit mono numbering: `01`, `02`, `N·02`, `01 / 03`.
- List marker: `+` in `--orange`, never a bullet.
- Weights: Familjen 400, 500 and 700 (600 only in the large email and in names). Plex Mono 400, 500 and 600. **Do not use Plex Mono 700**: it is not loaded.

---

## 4. Spacing and layout

There are no spacing tokens. The recurring values (px) are: 4, 6, 8, 10, 12, 14, 16, 18, 22, 24, 28, 32, 40, 44, 56, 64, 80, 90, 110, 120 and 140. For anything new, use one of these.

### Container

- `.wrap`: `max-width: 1480px; margin: 0 auto; padding: 0 56px` → `0 28px` at ≤1100 px (`globals.css:121-122`).
- Nav: `height: 68px`, `padding: 0 clamp(20px,4vw,40px)` → `0 16px` at ≤480 px.
- Hero column: `--hero-col: min(38vw,600px)` → `min(66%,520px)` (≤1024) → `100%` (≤640, centered).
- Reading measure: post body 780 px; paragraphs from 380 to 940 px depending on the block.

### Section rhythm

| Block | Vertical padding | ≤640 |
|---|---|---|
| `.poster-section` | `110px 0 120px` | `56px 0 56px` |
| `.contact` | `140px 0 100px` | `64px 0 56px` |
| Section header `.head` | `padding-bottom: 18px; margin-bottom: 64px` and bottom rule | same |
| Blog hero | `100px 0 60px` (≤1100: `80px 0 48px`) | same |
| `.marquee` | `28px 0` | same |
| `footer.bot` | `56px 0 32px` (home), `40px 0 32px` (blog) | same |

- Each section closes with `border-bottom: 1px solid var(--rule)`. Alternate sections (process, team) use `background: var(--bg-2)`.
- Column gap in large blocks: `80px` (manifesto, testimonials, contact) → `40px` at ≤1100.

### Grids

| Block | Desktop | ≤1100 | ≤640 |
|---|---|---|---|
| Manifesto | `1.2fr 1fr` | 1 col | |
| Services `.svc-row` | `70px 1.1fr 1.6fr 220px 130px`, gap 32 | `40px 1fr`, gap 14 | |
| Web as a service | `1.05fr 1fr` | 1 col | |
| Projects | `repeat(2,1fr)`, bordered cells | 1 col | |
| Process `.steps` | `1.3fr 1fr 1fr 1fr` | 2 col | 1 col |
| Stats | `repeat(4,1fr)` | 2 col | |
| Team | `repeat(3,1fr)` | 1 col | |
| Testimonials | `1fr 0.65fr` | 1 col | |
| Contact | `1fr 1.2fr` | 1 col | |
| Blog: featured / grid | `1.2fr 1fr` / `repeat(3,1fr)`, gap `56px 32px` | 1 col | |

Cell grids (projects, steps, stats, team) draw their dividers with 1 px `border-right` and `border-bottom` plus `border-left` and `border-top` on the container, with `gap: 0`.

### Breakpoints (`max-width` only)

| Value | What changes |
|---|---|
| 1100 px | All grids go to 1–2 columns; `.wrap` to 28 px |
| 1024 px | Nav: links and CTA are hidden; the hamburger and mobile panel appear. The hero changes mask and column |
| 640 px | Hero centered; process to 1 col; section paddings reduced |
| 480 px | Compact nav: logo text hidden and language selector narrowed |

Capability media queries: `(hover: none), (pointer: coarse)` disables the custom cursor; `(hover: none)` always shows the screenshot hint.

---

## 5. Components

Default radius: **0**. Enumerated exceptions: `.proj-cta`, the photo reset button and the blog's "cargar más" with `999px`; `.proj-logo` with `8px`; modal close and cursor with `50%`. No `box-shadow` anywhere.

### Buttons

| Class | Anatomy | Rest | Hover |
|---|---|---|---|
| `.btn-primary` | Mono 14/600, `.04em`, UPPERCASE, `padding 16px 22px`, gap 16, `.arr` arrow 16 px | `bg --orange`, text `--bg` | `bg --ink` |
| `.btn-secondary` | Same, with `border 1px --ink-2` | Transparent, text `--ink` | `bg --ink`, text `--bg` |
| `.cta-pill` (nav) | Mono 12/600, `padding 10px 18px` | `bg --orange` | `bg --ink` |
| `.ws-cta` / `.featured .read` | Mono 12, `padding 16px 24px` / `14px 22px` | `bg --orange` | `bg --ink` and the `gap` grows from 8 to 14 (or from 14 to 18) |
| Icon (`.theme-toggle`, `.t-nav button`, modal) | 32×32 (`.t-nav`: 44×44), `border 1px --rule` | `--ink-2` | Border and color `--orange` (or `--orange` fill) |
| `:disabled` | | `opacity .55; pointer-events: none` | |

In the hero, the two CTAs share a row (`flex: 1 1 auto`, max 460 px, `padding 14px 18px`, 13 px). Arrows: `→` to navigate and `↗` to contact or link out.

### Links

- Navigation: `--ink-2`, which turns `--orange` on `hover` and in `.active` (scrollspy on the home).
- Link inside the post body: `--orange` with `border-bottom 1px --orange`; on `hover`, `opacity .7`.
- Footer and privacy note: `--ink-3` → `--orange`. The privacy note is underlined (`text-underline-offset: 2px`).
- Block link (large email, service row): on `hover` it shifts with `padding-left 14px` or `gap` and turns `--orange`.

### Navigation (`nav.top`)

Fixed at top (`z-index 50`), `--nav-bg` with `backdrop-filter: blur(14px)`, bottom rule. Order: logo (30 px glyph + "KIMOX·STUDIO" in Familjen 700/17), `/section` links, theme toggle, language selector `ES EN JA` (mono 10 px, active one with `bg --orange`) and `.cta-pill`. At ≤1024 px, the hamburger (36×32) opens a full-screen panel (`top: 68px`, `bg --bg`) with the CTA top right, links in Familjen `clamp(20px,4.4vw,30px)` and the language selector at the bottom.

### Eyebrow / label

`.eyebrow`: mono 11, `.14em`, UPPERCASE, `--ink-3`, with a leading 24×1 px rule in `--orange`. Solid badges (`.ws-badge`, `.sub-badge`, `.featured .badge`, `.reco-flag`) have `bg --orange`, text `--bg`, mono 10–11/600 and padding `5–8px 9–14px`.

### Chips and tags

- Interactive chip (`.svc-extras .tag`, `.budget-chips button`, `.filters button`): mono 11–12, `padding 8–9px 14px`, `border 1px --rule-2`, `--ink-2`. On `hover` the border and text turn `--orange` (or it fills). Active: `bg --orange`, text `--bg`.
- Static tag (project or team technologies): mono 10, `padding 4px 8–9px`, `border 1px --rule-2`, `--ink-3` or `--ink-2`.

### List rows

- `.svc-row`: mono `--orange` number, H3, description with `+` and price on the right (`DESDE`, figure `--orange`, `sin IGIC`). On `hover`: `bg --bg-2`, 3 px left bar `--orange`, CTA in `--orange`. The recommended plan has `border-top 3px --orange`, `bg --bg-2`, a corner flag and a filled CTA.
- `.manifesto .bullets li`: number, text and arrow. On `hover`: color `--orange`, `translateX(8px)` and the arrow appears.

### Project card (`.proj-row`)

Cell with `padding 32px` (≤1100: 28). Order: screenshot frame (3 thumbnails in a 200 px frame, ≤1100: 160, with two fake sheets behind rotated ±2°; on `hover` it rises 3 px and the "ver" hint appears filled with `--orange`), 30 px logo with radius 8 and 32 px UPPERCASE name, URL and year in mono 11 `--ink-3`, "VISITAR →" pill (radius 999; on `hover` it fills with `--orange` and `translateX(4px)`), category in mono 10 `--orange`, 14 px description and tags at the bottom. Clicking opens a modal (`z-index 200`, overlay `rgba(8,8,10,.86)`, frame max 1040 px and `min(65vh,760px)`, `object-fit: contain`, horizontal drag).

### Process step (`.step`)

Cell with `padding 36px 28px`, `min-height 360px`. The first step is highlighted (`bg --bg-3`, `border-top 3px --orange`, opaque number). The rest have the number at 18 % and go to 100 % on `hover`.

### Highlighted panel (`.ws-panel`)

`border 1px --rule` plus `border-top 3px --orange`, `bg --bg-2`, two columns with `padding 44px`. It is the "recommended offer" pattern: the 3 px top rule in accent marks what is highlighted, same as in step 1 and in the recommended plan.

### Testimonials

Instrument Serif quote mark at 200 px in `--orange`, large quote, meta with 48 px square avatar (`bg --orange` and initial), side list of `.pip` (active with `border --orange` and `bg --bg-2`) and 44×44 buttons.

### Team

`.team-card`: 4:5 photo with `border --rule-2` and 3D tilt following the pointer (±6°). To see the "fun" photo, the user scratches off the "serious" photo, painted on a canvas. Round reset button. Below: 22 px name, `01 / 03` index, role in mono `--orange`, 14 px bio and skill tags.

### Contact form

- Label: mono 10, `.12em`, UPPERCASE, `--ink-3`, numbered (`01 · TU NOMBRE`). "Opcional" in `--orange`, right-aligned.
- Field: no box, only `border-bottom 1px --rule`, `padding 14px 0`, 16 px. On focus: `outline: none` and the bottom border turns `--orange`.
- Budget: single-select chips.
- Feedback: `.form-feedback.success` in `--olive` on `--bg-2`; `.error` in `--orange` with `--orange` border and `--orange-tint` background.
- Trap field `.honeypot`, off-screen.

### Footer

`.footer-big`: "KIMOX· STUDIO." on two lines, with the `.orange-bit` and `.olive-bit` pieces. `footer.bot`: mono 11 `--ink-3` row with copyright on the left and email, Blog and "Volver arriba ↑" on the right (wraps onto several lines if it does not fit).

### Blog

- Hero: eyebrow "CUADERNO · N ENTRADAS", poster H1 with `<em>` and 18 px lead.
- Filter bar between rules: "FILTRAR ↓", chips and counter on the right.
- Featured: badge, meta (category `--orange`, date, minutes), H2, excerpt and "LEER EL ARTÍCULO →" button. 320 px visual in `--orange` with 180 px glyph and 45° stripes. On `hover` of the whole row: `bg --bg-2`.
- `.post` card: 220 px cover (≤1100: 180) with 110 px word and cycling color variants `c-1…c-6` (`--orange`, `--bg-2`, `--olive`, `--bg-3`, …), 45° stripes, `N·02` number in the corner, meta, 24 px title, excerpt and "LEER →". On `hover`: `translateY(-4px)`, `--orange` border and the arrow moves forward 4 px.

### Post body (`.post-body`)

780 px column, Familjen 18/1.6 `--ink-2`. Standfirst 24/500 `--ink`. `strong` in `--ink` 700. `em` in Instrument Serif italic `--orange`. Inline `code` in mono 0.88em with `bg --bg-2` and `border --rule`. `pre` the same, with `padding 18px 22px` and 14 px. `ol` with mono `01` counter in `--orange`; `ul` with `+`. `h2` and `h3` at 32 and 22 px in UPPERCASE. `blockquote` with `border-left 2px --orange` and italic. `hr` as a `--rule` rule.

---

## 6. Images and iconography

- **Hero:** 3D illustration per theme (`public/hero/hero-dark.png`, `hero-light.png`). Only the active theme's image is downloaded. Scroll parallax (`data-px="0.45"`) and a blue radial blob `.hero-blob`. At ≤1024 a gradient mask is applied so the text is readable.
- **Projects:** real screenshots in `public/projects/<slug>/` plus a 30 px logo. Thumbnails load lazily (`loading="lazy"`).
- **Team:** real photos in `public/team/` (serious and fun).
- **Blog covers:** no images. They are color blocks with a typographic word and `repeating-linear-gradient(45deg, …)` stripes. Keep that pattern and do not add stock photos.
- **Icons:** almost none. Text glyphs are used (`→ ↗ ↓ ↑ ‹ › + ·`) and 14 px inline SVG only in the theme toggle and the photo reset button. Do not add an icon library.
- **Logo:** `public/logos/icon.svg` (black block with "ks;"), the same in both themes.
- The OG images (`app/opengraph-image.jsx` and the post one) replicate the dark palette in hard-coded hex: Satori does not read CSS variables.

---

## 7. Motion

| Use | Duration | Curve |
|---|---|---|
| Color, background and border on `hover` | `.15s`–`.2s` | `ease` (default) |
| Row and card background, `hover` shifts | `.25s` | `ease` |
| Theme change (`body`) | `.3s` | `ease` |
| Mobile panel, cursor ring, modal, photo tilt | `.22s`–`.5s` | `cubic-bezier(.2,.7,.3,1)` (the house curve) |
| Marquee | `32s` | `linear infinite` |
| Cursor | rAF lerp, factor 0.18 | JS (`lib/cursor.js`) |

- On `hover`, the maximum shift is 3 to 8 px (`translateX`/`translateY`). No scaling on `hover`; only the modal enters from `scale(.97)`.
- Custom cursor: an 8 px dot in `--orange` and a 36 px ring that grows to 64 px over interactive elements (`a, button, input, textarea, [data-hover]`). Hidden on touch devices. On the home it is `#cursor-ring`; on the blog, `#cursor-trail`.

---

## 8. Observed accessibility

- **Focus:** there is no `:focus-visible` rule in the CSS. The keyboard shows the browser's default ring (verified: `outline: rgb(0, 95, 204) auto 1px` on nav links and on `.btn-primary`). On `--orange` or dark `--bg` it is barely visible. Inputs cancel the `outline` and only change the bottom border color.
- **Reduced motion:** respected only in the hero parallax (JS, listens for live changes; `kx/templates/masthead/component.tsx:110`) and in the modal animation (`landing.css:645`). **Still active:** the infinite marquee, `scroll-behavior: smooth`, the inertial cursor, the 3D photo tilt and the `hover` shifts.
- **Theme:** respects `prefers-color-scheme` the first time; after that the saved choice wins.
- **Mobile menu:** when open, the rest of the page is `inert`, scroll is locked, and focus and Escape are handled (`components/Nav.jsx`).
- **Touch targets:** the theme toggle (32×32), the hamburger (36×32), the language selector (about 28 px tall) and the modal buttons (32×32) are below 44×44. Only `.t-nav button` reaches 44.
- **Minimum text:** 10–11 px UPPERCASE mono is common for metadata and labels.
- **Images:** project thumbnails and logos have `alt=""` (decorative); modal screenshots, `alt="Captura N de <proyecto>"`; the hero, `aria-hidden`.

---

## 9. Usage rules

**Do**
- Always use tokens (`var(--…)`) for color; for transparency, `rgba(var(--orange-rgb), α)`. Check every new combination in both themes.
- Section headlines: Familjen 700 UPPERCASE + one word in `<em>` serif `--orange` + final period.
- Interface in Plex Mono UPPERCASE with positive tracking and `01` numbering.
- Structure with 1 px `--rule` rules and square corners. Highlight with `border-top: 3px solid var(--orange)` and `bg --bg-2`/`--bg-3`.
- Put content inside `.wrap`. Use the existing breakpoints (1100, 1024, 640, 480) and the spacing values from §4.
- Buttons: reuse `.btn-primary` or `.btn-secondary` (with `hover` to `--ink`) and add a `→` or `↗` arrow.
- Transitions of `.2s` or `.25s`. For panel or modal entrances, `cubic-bezier(.2,.7,.3,1)`.
- Add `data-hover` to any clickable element that is not an `a` or `button`, so the custom cursor detects it.
- For any new component: add a visible `:focus-visible` (e.g. `outline: 2px solid var(--orange); outline-offset: 2px`) and disable its animation with `prefers-reduced-motion: reduce`.

**Don't**
- Do not use loose hex values in CSS or in `style={{}}`, and do not create new grays: `--ink-2`, `--ink-3`, `--rule` and `--rule-2` are more than enough.
- Do not use `box-shadow`, decorative gradients (except the 45° stripes and the hero blob) or radii: pills are the exception and are all already listed.
- Do not use `--olive` on CTAs, links or errors. Do not add a third accent color.
- Do not put text in `--mute` except placeholders, nor small `--ink-3` text on `--bg-2` in the light theme.
- Do not use Plex Mono 700 or any Familjen weight other than 400/500/600/700.
- Do not use `cursor: pointer` (the site hides the native cursor) or remove the `outline` without providing an alternative.
- Do not add inline styles to new components. Create a class in the section's stylesheet.
- Do not reuse generic class names (`.hero`, `.sub`, `.head`) in a new stylesheet: see §10.

---

## 10. Detected inconsistencies

1. **`.hero` collision between global sheets.** `app/landing.css:2` and `app/[locale]/blog/blog.css:6` define `.hero`, `.hero h1` and `.hero .sub`. Both are global CSS and stay loaded after client-side navigation. Verified: going from the blog to the home via the logo, the home hero gets `padding-top: 100px` from the blog and all its content drops about 27 px (`clientnav-blog-to-home-dark.png`).
2. **`footer.bot` defined twice with different values:** `landing.css:1231` (`padding 56px 0 32px`, `.04em`, no rule) and `blog.css:350` (`40px 0 32px`, `.06em`, `border-top`). The `flex-wrap` rule is also duplicated (`landing.css:1245`, `blog.css:365`).
3. **Duplicated eyebrow:** `.eyebrow` in `globals.css:125` and `.hero .eyebrow` in `blog.css:10`, with the same values copied.
4. **Duplicated `.wrap` at ≤1100:** `globals.css:122` and `landing.css:1278`.
5. **Dead tokens:** `--card`, `--orange-2` and `--hero-muted` (`globals.css:7,13,21,29,35,43`) have 0 uses. `--mute` has 1 (placeholder).
6. **Misleading name:** `--orange`, `--orange-2`, `--orange-tint`, `--orange-rgb` and `.orange-bit` are blue.
7. **Hard-coded colors that bypass the tokens:**
   - `landing.css:48`: `.hero-blob` with `rgba(76,125,255,.28)` (the dark-theme blue also in light; should be `rgba(var(--orange-rgb), .28)`).
   - `landing.css:573`: modal overlay `rgba(8,8,10,.86)`.
   - `landing.css:988`: photo reset button `rgba(14,12,10,.7)`, a warm black outside the palette.
   - `blog.css:139,201`: stripes `rgba(0,0,0,.08)`.
   - `kx/templates/page/component.tsx:23-24`: `#0a0a0a`, `#ffffff`, `#f5f5f5` (branch not used by the home, which passes `chrome: "none"`).
8. **Inline styles instead of classes:** `components/BlogPostClient.jsx:29-109` (post header, H1, meta and column with sizes and fonts repeated by hand) and `components/BlogClient.jsx:152-173` ("cargar más" button: `border 1.5px var(--ink)`, `borderRadius: 999`, Familjen 14/500. It is the only button with a 1.5 px border and a non-mono font).
9. **Misaligned breakpoints:** the nav collapses at ≤1024 (`globals.css:199,271`), but `Nav.jsx:112` closes the panel with `min-width: 1101px`. Between 1025 and 1100 px, a menu opened before resizing stays hidden but keeps `inert` and the scroll lock (inferred from the code, not reproduced). The rest of the layout changes at 1100, not 1024.
10. **Plex Mono 700 not loaded:** used in `landing.css:328,381` and `blog.css:323` (the `+` markers), but the `<link>` only requests 400;500;600 (`layout.jsx:138`), so the browser synthesizes the bold.
11. **Inconsistent CTA weight:** `.ws-cta` (`landing.css:290`) does not declare `font-weight` (stays at 400), while the other CTAs use 600. Tracking `.08em` versus `.04em`.
12. **Native cursors that contradict `cursor: none`:** `landing.css:612` (`grab`), `975` (`crosshair`) and `992` (`pointer`).
13. **No focus styles** in the entire CSS (only `landing.css:1174`, which also removes the `outline`). See §8.
14. **Partial `prefers-reduced-motion`:** only `landing.css:645` and the JS parallax. The marquee (`landing.css:150`) and `scroll-behavior: smooth` (`globals.css:49`) ignore it.
15. **Insufficient contrast:** `--mute` placeholder (3.32 and 2.85); `--ink-3` on `--bg-2` in light (4.24); `.post.c-5` cover with `--ink` on `--orange` in light (2.85, `blog.css:195-196`); input border `--rule` (≈1.2:1).
16. **Web-as-a-service panel on mobile:** `.ws-main` and `.ws-includes` keep `padding: 44px` at 390 px (`landing.css:253,305`; no override at ≤640). The text ends up in a column about 240 px wide (screenshot `hm-light-04.png`).
17. **Mixed font-family quoting:** single quotes in `globals.css` and `blog.css`, double in `landing.css`, and no quotes in the `style={{}}` values (`'IBM Plex Mono, monospace'`). It works, but it makes search and replace harder.
