"use client";
import type { TemplateRenderProps } from "@kimoxstudio/core";
import { kxField, resolveLocalized } from "@kimoxstudio/registry";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/kx/langs";
import type { z } from "zod";
import type { webServiceSchema } from "./schema";

type Props = z.infer<typeof webServiceSchema>;

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

// Re-homes WebServiceSec: same markup and class names, so landing.css styles it
// unchanged. The emphasis word ("de golpe" / "all at once") keeps the
// serif-italic orange accent used by the other poster heads.
export function WebServiceComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang, (next: Lang) => void];
  const title = (resolveLocalized(props.title, lang, "es") ?? "").replace(
    /(de golpe|all at once)/,
    (m) => `<em>${m}</em>`,
  );
  const feats = resolveLocalized(props.feats, lang, "es") ?? [];

  return (
    <section className="poster-section web-service" id="web-service">
      <div className="wrap">
        <SectionHead
          n="03"
          label={resolveLocalized(props.label, lang, "es") ?? ""}
          meta={`1 ${lang === "en" ? "plan · monthly fee" : "plan · cuota mensual"}`}
          title={title}
        />
        <p className="ws-bridge" {...kxField(`bridge.${lang}`)}>{resolveLocalized(props.bridge, lang, "es") ?? ""}</p>
        <div className="ws-panel">
          <div className="ws-main">
            <span className="ws-badge" {...kxField(`eyebrow.${lang}`)}>{resolveLocalized(props.eyebrow, lang, "es") ?? ""}</span>
            <p className="ws-sub" {...kxField(`sub.${lang}`)}>{resolveLocalized(props.sub, lang, "es") ?? ""}</p>
            <div className="ws-price">
              <span className="amount" {...kxField(`price.${lang}`)}>{resolveLocalized(props.price, lang, "es") ?? ""}</span>
              <span className="iva" {...kxField(`igic.${lang}`)}>{resolveLocalized(props.igic, lang, "es") ?? ""}</span>
            </div>
            <p className="ws-commit" {...kxField(`commitment.${lang}`)}>{resolveLocalized(props.commitment, lang, "es") ?? ""}</p>
            <a href="#contact" className="ws-cta">
              {resolveLocalized(props.ctaLabel, lang, "es") ?? ""}
            </a>
          </div>
          <div className="ws-includes">
            <span className="ws-includes-label" {...kxField(`includesLabel.${lang}`)}>
              {resolveLocalized(props.includesLabel, lang, "es") ?? ""}
            </span>
            <ul className="ws-feats">
              {feats.map((f, j) => {
                const [head, ...rest] = f.split("—");
                const body = rest.join("—").trim();
                return (
                  <li key={j}>
                    <b>{(head ?? "").trim()}</b>
                    {body ? <span> — {body}</span> : null}
                  </li>
                );
              })}
            </ul>
            <p className="ws-closer" {...kxField(`featsCloser.${lang}`)}>{resolveLocalized(props.featsCloser, lang, "es") ?? ""}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
