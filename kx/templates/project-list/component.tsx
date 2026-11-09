"use client";
import { useLayoutEffect, useRef, useState } from "react";
import type { TemplateRenderProps } from "@/kx/template-types";
import { kxField, resolveLocalized } from "@/kx/localized";
import { useLang } from "@/lib/lang";
import { localePath } from "@/lib/urls";
import type { z } from "zod";
import type { projectListSchema } from "./schema";

type Props = z.infer<typeof projectListSchema>;

type ShotLabels = { loading: string; failed: string };
const SHOT_LABELS: Record<string, ShotLabels> = {
  es: { loading: "Cargando", failed: "No se pudo cargar la captura" },
  en: { loading: "Loading", failed: "Couldn't load the screenshot" },
  ja: { loading: "読み込み中", failed: "スクリーンショットを読み込めませんでした" },
};
const shotLabels = (lang: string): ShotLabels => SHOT_LABELS[lang] ?? SHOT_LABELS.es!;

const NEW_TAB_NOTE: Record<string, string> = {
  es: "se abre en una pestaña nueva",
  en: "opens in a new tab",
  ja: "新しいタブで開きます",
};

type ShotStatus = "loading" | "loaded" | "error";

// Image with a placeholder that keeps the box size while it loads and a text
// fallback if it fails.
// `status` stays null until mount so the server HTML carries no data-state and
// the image is visible without JS.
function ShotImage({
  src,
  labels,
}: {
  src: string;
  labels: ShotLabels;
}) {
  const [status, setStatus] = useState<ShotStatus | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  // Cached or already-finished images fire `load` before React attaches onLoad
  // (or never, on hydration): read `complete` before the first paint.
  useLayoutEffect(() => {
    const img = imgRef.current;
    if (img?.complete) setStatus(img.naturalWidth > 0 ? "loaded" : "error");
    else setStatus("loading");
  }, []);
  return (
    <span className="shot" data-state={status ?? undefined} aria-busy={status === "loading"}>
      <span className="shot-ph" aria-hidden="true">
        {status === "error" && (
          <svg className="shot-ph-glyph" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
            <rect x="3.5" y="4.5" width="17" height="15" />
            <circle cx="9" cy="10" r="1.5" />
            <path d="M3.5 17l5-4.5 3.5 3 3-2.5 5.5 4.5" />
            <path d="M3.5 4.5l17 15" />
          </svg>
        )}
        <span className="shot-ph-label">{status === "error" ? labels.failed : labels.loading}</span>
      </span>
      <img
        ref={imgRef}
        src={src}
        alt=""
        aria-hidden={status === "error" || undefined}
        draggable={false}
        loading="lazy"
        decoding="async"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
      />
    </span>
  );
}

export function ProjectListComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [string];
  const labels = shotLabels(lang);
  const title = (resolveLocalized(props.title, lang, "es") ?? "").replace(/(realizado|delivered|手がけた)/, (m) => `<em>${m}</em>`);
  return (
    <section className="poster-section work" id="work">
      <div className="wrap">
        <div className="head">
          <h2 dangerouslySetInnerHTML={{ __html: title }} />
        </div>
        <div className="proj-list">
          {props.items.map((p, i) => {
            const name = p.name;
            const url = p.url;
            const glyph = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
            const href = url.includes('.') ? `https://${url}` : '#';
            const detailHref = localePath(lang, `/projects/${p.slug}`);
            const shot = p.responsive?.desktop[0] ?? p.screenshots[0];
            return (
              <div className="proj-row" key={i}>
                {shot && (
                  // Same destination as the "view more" link below: kept out of the tab order
                  // and the accessibility tree so keyboard and screen-reader users get one stop.
                  <a className="proj-shot" href={detailHref} tabIndex={-1} aria-hidden="true">
                    <ShotImage src={shot} labels={labels} />
                  </a>
                )}
                <div className="name-block">
                  <div className="name-row">
                    {/* Logo alt="" on purpose: the project name is the adjacent heading, so an alt would repeat it. */}
                    {p.logo ? (
                      <img className="proj-logo" src={p.logo} alt="" width={30} height={30} loading="lazy" decoding="async" />
                    ) : (
                      <span className="proj-logo proj-logo--glyph">{glyph}</span>
                    )}
                    <h3 className="name">{name}</h3>
                  </div>
                  <div className="url">{url} · {p.year}</div>
                  <div className="proj-ctas">
                    <a className="proj-cta proj-cta--primary" href={detailHref}>
                      <span {...kxField(`viewMore.${lang}`)}>{resolveLocalized(props.viewMore, lang, "es") ?? ""}</span>
                      <span aria-hidden="true">→</span>
                      <span className="visually-hidden"> · {name}</span>
                    </a>
                    <a className="proj-cta" href={href} target="_blank" rel="noopener noreferrer">
                      <span {...kxField(`viewSite.${lang}`)}>{resolveLocalized(props.viewSite, lang, "es") ?? ""}</span>
                      <span aria-hidden="true">→</span>
                      <span className="visually-hidden"> · {name} ({NEW_TAB_NOTE[lang] ?? NEW_TAB_NOTE.es})</span>
                    </a>
                  </div>
                </div>
                <div className="desc"><span className="cat" {...kxField(`items.${i}.category.${lang}`)}>{resolveLocalized(p.category, lang, "es") ?? ""}</span>{resolveLocalized(p.body, lang, "es") ?? ""}</div>
                <div className="tags">{p.tags.map((tg, j) => (<span key={j}>{tg}</span>))}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
