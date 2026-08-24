"use client";
import type { TemplateRenderProps } from "@kimoxstudio/core";
import { kxField, resolveLocalized } from "@kimoxstudio/registry";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/kx/langs";
import type { z } from "zod";
import type { manifestoSchema } from "./schema";

type Props = z.infer<typeof manifestoSchema>;

export function ManifestoComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang, (next: Lang) => void];
  const title = (resolveLocalized(props.title, lang, "es") ?? "").replace(/(genérico|generic|汎用)/, (m) => `<em>${m}</em>`);
  return (
    <section className="poster-section manifesto" id="manifesto">
      <div className="wrap">
        <div className="head">
          <h2 dangerouslySetInnerHTML={{ __html: title }} />
        </div>
        <div className="grid">
          <div className="body">
            <p dangerouslySetInnerHTML={{ __html: (resolveLocalized(props.body, lang, "es") ?? "").replace(/(verse|look|外見)/, (m) => `<em>${m}</em>`) }} />
            <div className="sig">
              <span className="dot"></span>
              <span>— {lang === 'ja' ? '創業者より' : lang === 'en' ? 'the team' : 'el equipo'}</span>
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
