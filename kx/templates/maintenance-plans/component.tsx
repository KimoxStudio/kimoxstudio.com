"use client";
import type { TemplateRenderProps } from "@kimoxstudio/core";
import { kxField, resolveLocalized } from "@kimoxstudio/registry";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/kx/langs";
import type { z } from "zod";
import type { maintenancePlansSchema } from "./schema";

type Props = z.infer<typeof maintenancePlansSchema>;

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

export function MaintenancePlansComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang, (next: Lang) => void];
  const title = (resolveLocalized(props.title, lang, "es") ?? "").replace(/(cuide|tending|大切に)/, (m) => `<em>${m}</em>`);
  const meta = lang === "ja" ? "3 plans · monthly fee" : lang === "en" ? "3 plans · monthly fee" : "3 planes · cuota mensual";
  const badge = props.badge ? resolveLocalized(props.badge, lang, "es") : null;
  const bridge = props.bridge ? resolveLocalized(props.bridge, lang, "es") : null;
  const recommendedLabel = lang === "es" ? "Recomendado" : "Recommended";
  return (
    <section className="poster-section services maintenance" id="maintenance">
      <div className="wrap">
        <SectionHead n="02" label={resolveLocalized(props.label, lang, "es") ?? ""} meta={meta} title={title} />
        {badge ? <span className="sub-badge" {...kxField(`badge.${lang}`)}>{badge}</span> : null}
        <p className="lede" {...kxField(`subtitle.${lang}`)}>{resolveLocalized(props.subtitle, lang, "es") ?? ""}</p>
        <div className="svc-table">
          {props.plans.map((p, i) => (
            <a href="#contact" className={`svc-row${p.recommended ? " recommended" : ""}`} key={i}>
              {p.recommended ? <span className="reco-flag">{recommendedLabel}</span> : null}
              <span className="n">{p.n}</span>
              <h3>{p.name}<span className="small" {...kxField(`plans.${i}.term.${lang}`)}>{resolveLocalized(p.term, lang, "es") ?? ""}</span></h3>
              <div>
                <p className="desc" {...kxField(`plans.${i}.hook.${lang}`)}>{resolveLocalized(p.hook, lang, "es") ?? ""}</p>
                <ul className="bullets">{(resolveLocalized(p.features, lang, "es") ?? []).map((b, j) => (<li key={j}>{b}</li>))}</ul>
              </div>
              <div className="price-cell">
                <span className="amount">{p.price}</span>
                <span className="per" {...kxField(`plans.${i}.priceUnit.${lang}`)}>{resolveLocalized(p.priceUnit, lang, "es") ?? ""}</span>
              </div>
              <span className="cta-cell"><span>{lang === "ja" ? "Get started" : lang === "en" ? "Get started" : "Contratar"}</span><span>→</span></span>
            </a>
          ))}
        </div>
        <div className="plan-foot">
          {bridge ? <span className="bridge">{bridge}</span> : null}
          <span className="price-note" {...kxField(`note.${lang}`)}>{resolveLocalized(props.note, lang, "es") ?? ""}</span>
        </div>
      </div>
    </section>
  );
}
