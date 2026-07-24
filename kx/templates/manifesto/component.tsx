"use client";
import type { TemplateRenderProps } from "@kx/core";
import { kxField, resolveLocalized } from "@kx/registry";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/kx/langs";
import type { z } from "zod";
import type { manifestoSchema } from "./schema";

type Props = z.infer<typeof manifestoSchema>;

function SectionHead({ n, label, meta, title }: { n: string; label: string; meta: string; title: string }) {
  return (
    <div className="head">
      <span className="label"><b>§{n}</b> {label}</span>
      <span></span>
      <span className="meta">{meta}</span>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
    </div>
  );
}

export function ManifestoComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang, (next: Lang) => void];
  const title = (resolveLocalized(props.title, lang, "es") ?? "").replace(/(genérico|generic|汎用)/, (m) => `<em>${m}</em>`);
  return (
    <section className="poster-section manifesto">
      <div className="wrap">
        <SectionHead n="01" label={resolveLocalized(props.label, lang, "es") ?? ""} meta={lang === 'ja' ? '私たちのルール' : lang === 'en' ? 'our rules' : 'nuestras reglas'} title={title} />
        <div className="grid">
          <div className="body">
            <p dangerouslySetInnerHTML={{ __html: (resolveLocalized(props.body, lang, "es") ?? "").replace(/(perdura|lasts|長く残る)/, (m) => `<em>${m}</em>`) }} />
            <div className="sig">
              <span className="dot"></span>
              <span>— {lang === 'ja' ? '創業者より' : lang === 'en' ? 'from the founders' : 'de los fundadores'}</span>
            </div>
          </div>
          <ul className="bullets">
            {(resolveLocalized(props.bullets, lang, "es") ?? []).map((b, i) => (
              <li key={i}><span className="n">0{i + 1}</span><span {...kxField(`bullets.${lang}.${i}`)}>{b}</span><span className="arr">↗</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
