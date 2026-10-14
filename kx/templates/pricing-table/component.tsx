"use client";
import { useState } from "react";
import type { TemplateRenderProps } from "@/kx/template-types";
import { kxField, resolveLocalized } from "@/kx/localized";
import { useLang } from "@/lib/lang";
import type { z } from "zod";
import type { pricingTableSchema } from "./schema";

type Props = z.infer<typeof pricingTableSchema>;

export function PricingTableComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [string];
  const [billing, setBilling] = useState<"monthly" | "oneOff">("monthly");
  const monthly = billing === "monthly";
  const note = monthly ? props.items.map((s) => resolveLocalized(s.priceMonthlyNote, lang, "es")).find(Boolean) : undefined;
  const title = (resolveLocalized(props.title, lang, "es") ?? "").replace(/(construimos|build|作る)/, (m) => `<em>${m}</em>`);
  return (
    <section className="poster-section services" id="services">
      <div className="wrap">
        <div className="head">
          <h2 dangerouslySetInnerHTML={{ __html: title }} />
        </div>
        <div className="billing-toggle" role="group" aria-label={resolveLocalized(props.billing.groupLabel, lang, "es")}>
          <button type="button" aria-pressed={monthly} onClick={() => setBilling("monthly")}>{resolveLocalized(props.billing.monthlyLabel, lang, "es") ?? ""}</button>
          <button type="button" aria-pressed={!monthly} onClick={() => setBilling("oneOff")}>{resolveLocalized(props.billing.oneOffLabel, lang, "es") ?? ""}</button>
        </div>
        <div className="svc-table">
          {props.items.map((s, i) => {
            const alt = resolveLocalized(monthly ? s.altOneOff : s.altMonthly, lang, "es");
            return (
            <a href="#contact" className="svc-row" key={i} aria-describedby={monthly && s.priceMonthlyNote ? "svc-note" : undefined}>
              <span className="n">{s.n}</span>
              <h3>{resolveLocalized(s.title, lang, "es") ?? ""}</h3>
              <div>
                <p className="desc" {...kxField(`items.${i}.body.${lang}`)}>{resolveLocalized(s.body, lang, "es") ?? ""}</p>
                <ul className="bullets">{(resolveLocalized(monthly && s.bulletsMonthly ? s.bulletsMonthly : s.bullets, lang, "es") ?? []).map((b, j) => (<li key={j}>{b}</li>))}</ul>
              </div>
              <div className="price-cell">
                <span className="from" {...kxField(`fromLabel.${lang}`)}>{resolveLocalized(props.fromLabel, lang, "es") ?? ""}</span>
                <span className="amount">{resolveLocalized(monthly ? s.priceMonthly : s.priceFrom, lang, "es") ?? ""}{monthly && s.priceMonthlyNote ? <span aria-hidden="true">*</span> : null}</span>
                <span className="iva">{lang === 'ja' ? '税抜' : lang === 'en' ? 'ex. tax (IGIC)' : 'sin IGIC'}</span>
                {alt ? <span className="alt">{alt}</span> : null}
              </div>
              <span className="cta-cell"><span>{lang === 'ja' ? '依頼する' : lang === 'en' ? 'Inquire' : 'Pedir info'}</span><span>→</span></span>
            </a>
            );
          })}
        </div>
        {note && <p className="svc-note" id="svc-note">{note}</p>}
        <div className="svc-extras">
          <span className="label">{resolveLocalized(props.extrasLabel, lang, "es") ?? ""} →</span>
          {(resolveLocalized(props.extras, lang, "es") ?? []).map((it, i) => (<span className="tag" key={i} {...kxField(`extras.${lang}.${i}`)}>{it}</span>))}
        </div>
      </div>
    </section>
  );
}
