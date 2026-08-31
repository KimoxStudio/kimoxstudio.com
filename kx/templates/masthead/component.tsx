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

  const bgRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const colRef = useRef<HTMLDivElement>(null);

  // Lightweight parallax: background lags scroll (0.45x), the decorative
  // blob drifts slower (0.28x), and the foreground column drifts slightly
  // opposite (-0.1x). rAF-throttled scroll listener, no new dependency.
  // Disabled for prefers-reduced-motion — re-checked live via the media
  // query's change event, not just once at mount, so toggling the OS
  // setting mid-session (no reload) still stops/starts the effect and
  // resets any transform already applied.
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ticking = false;
    let active = false;

    const reset = () => {
      if (bgRef.current) bgRef.current.style.transform = "";
      if (blobRef.current) blobRef.current.style.transform = "";
      if (colRef.current) colRef.current.style.transform = "";
    };
    const apply = () => {
      ticking = false;
      // A scroll can already have an rAF in flight when `sync` flips
      // `active` off (reduced-motion toggled mid-scroll) and calls
      // `reset()` — bail here so this stale frame doesn't re-apply a
      // transform right after reset() just cleared it.
      if (!active) return;
      const y = window.scrollY;
      if (bgRef.current) bgRef.current.style.transform = `translateY(${y * 0.45}px)`;
      if (blobRef.current) blobRef.current.style.transform = `translateY(${y * 0.28}px)`;
      if (colRef.current) colRef.current.style.transform = `translateY(${y * -0.1}px)`;
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
    <section className="hero" id="top">
      <div id="hero-bg" ref={bgRef} role="presentation" />
      {/*
        The theme-swapped background is a CSS `background-image` (see
        #hero-bg in app/landing.css) driven by the same [data-theme]
        attribute selector the rest of the app uses, not two <img> tags —
        an <img> per theme downloads unconditionally even when hidden via
        CSS, doubling hero image weight. A CSS custom property only
        resolves (and is only fetched) for whichever theme is actually
        active, so this stays flicker-free without any JS/theme hook.
      */}
      <div className="hero-blob" ref={blobRef} aria-hidden="true" />
      <div className="wrap hero-col" ref={colRef}>
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
