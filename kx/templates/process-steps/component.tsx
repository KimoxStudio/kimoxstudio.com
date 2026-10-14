"use client";
import type { TemplateRenderProps } from "@/kx/template-types";
import { kxField, resolveLocalized } from "@/kx/localized";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/kx/langs";
import type { z } from "zod";
import type { processStepsSchema } from "./schema";

type Props = z.infer<typeof processStepsSchema>;

export function ProcessStepsComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang];
  const title = resolveLocalized(props.title, lang, "es") ?? "";
  const emphasis = resolveLocalized(props.emphasis, lang, "es") ?? "";
  const sub = resolveLocalized(props.sub, lang, "es") ?? "";
  const at = emphasis ? title.indexOf(emphasis) : -1;
  return (
    <section className="poster-section process" id="ai">
      <div className="wrap">
        <div className="head">
          <h2>
            {at < 0 ? (
              title
            ) : (
              <>
                {title.slice(0, at)}
                <em>{emphasis}</em>
                {title.slice(at + emphasis.length)}
              </>
            )}
          </h2>
        </div>
        {sub ? <p className="bridge" {...kxField(`sub.${lang}`)}>{sub}</p> : null}
        <div className="steps">
          {props.steps.map((s, i) => (
            <div className="step" key={i}>
              <div className="num">{s.n}</div>
              <h3 {...kxField(`steps.${i}.title.${lang}`)}>{resolveLocalized(s.title, lang, "es") ?? ""}</h3>
              <p {...kxField(`steps.${i}.body.${lang}`)}>{resolveLocalized(s.body, lang, "es") ?? ""}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
