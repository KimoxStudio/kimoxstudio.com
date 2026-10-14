"use client";

import { Fragment, useEffect, useRef } from "react";
import type { TemplateRenderProps } from "@/kx/template-types";
import { kxField, resolveLocalized } from "@/kx/localized";
import { useLang } from "@/lib/lang";
import { useTheme } from "@/lib/theme";
import type { Lang } from "@/kx/langs";
import type { z } from "zod";
import type { mastheadSchema } from "./schema";

type Props = z.infer<typeof mastheadSchema>;

const HERO_WIDTHS = [750, 1100, 1495] as const;
const HERO_FULL_WIDTH = 1495;
const HERO_HEIGHT = 1052;

const srcset = (theme: string, ext: string) =>
  HERO_WIDTHS.map((w) => `/hero/hero-${theme}-${w}.${ext} ${w}w`).join(", ");

// The box is object-fit: cover and taller than wide on phones, so the image is
// laid out ~1000 CSS px wide there; 600px steers a phone to the 1100w file
// instead of the largest one.
const HERO_SIZES = "(max-width: 1024px) 600px, 112vw";

// One <picture> per theme. Both are in the server HTML so the preload scanner
// finds the hero without waiting for JS. Their <source>s carry
// `prefers-color-scheme` media so, with no stored theme, only the matching one
// is fetched; the other falls through to a transparent GIF. A stored manual
// theme can disagree with the system one, so `applyHeroTheme` below rewrites
// the media: the active theme's sources always match, the other's never do.
const BLANK = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

const heroPicture = (theme: "light" | "dark") => `
<picture data-hero-pic="${theme}">
  <source type="image/avif" srcset="${srcset(theme, "avif")}" sizes="${HERO_SIZES}" media="(prefers-color-scheme: ${theme})">
  <source type="image/webp" srcset="${srcset(theme, "webp")}" sizes="${HERO_SIZES}" media="(prefers-color-scheme: ${theme})">
  <img data-hero-img src="${BLANK}" width="${HERO_FULL_WIDTH}" height="${HERO_HEIGHT}" alt="" aria-hidden="true" decoding="async" fetchpriority="high">
</picture>`;

// Used by the pre-hydration script (a string, so it can run inline in the
// HTML). The theme effect in MastheadComponent mirrors this logic in TS and
// must be kept in sync with it.
const APPLY_HERO_THEME = `
function applyHeroTheme(theme) {
  document.querySelectorAll('#hero-bg picture[data-hero-pic]').forEach(function (pic) {
    var active = pic.getAttribute('data-hero-pic') === theme;
    pic.querySelectorAll('source').forEach(function (s) {
      if (active) s.removeAttribute('media'); else s.setAttribute('media', 'not all');
    });
  });
}`;

// Runs synchronously while the HTML is parsed, right after the markup above,
// and reads the `data-theme` that app/layout.jsx already resolved (single
// source of truth). When it equals the system preference this changes
// nothing the browser has not already chosen.
const HERO_PREHYDRATION_SCRIPT = `${APPLY_HERO_THEME}
try {
  applyHeroTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
} catch (e) {}
`;

// Rendered as an opaque HTML blob: React hydrates `dangerouslySetInnerHTML`
// content as a string, so the script's DOM edits to the sources do not raise
// a hydration warning.
const HERO_IMAGES_HTML = `${heroPicture("light")}${heroPicture("dark")}
<script>(function(){${HERO_PREHYDRATION_SCRIPT}})();</script>`;

