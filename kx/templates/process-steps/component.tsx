"use client";
import type { TemplateRenderProps } from "@kimoxstudio/core";
import { kxField, resolveLocalized } from "@kimoxstudio/registry";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/kx/langs";
import type { z } from "zod";
import type { processStepsSchema } from "./schema";

type Props = z.infer<typeof processStepsSchema>;

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

export function ProcessStepsComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang, (next: Lang) => void];
  const title = (resolveLocalized(props.title, lang, "es") ?? "").replace(/(trabajamos|work|働き方)/, (m) => `<em>${m}</em>`);
  return (
    <section className="poster-section process" id="process">
      <div className="wrap">
        <SectionHead n="05" label={resolveLocalized(props.label, lang, "es") ?? ""} meta={`4 ${lang === 'ja' ? 'ステップ' : lang === 'en' ? 'steps' : 'pasos'}`} title={title} />
        <div className="steps">
          {props.steps.map((s, i) => (
            <div className="step" key={i}>
              <div className="num">{s.n}</div>
              <h3 {...kxField(`steps.${i}.title.${lang}`)}>{resolveLocalized(s.title, lang, "es") ?? ""}</h3>
              <p {...kxField(`steps.${i}.body.${lang}`)}>{resolveLocalized(s.body, lang, "es") ?? ""}</p>
              <div className="tag"><span>{lang === 'ja' ? 'ステップ' : 'STEP'} {i + 1} / {props.steps.length}</span><span className="dot"></span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
