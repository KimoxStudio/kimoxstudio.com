"use client";

import type { TemplateRenderProps } from "@kx/core";
import { resolveLocalized } from "@kx/registry";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/kx/langs";
import type { z } from "zod";
import type { mastheadSchema } from "./schema";

type Props = z.infer<typeof mastheadSchema>;

// Re-homes the Hero section. heroBlocks/metaBlocks were inline per-language
// arrays in the original component (view logic, not dict content) — kept as-is;
// only the dict reads (h1 lines, sub, ctas, meta.location) become props.
export function MastheadComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang, (next: Lang) => void];
  const lines = resolveLocalized(props.h1, lang, "es") ?? [];
  const location = resolveLocalized(props.location, lang, "es") ?? "";
  const heroBlocks = {
    es: [
      { k: "ISSUE", v: "01 / 26" },
      { k: "PUBLICADO", v: "2026.05" },
      { k: "IDIOMA", v: lang.toUpperCase() },
      { k: "PÁGINAS", v: "01 — 08" },
    ],
    en: [
      { k: "ISSUE", v: "01 / 26" },
      { k: "PUBLISHED", v: "2026.05" },
      { k: "LANGUAGE", v: lang.toUpperCase() },
      { k: "PAGES", v: "01 — 08" },
    ],
    ja: [
      { k: "号数", v: "01 / 26" },
      { k: "発行", v: "2026.05" },
      { k: "言語", v: lang.toUpperCase() },
      { k: "ページ", v: "01 — 08" },
    ],
  };
  const metaBlocks = {
    es: [
      { k: "Base", v: location },
      { k: "Áreas", v: "Web · Móvil · SEO · Mantenimiento" },
      { k: "Disponibles", v: "Q2 2026 · 2 huecos" },
    ],
    en: [
      { k: "Based", v: location },
      { k: "Fields", v: "Web · Mobile · SEO · Maintenance" },
      { k: "Available", v: "Q2 2026 · 2 slots" },
    ],
    ja: [
      { k: "拠点", v: location },
      { k: "分野", v: "ウェブ · モバイル · SEO · 保守" },
      { k: "対応中", v: "Q2 2026 · 2枠" },
    ],
  };
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="top-meta">
          {heroBlocks[lang].map((m, i) => (
            <div className="cell" key={i}>
              <b>{m.k}</b>
              <span>{m.v}</span>
            </div>
          ))}
        </div>
        <h1>
          {lines.map((ln, i) => (
            <span className="line" key={i}>
              {ln}
            </span>
          ))}
        </h1>
        <div className="bottom-grid">
          <p className="sub">{resolveLocalized(props.sub, lang, "es")}</p>
          <div className="col-meta">
            {metaBlocks[lang].map((m, i) => (
              <div className="group" key={i}>
                <b>{m.k}</b>
                {m.v}
              </div>
            ))}
          </div>
          <div className="ctas">
            <a className="btn-primary" href="#contact">
              <span>{resolveLocalized(props.cta1, lang, "es")}</span>
              <span className="arr">↗</span>
            </a>
            <a className="btn-secondary" href="#work">
              <span>{resolveLocalized(props.cta2, lang, "es")}</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