export function MastheadComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang];
  const [hookTheme] = useTheme() as [string, (next: string) => void];
  const sectionRef = useRef<HTMLElement>(null);
  // Initial hero selection is done by HERO_PREHYDRATION_SCRIPT before paint.
  // This effect only handles later theme toggles: it points the sources at the
  // new theme (the DOM attribute is the source of truth, `hookTheme` can lag on
  // the first post-hydration render), which makes the browser fetch that
  // variant on first use. `hookTheme` is the dependency only to re-run it.
  useEffect(() => {
    const active = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    sectionRef.current?.querySelectorAll<HTMLElement>("picture[data-hero-pic]").forEach((pic) => {
      const isActive = pic.dataset.heroPic === active;
      pic.querySelectorAll("source").forEach((src) => {
        if (isActive) src.removeAttribute("media");
        else src.setAttribute("media", "not all");
      });
    });
  }, [hookTheme]);
  const lines = resolveLocalized(props.h1, lang, "es") ?? [];

  // Parallax targets are marked with `data-px="<rate>"` in the markup below
  // (background layer, decorative blob, foreground column) instead of being
  // wired one-by-one through named refs. The effect below just queries
  // `[data-px]` and reads each element's own rate off the attribute, so
  // adding/removing a parallax layer is a markup-only change.
  // rAF-throttled scroll listener, no new dependency. Disabled for
  // prefers-reduced-motion — re-checked live via the media query's change
  // event, not just once at mount, so toggling the OS setting mid-session
  // (no reload) still stops/starts the effect and resets any transform
  // already applied.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const targets = Array.from(section.querySelectorAll<HTMLElement>("[data-px]"));
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ticking = false;
    let active = false;

    // Elements marked `data-px-clamp="auto"` (e.g. the hero background
    // layer) are clamped to their own overflow buffer so the parallax
    // offset never translates them far enough to expose the section's
    // flat background-color at the edge — worse on mobile, where the
    // buffer (--bg-extra) is smaller. `offsetHeight`/`clientHeight` don't
    // change between scroll events for a given element, so the clamp is
    // computed once here (and on resize) instead of read on every scroll
    // frame — reading them inside `apply()` right after the previous
    // frame's `el.style.transform` write would force a synchronous layout
    // reflow on every scroll frame.
    const clampSpares = new Map<HTMLElement, number>();
    const computeClampSpares = () => {
      targets.forEach((el) => {
        if (el.getAttribute("data-px-clamp") === "auto" && el.parentElement) {
          clampSpares.set(el, Math.max(0, (el.offsetHeight - el.parentElement.clientHeight) / 2));
        }
      });
    };
    computeClampSpares();

    const reset = () => {
      targets.forEach((el) => {
        el.style.transform = "";
      });
    };
    const apply = () => {
      ticking = false;
      // A scroll can already have an rAF in flight when `sync` flips
      // `active` off (reduced-motion toggled mid-scroll) and calls
      // `reset()` — bail here so this stale frame doesn't re-apply a
      // transform right after reset() just cleared it.
      if (!active) return;
      const y = window.scrollY;
      targets.forEach((el) => {
        const rate = parseFloat(el.dataset.px ?? "0");
        let v = y * rate;
        const spare = clampSpares.get(el);
        if (spare !== undefined) {
          v = Math.max(-spare, Math.min(spare, v));
        }
        el.style.transform = `translateY(${v}px)`;
      });
    };
    const onScroll = () => {
      if (!active || ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };
    const onResize = () => computeClampSpares();

    const sync = () => {
      active = !mql.matches;
      if (active) apply();
      else reset();
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    mql.addEventListener("change", sync);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mql.removeEventListener("change", sync);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={sectionRef}>
      {/*
        Two stacked <picture>s, one per theme (HERO_IMAGES_HTML). Which one is
        *visible* follows the [data-theme] selector in app/landing.css; which
        one is *fetched* is decided by the <source> media (see above), so the
        hero is in the first HTML, eager, high priority, and the inactive
        theme is not downloaded.
      */}
      <div id="hero-bg" className="hero-bg-layer" data-px="0.45" data-px-clamp="auto" role="presentation">
        <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: HERO_IMAGES_HTML }} />
        {/*
          No-JS fallback: without JS `data-theme` is never set, so the CSS
          hides both pictures. <noscript> content is only rendered when JS is
          unavailable, so this <img> never fetches for JS-enabled visitors.
        */}
        <noscript>
          <img data-hero-img src={`/hero/hero-dark-${HERO_FULL_WIDTH}.webp`} width={HERO_FULL_WIDTH} height={HERO_HEIGHT} alt="" aria-hidden="true" />
        </noscript>
      </div>
      <div className="hero-blob" data-px="0.28" aria-hidden="true" />
      <div className="hero-col" data-px="-0.1">
        <h1>
          {lines.map((ln, i) => (
            <Fragment key={i}>
              {/* Lines are display:block, so this space is invisible but keeps the text content readable; Japanese has no word spaces. */}
              {i > 0 && lang !== "ja" ? " " : null}
              <span className="line" {...kxField(`h1.${lang}.${i}`)}>
                {ln}
              </span>
            </Fragment>
          ))}
        </h1>
        <div className="bottom-grid">
          <p className="sub" {...kxField(`sub.${lang}`)}>
            {resolveLocalized(props.sub, lang, "es")}
          </p>
          <div className="ctas">
            <a className="btn-primary" href="#contact">
              <span {...kxField(`cta1.${lang}`)}>{resolveLocalized(props.cta1, lang, "es")}</span>
              <span className="arr">↗</span>
            </a>
            <a className="btn-secondary" href="#work">
              <span {...kxField(`cta2.${lang}`)}>{resolveLocalized(props.cta2, lang, "es")}</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
