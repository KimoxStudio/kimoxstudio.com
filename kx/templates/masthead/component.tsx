"use client";

import { useEffect, useRef } from "react";
import type { TemplateRenderProps } from "@/kx/template-types";
import { kxField, resolveLocalized } from "@/kx/localized";
import { useLang } from "@/lib/lang";
import { useTheme } from "@/lib/theme";
import type { Lang } from "@/kx/langs";
import type { z } from "zod";
import type { mastheadSchema } from "./schema";

type Props = z.infer<typeof mastheadSchema>;

const HERO_SRC: Record<string, string> = {
  light: "/hero/hero-light.png",
  dark: "/hero/hero-dark.png",
};

// Inline script mirroring `app/layout.jsx`'s pre-hydration theme script: it
// runs synchronously as the browser's HTML parser reaches this point in the
// document — before hydration, before the JS bundle even loads — and reads
// the SAME `data-theme` attribute that script already set on <html> (single
// source of truth for theme resolution; this script does not re-read
// localStorage itself). It promotes whichever hero <img>'s `data-src` matches
// the active theme to a real `src`, so the correct hero image is present in
// the very first paint with zero dependency on React state or hydration
// timing. It can't live in app/layout.jsx itself because the <html> script
// runs before <body> — and these <img> elements — exist in the DOM; it has
// to be colocated with the markup it targets.
const HERO_PREHYDRATION_SCRIPT = `
(function(){
  try {
    var theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    var img = document.querySelector('#hero-bg img[data-theme-variant="' + theme + '"]');
    if (img && !img.getAttribute('src')) img.setAttribute('src', img.getAttribute('data-src'));
  } catch (e) {}
})();
`;

// The two <img data-hero-img> elements plus HERO_PREHYDRATION_SCRIPT are
// rendered as a single raw HTML blob via `dangerouslySetInnerHTML` instead
// of as separate JSX nodes. React hydrates `dangerouslySetInnerHTML`
// content as an opaque string — it does not diff individual attributes
// inside it against the server-rendered markup — so the `src` attribute
// HERO_PREHYDRATION_SCRIPT sets synchronously (between browser parse and
// React's hydrate() call) never triggers a hydration attribute-mismatch
// warning. `suppressHydrationWarning` on the two <img> elements themselves
// (the previous approach) does NOT suppress this: it only silences
// mismatches React itself would produce by rendering different values
// server vs client, not mismatches from an external script mutating the
// DOM before hydrate() runs.
const HERO_MARKUP = `
<img data-hero-img data-theme-variant="light" data-src="${HERO_SRC.light}" alt="" aria-hidden="true" decoding="async" />
<img data-hero-img data-theme-variant="dark" data-src="${HERO_SRC.dark}" alt="" aria-hidden="true" decoding="async" />
<script>${HERO_PREHYDRATION_SCRIPT}</script>
`;

export function MastheadComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang, (next: Lang) => void];
  const [hookTheme] = useTheme() as [string, (next: string) => void];
  const sectionRef = useRef<HTMLElement>(null);
  // The hero image's initial `src` is no longer driven by React state at
  // all (see HERO_PREHYDRATION_SCRIPT above, rendered into the page below) —
  // that avoids depending on hydration timing entirely, closing the flash
  // gap for good rather than just narrowing it. This effect only handles
  // *subsequent* theme toggles: `useTheme()` is now backed by a shared
  // external store (kx/stores.ts), so `hookTheme` here updates in lockstep
  // with ThemeToggle's own instance — clicking the navbar toggle re-runs
  // this effect directly, no DOM re-query needed. It lazily assigns `src`
  // to whichever image doesn't have one yet, so switching theme for the
  // first time in a session still fetches/shows the other variant. It's a
  // no-op once both src values are already set, so it never re-triggers a
  // fetch.
  //
  // `hookTheme` is kept as the dependency so this effect re-runs on every
  // toggle (see lib/theme.js), but its render-time *value* is never read
  // inside the effect body: `useSyncExternalStore` always renders with
  // `getServerSnapshot()` (hardcoded 'dark') on the very first post-hydration
  // render, regardless of what the client store resolved to — so for a
  // first-time visitor whose real theme is 'light', `hookTheme` can still be
  // stale ('dark') on the render that queues this effect. Reading
  // `document.documentElement.getAttribute('data-theme')` directly here
  // mirrors HERO_PREHYDRATION_SCRIPT's own DOM-as-source-of-truth approach,
  // so the effect always acts on the true current theme at the moment it
  // actually runs, not a possibly-stale snapshot value.
  useEffect(() => {
    const activeVariant =
      document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const img = sectionRef.current?.querySelector<HTMLImageElement>(
      `img[data-theme-variant="${activeVariant}"]`
    );
    if (img && !img.getAttribute("src")) {
      img.setAttribute("src", HERO_SRC[activeVariant]);
    }
  }, [hookTheme]);
  const lines = resolveLocalized(props.h1, lang, "es") ?? [];
  const meta = resolveLocalized(props.meta, lang, "es") ?? [];
  const facts = resolveLocalized(props.facts, lang, "es") ?? [];

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
        Dual-image parallax layer: two stacked <img data-hero-img> elements,
        one per theme, absolutely positioned on top of each other. Which one
        is *visible* is driven by the same [data-theme] attribute selector
        the rest of the app uses (see .hero-bg-layer in app/landing.css).
        Which one has actually *fetched* (has a real `src`, not just
        `data-src`) is controlled by HERO_PREHYDRATION_SCRIPT, which runs
        synchronously before hydration — not by React — so the correct
        image is present from the very first paint and the inactive variant
        is never downloaded. The `useEffect` above only backfills `src` for
        the *other* variant once the user actually toggles theme.

        Both <img> elements and HERO_PREHYDRATION_SCRIPT are rendered via
        `dangerouslySetInnerHTML={{ __html: HERO_MARKUP }}` on a wrapper div
        instead of as individual JSX nodes — see HERO_MARKUP above for why.
      */}
      <div id="hero-bg" className="hero-bg-layer" data-px="0.45" data-px-clamp="auto" role="presentation">
        <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: HERO_MARKUP }} />
        {/*
          No-JS fallback: HERO_PREHYDRATION_SCRIPT and the useEffect above are
          the only things that ever promote `data-src` to a real `src`, so
          with JS disabled/blocked neither hero <img> above ever loads and
          visitors would only see .hero-bg-layer's flat background-color
          fill. <noscript> content is only parsed/rendered by the browser
          when JS is unavailable, so this plain <img> never fetches (and
          never double-fetches) for JS-enabled visitors.
        */}
        <noscript>
          <img src={HERO_SRC.dark} alt="" aria-hidden="true" />
        </noscript>
      </div>
      <div className="hero-blob" data-px="0.28" aria-hidden="true" />
      <div className="wrap hero-col" data-px="-0.1">
        <div className="hero-meta mono">
          {meta.map((m, i) => (
            <span key={i} {...kxField(`meta.${lang}.${i}`)}>
              {m}
            </span>
          ))}
        </div>
        <h1>
          {lines.map((ln, i) => (
            <span className="line" key={i} {...kxField(`h1.${lang}.${i}`)}>
              {ln}
            </span>
          ))}
        </h1>
        <div className="bottom-grid">
          <p className="sub" {...kxField(`sub.${lang}`)}>
            {resolveLocalized(props.sub, lang, "es")}
          </p>
          <ul className="hero-facts mono">
            {facts.map((f, i) => (
              <li key={i} {...kxField(`facts.${lang}.${i}`)}>
                {f}
              </li>
            ))}
          </ul>
        </div>
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
    </section>
  );
}
