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

  const bgRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const colRef = useRef<HTMLDivElement>(null);

  // Lightweight parallax: background lags scroll (0.45x), the decorative
  // blob drifts slower (0.28x), and the foreground column drifts slightly
  // opposite (-0.1x). rAF-throttled scroll listener, no new dependency.
  // Disabled entirely for prefers-reduced-motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const apply = () => {
      const y = window.scrollY;
      if (bgRef.current) bgRef.current.style.transform = `translateY(${y * 0.45}px)`;
      if (blobRef.current) blobRef.current.style.transform = `translateY(${y * 0.28}px)`;
      if (colRef.current) colRef.current.style.transform = `translateY(${y * -0.1}px)`;
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero" id="top">
      <div id="hero-bg" ref={bgRef}>
        <img data-hero-img="dark" src="/hero/hero-dark.png" alt="" />
        <img data-hero-img="light" src="/hero/hero-light.png" alt="" />
      </div>
      <div className="hero-blob" ref={blobRef} aria-hidden="true" />
      <div className="wrap hero-col" ref={colRef}>
        <div className="hero-meta mono">
          <span>ISSUE / 01 / 26</span>
          <span>PUBLICADO / 2026.05</span>
          <span>IDIOMA / ES</span>
          <span>PÁGINAS / 01 — 08</span>
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
            <li>Base / Trabajamos en remoto · España</li>
            <li>Áreas / Web · Móvil · SEO · Mantenimiento</li>
            <li>Disponibles / Q2 2026 · 2 huecos</li>
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
