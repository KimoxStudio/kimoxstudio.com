"use client";
import type { TemplateRenderProps } from "@/kx/template-types";
import { kxField, resolveLocalized } from "@/kx/localized";
import { useLang } from "@/lib/lang";
import { serializeJsonLd } from "@/lib/jsonld";
import type { Lang } from "@/kx/langs";
import type { z } from "zod";
import type { faqSchema } from "./schema";

type Props = z.infer<typeof faqSchema>;

export function FaqComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang];
  const title = resolveLocalized(props.title, lang, "es") ?? "";
  const emphasis = resolveLocalized(props.emphasis, lang, "es") ?? "";
  const at = emphasis ? title.indexOf(emphasis) : -1;
  const items = props.items.map((item) => ({
    q: resolveLocalized(item.q, lang, "es") ?? "",
    a: resolveLocalized(item.a, lang, "es") ?? "",
  }));
  // FAQPage structured data mirrors exactly the visible questions/answers.
  const jsonLd = serializeJsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  });
  return (
    <section className="poster-section faq" id="faq">
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
        <div className="faq-list">
          {items.map(({ q, a }, i) => (
            <details className="faq-item" key={i}>
              <summary data-hover {...kxField(`items.${i}.q.${lang}`)}>{q}</summary>
              <p {...kxField(`items.${i}.a.${lang}`)}>{a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
    </section>
  );
}
