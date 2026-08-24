"use client";
import { useEffect, useState } from "react";
import type { TemplateRenderProps } from "@kimoxstudio/core";
import { kxField, resolveLocalized } from "@kimoxstudio/registry";
import { useLang } from "@/lib/lang";
import type { z } from "zod";
import type { projectListSchema } from "./schema";

type Props = z.infer<typeof projectListSchema>;

// Placeholder screenshots for projects that don't have real ones yet —
// three per project, seeded off its slug so each card gets a stable set.
const PLACEHOLDER_SHOTS = 3;

function placeholderShots(slug: string, width: number, height: number) {
  return Array.from(
    { length: PLACEHOLDER_SHOTS },
    (_, i) => `https://picsum.photos/seed/${slug}-${i + 1}/${width}/${height}`,
  );
}

// Real screenshots (when provided) are used as-is at any size; placeholders
// are generated at the requested size since picsum bakes it into the URL.
function resolveShots(screenshots: string[], slug: string, width: number, height: number) {
  return screenshots.length > 0 ? screenshots : placeholderShots(slug, width, height);
}

function ProjectPreview({ shots, name, onOpen }: { shots: string[]; name: string; onOpen: () => void }) {
  return (
    <button type="button" className="proj-shots" onClick={onOpen} aria-label={`Ver capturas de ${name}`}>
      <div className="shots-frame">
        <img className="shots-bg" src={shots[0]} alt="" aria-hidden="true" loading="lazy" />
        <img className="shots-fg" src={shots[0]} alt="" loading="lazy" />
      </div>
      <span className="shots-hint">Ver capturas ↗</span>
    </button>
  );
}

function ProjectModal({ shots, name, onClose }: { shots: string[]; name: string; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((n) => (n - 1 + shots.length) % shots.length);
  const next = () => setIdx((n) => (n + 1) % shots.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  return (
    <div className="proj-modal" role="dialog" aria-modal="true" aria-label={`Capturas de ${name}`} onClick={onClose}>
      <div className="proj-modal-inner" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="proj-modal-close" onClick={onClose} aria-label="Cerrar">×</button>
        <div className="proj-modal-frame">
          <img src={shots[idx]} alt={`Captura ${idx + 1} de ${name}`} />
        </div>
        <div className="proj-modal-bar">
          <button type="button" onClick={prev} aria-label="Captura anterior">‹</button>
          <span className="proj-modal-meta">{name} · 0{idx + 1} / 0{shots.length}</span>
          <button type="button" onClick={next} aria-label="Siguiente captura">›</button>
        </div>
      </div>
    </div>
  );
}

export function ProjectListComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [string, (next: string) => void];
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const title = (resolveLocalized(props.title, lang, "es") ?? "").replace(/(realizado|delivered|手がけた)/, (m) => `<em>${m}</em>`);
  const slugOf = (url: string) => url.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const openItem = openIdx !== null ? props.items[openIdx] : null;
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
            const slug = slugOf(url);
            const glyph = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
            const href = url.includes('.') ? `https://${url}` : '#';
            const previewShots = resolveShots(p.screenshots, slug, 1000, 640);
            return (
              <div className="proj-row" key={i}>
                <ProjectPreview shots={previewShots} name={name} onOpen={() => setOpenIdx(i)} />
                <div className="name-block">
                  <div className="name-row">
                    {p.logo ? (
                      <img className="proj-logo" src={p.logo} alt="" />
                    ) : (
                      <span className="proj-logo proj-logo--glyph">{glyph}</span>
                    )}
                    <a className="name" href={href} target="_blank" rel="noopener noreferrer">{name}</a>
                  </div>
                  <div className="url">{url} · {p.year}</div>
                  <a className="proj-cta" href={href} target="_blank" rel="noopener noreferrer" {...kxField(`viewSite.${lang}`)}>
                    {resolveLocalized(props.viewSite, lang, "es") ?? ""}
                  </a>
                </div>
                <div className="desc"><span className="cat" {...kxField(`items.${i}.category.${lang}`)}>{resolveLocalized(p.category, lang, "es") ?? ""}</span>{resolveLocalized(p.body, lang, "es") ?? ""}</div>
                <div className="tags">{p.tags.map((tg, j) => (<span key={j}>{tg}</span>))}</div>
              </div>
            );
          })}
        </div>
      </div>
      {openItem && (
        <ProjectModal
          shots={resolveShots(openItem.screenshots, slugOf(openItem.url), 1600, 1000)}
          name={openItem.name}
          onClose={() => setOpenIdx(null)}
        />
      )}
    </section>
  );
}
