"use client";
import type { TemplateRenderProps } from "@/kx/template-types";
import { kxField, resolveLocalized } from "@/kx/localized";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/kx/langs";
import type { z } from "zod";
import type { processStepsSchema } from "./schema";

type Props = z.infer<typeof processStepsSchema>;

export function ProcessStepsComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang, (next: Lang) => void];
  const title = (resolveLocalized(props.title, lang, "es") ?? "").replace(/(trabajamos|work|働き方)/, (m) => `<em>${m}</em>`);
  return (
    <section className="poster-section process" id="process">
      <div className="wrap">
        <div className="head">
          <h2 dangerouslySetInnerHTML={{ __html: title }} />
        </div>
        <div className="steps">
          {props.steps.map((s, i) => (
            <div className="step" key={i}>
              <div className="num">{s.n}</div>
              <h3 {...kxField(`steps.${i}.title.${lang}`)}>{resolveLocalized(s.title, lang, "es") ?? ""}</h3>
              <p {...kxField(`steps.${i}.body.${lang}`)}>{resolveLocalized(s.body, lang, "es") ?? ""}</p>
              <div className="tag"><span>{lang === 'ja' ? 'ステップ' : lang === 'en' ? 'STEP' : 'PASO'} {i + 1} / {props.steps.length}</span><span className="dot"></span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
