"use client";

import { useEffect, useRef } from "react";
import type { TemplateRenderProps } from "@/kx/template-types";
import { kxField, resolveLocalized } from "@/kx/localized";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/kx/langs";
import type { z } from "zod";
import type { mastheadSchema } from "./schema";

type Props = z.infer<typeof mastheadSchema>;

export function MastheadComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang, (next: Lang) => void];
  const lines = resolveLocalized(props.h1, lang, "es") ?? [];
  const meta = resolveLocalized(props.meta, lang, "es") ?? [];
  const facts = resolveLocalized(props.facts, lang, "es") ?? [];

  const sectionRef = useRef<HTMLElement>(null);

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
        el.style.transform = `translateY(${y * rate}px)`;
      });
    };
    const onScroll = () => {
      if (!active || ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    const sync = () => {
      active = !mql.matches;
      if (active) apply();
      else reset();
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    mql.addEventListener("change", sync);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mql.removeEventListener("change", sync);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={sectionRef}>
      {/*
        Dual-image parallax layer: two stacked <img data-hero-img> elements,
        one per theme, absolutely positioned on top of each other. Which one
        is visible is driven by the same [data-theme] attribute selector the
        rest of the app uses (see .hero-bg-layer in app/landing.css) — only
        the active theme's <img> is displayed, the other stays display:none.
      */}
      <div id="hero-bg" className="hero-bg-layer" data-px="0.45" role="presentation">
        <img data-hero-img data-theme-variant="light" src="/hero/hero-light.png" alt="" aria-hidden="true" decoding="async" />
        <img data-hero-img data-theme-variant="dark" src="/hero/hero-dark.png" alt="" aria-hidden="true" decoding="async" />
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
