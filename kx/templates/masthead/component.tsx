"use client";

import type { TemplateRenderProps } from "@kimoxstudio/core";
import { kxField, resolveLocalized } from "@kimoxstudio/registry";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/kx/langs";
import type { z } from "zod";
import type { mastheadSchema } from "./schema";

type Props = z.infer<typeof mastheadSchema>;

export function MastheadComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang, (next: Lang) => void];
  const lines = resolveLocalized(props.h1, lang, "es") ?? [];
  return (
    <section className="hero" id="top">
      <div className="wrap">
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
