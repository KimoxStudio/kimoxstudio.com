"use client";
import type { TemplateRenderProps } from "@kimoxstudio/core";
import { kxField, resolveLocalized } from "@kimoxstudio/registry";
import { useLang } from "@/lib/lang";
import type { z } from "zod";
import type { projectListSchema } from "./schema";

type Props = z.infer<typeof projectListSchema>;

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

export function ProjectListComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [string, (next: string) => void];
  const title = (resolveLocalized(props.title, lang, "es") ?? "").replace(/(enviado|shipped|出荷)/, (m) => `<em>${m}</em>`);
  return (
    <section className="poster-section work" id="work">
      <div className="wrap">
        <SectionHead n="04" label={resolveLocalized(props.label, lang, "es") ?? ""} meta={`12+ ${lang === 'ja' ? '出荷済 · 4件表示' : lang === 'en' ? 'shipped · 4 shown' : 'enviados · 4 mostrados'}`} title={title} />
        <div className="proj-list">
          {props.items.map((p, i) => {
            const name = p.name;
            const url = p.url;
            const glyph = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
            return (
              <a className="proj-row" key={i} href={url.includes('.') ? `https://${url}` : '#'} target="_blank" rel="noopener noreferrer">
                <span className="n col">{p.n}</span>
                <div className="name-block col">
                  <div className="name">{name}</div>
                  <div className="url">{url} · {p.year}</div>
                  <span className="proj-cta" aria-hidden="true" {...kxField(`viewSite.${lang}`)}>{resolveLocalized(props.viewSite, lang, "es") ?? ""}</span>
                </div>
                <div className="desc col"><span className="cat" {...kxField(`items.${i}.category.${lang}`)}>{resolveLocalized(p.category, lang, "es") ?? ""}</span>{resolveLocalized(p.body, lang, "es") ?? ""}</div>
                <div className="tags col">{p.tags.map((tg, j) => (<span key={j}>{tg}</span>))}</div>
                <div className={`swatch${p.logo ? ' has-logo' : ''}`}>
                  {p.logo ? (<img className="logo" src={p.logo} alt={`${name} logo`} />) : (<div className="glyph">{glyph}</div>)}
                  <div className="stripes"></div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
