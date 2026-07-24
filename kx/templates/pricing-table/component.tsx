"use client";
import type { TemplateRenderProps } from "@kimoxstudio/core";
import { kxField, resolveLocalized } from "@kimoxstudio/registry";
import { useLang } from "@/lib/lang";
import type { z } from "zod";
import type { pricingTableSchema } from "./schema";

type Props = z.infer<typeof pricingTableSchema>;

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

export function PricingTableComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [string, (next: string) => void];
  const title = (resolveLocalized(props.title, lang, "es") ?? "").replace(/(construimos|build|作る)/, (m) => `<em>${m}</em>`);
  return (
    <section className="poster-section services" id="services">
      <div className="wrap">
        <SectionHead n="03" label={resolveLocalized(props.label, lang, "es") ?? ""} meta={`3 ${lang === 'ja' ? '種類 · 個別見積もり可' : lang === 'en' ? 'tiers · custom on request' : 'niveles · a medida disponible'}`} title={title} />
        <div className="svc-table">
          {props.items.map((s, i) => (
            <a href="#contact" className="svc-row" key={i}>
              <span className="n">{s.n}</span>
              <h3>{resolveLocalized(s.title, lang, "es") ?? ""}<span className="small">{lang === 'ja' ? 'サービス' : lang === 'en' ? 'service' : 'servicio'} 0{i + 1}</span></h3>
              <div>
                <p className="desc" {...kxField(`items.${i}.body.${lang}`)}>{resolveLocalized(s.body, lang, "es") ?? ""}</p>
                <ul className="bullets">{(resolveLocalized(s.bullets, lang, "es") ?? []).map((b, j) => (<li key={j}>{b}</li>))}</ul>
              </div>
              <div className="price-cell">
                <span className="from" {...kxField(`fromLabel.${lang}`)}>{resolveLocalized(props.fromLabel, lang, "es") ?? ""}</span>
                <span className="amount">{resolveLocalized(s.priceFrom, lang, "es") ?? ""}</span>
                <span className="iva">{lang === 'ja' ? '税抜' : lang === 'en' ? 'ex. tax (IGIC)' : 'sin IGIC'}</span>
              </div>
              <span className="cta-cell"><span>{lang === 'ja' ? '依頼する' : lang === 'en' ? 'Inquire' : 'Pedir info'}</span><span>→</span></span>
            </a>
          ))}
        </div>
        <div className="svc-extras">
          <span className="label">{resolveLocalized(props.extrasLabel, lang, "es") ?? ""} →</span>
          {(resolveLocalized(props.extras, lang, "es") ?? []).map((it, i) => (<span className="tag" key={i} {...kxField(`extras.${lang}.${i}`)}>{it}</span>))}
        </div>
      </div>
    </section>
  );
}
