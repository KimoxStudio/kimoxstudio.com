"use client";
import type { TemplateRenderProps } from "@kimoxstudio/core";
import { kxField, resolveLocalized } from "@kimoxstudio/registry";
import { useLang } from "@/lib/lang";
import { useState } from "react";
import type { z } from "zod";
import type { testimonialCarouselSchema } from "./schema";

type Props = z.infer<typeof testimonialCarouselSchema>;

export function TestimonialCarouselComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [string, (next: string) => void];
  const items = props.items;
  const [idx, setIdx] = useState(0);
  const cur = items[idx];
  const title = lang === 'ja' ? '<em>声</em>' : lang === 'en' ? '<em>Voices.</em>' : '<em>Voces.</em>';
  return (
    <section className="poster-section testimonials" id="testimonials">
      <div className="wrap">
        <div className="head">
          <h2 dangerouslySetInnerHTML={{ __html: title }} />
        </div>
        <div className="quote-wrap">
          <div>
            <div className="quote-mark">"</div>
            <p className="t-quote" {...kxField(`items.${idx}.quote.${lang}`)}>{resolveLocalized(cur.quote, lang, "es") ?? ""}</p>
            <div className="t-meta">
              <span className="avatar">{cur.name[0]}</span>
              <div><span className="name">{cur.name}</span><span className="role" {...kxField(`items.${idx}.role.${lang}`)}>{resolveLocalized(cur.role, lang, "es") ?? ""}</span></div>
            </div>
            <div className="t-nav">
              <button onClick={() => setIdx((idx - 1 + items.length) % items.length)}>←</button>
              <button onClick={() => setIdx((idx + 1) % items.length)}>→</button>
              <span className="count">0{idx + 1} / 0{items.length}</span>
            </div>
          </div>
          <div className="t-side">
            {items.map((it, i) => (
              <div key={i} className={`pip ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)} data-hover>
                <span className="idx">0{i + 1}</span>
                <div><div className="nm">{it.name}</div><div className="rl" {...kxField(`items.${i}.role.${lang}`)}>{resolveLocalized(it.role, lang, "es") ?? ""}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
