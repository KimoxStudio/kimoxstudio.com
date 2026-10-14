"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { TemplateRenderProps } from "@/kx/template-types";
import { kxField, resolveLocalized } from "@/kx/localized";
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

type ModalText = {
  preview: (name: string) => string;
  hint: string;
  dialog: (name: string) => string;
  close: string;
  prev: string;
  next: string;
  shot: (n: number, name: string) => string;
  loading: string;
  failed: string;
};
const MODAL_TEXT: Record<string, ModalText> = {
  es: {
    preview: (name) => `Ver capturas de ${name}`,
    hint: "Ver capturas ↗",
    dialog: (name) => `Capturas de ${name}`,
    close: "Cerrar",
    prev: "Captura anterior",
    next: "Siguiente captura",
    shot: (n, name) => `Captura ${n} de ${name}`,
    loading: "Cargando",
    failed: "No se pudo cargar la captura",
  },
  en: {
    preview: (name) => `View screenshots of ${name}`,
    hint: "View screenshots ↗",
    dialog: (name) => `Screenshots of ${name}`,
    close: "Close",
    prev: "Previous screenshot",
    next: "Next screenshot",
    shot: (n, name) => `Screenshot ${n} of ${name}`,
    loading: "Loading",
    failed: "Couldn't load the screenshot",
  },
  ja: {
    preview: (name) => `${name}のスクリーンショットを見る`,
    hint: "スクリーンショット ↗",
    dialog: (name) => `${name}のスクリーンショット`,
    close: "閉じる",
    prev: "前のスクリーンショット",
    next: "次のスクリーンショット",
    shot: (n, name) => `${name}のスクリーンショット ${n}`,
    loading: "読み込み中",
    failed: "スクリーンショットを読み込めませんでした",
  },
};
const modalText = (lang: string): ModalText => MODAL_TEXT[lang] ?? MODAL_TEXT.es!;
const pad2 = (n: number) => String(n).padStart(2, "0");

type ShotStatus = "loading" | "loaded" | "error";

// Image with a placeholder that keeps the box size while it loads and a text
// fallback if it fails. `labels` is optional: thumbnails are too small for text.
// Remounts on src change: callers key it by src/index.
// `status` stays null until mount so the server HTML carries no data-state and
// the image is visible without JS.
function ShotImage({
  src,
  alt,
  className,
  lazy,
  labels,
  onStatus,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
  labels?: { loading: string; failed: string };
  onStatus?: (status: ShotStatus) => void;
  style?: React.CSSProperties;
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
  useEffect(() => {
    if (status) onStatus?.(status);
  }, [status, onStatus]);
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
        {labels && (
          <span className="shot-ph-label">{status === "error" ? labels.failed : labels.loading}</span>
        )}
      </span>
      <img
        ref={imgRef}
        className={className}
        src={src}
        alt={alt}
        aria-hidden={status === "error" || undefined}
        draggable={false}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        style={style}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
      />
    </span>
  );
}

function ProjectPreview({ shots, name, text, onOpen }: { shots: string[]; name: string; text: ModalText; onOpen: () => void }) {
  const thumbs = [shots[0], shots[1] ?? shots[0], shots[2] ?? shots[0]];
  return (
    <button type="button" className="proj-shots" onClick={onOpen} aria-label={text.preview(name)}>
      <div className="shots-frame">
        <div className="shots-grid">
          {thumbs.map((src, i) => (
            <ShotImage key={i} src={src} alt={text.shot(shots.indexOf(src) + 1, name)} lazy />
          ))}
        </div>
      </div>
      <span className="shots-hint">{text.hint}</span>
    </button>
  );
}

const SWIPE_THRESHOLD = 40;
// px/ms; a quick flick changes the photo even below the distance threshold.
const SWIPE_VELOCITY = 0.4;
const SWIPE_MIN_FLICK = 12;

type Device = "desktop" | "tablet" | "mobile";
const DEVICES: Device[] = ["desktop", "tablet", "mobile"];
// width / height of the image frame per device.
const DEVICE_RATIO: Record<Device, number> = { desktop: 16 / 10, tablet: 834 / 1194, mobile: 390 / 844 };
const DEVICE_LABELS: Record<Device, Record<string, string>> = {
  desktop: { es: "Escritorio", en: "Desktop", ja: "デスクトップ" },
  tablet: { es: "Tablet", en: "Tablet", ja: "タブレット" },
  mobile: { es: "Móvil", en: "Mobile", ja: "モバイル" },
};
const DEVICE_GROUP_LABEL: Record<string, string> = { es: "Dispositivo", en: "Device", ja: "デバイス" };

type Responsive = NonNullable<Props["items"][number]["responsive"]>;

const FOCUSABLE = "button, [href], input, [tabindex]:not([tabindex='-1'])";

function ProjectModal({
  shots,
  responsive,
  name,
  lang,
  onClose,
}: {
  shots: string[];
  responsive?: Responsive;
  name: string;
  lang: string;
  onClose: () => void;
}) {
  const devices = responsive ? DEVICES.filter((d) => responsive[d].length > 0) : [];
  const [device, setDevice] = useState<Device | null>(devices[0] ?? null);
  const [view, setView] = useState({ idx: 0, dir: 0 });
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  // True from a committed swipe until the next press: the slide jumps to 0 with no
  // transition so only the new image's entry animation moves.
  const [committed, setCommitted] = useState(false);
  const [shotStatus, setShotStatus] = useState<ShotStatus | null>(null);
  const text = modalText(lang);
  // Refs, not state: pointer handlers need the latest values synchronously.
  const dragStart = useRef<{ x: number; t: number } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const list = responsive && device ? responsive[device] : shots;
  const idx = view.idx;
  const go = (delta: number) =>
    setView((v) => ({ idx: (v.idx + delta + list.length) % list.length, dir: delta }));
  const prev = () => go(-1);
  const next = () => go(1);
  const pickDevice = (d: Device) => {
    if (d === device) return;
    setDevice(d);
    setView((v) => ({ idx: Math.min(v.idx, (responsive?.[d].length ?? 1) - 1), dir: 0 }));
  };

  // Warm the cache for what a swipe is likely to show next.
  useEffect(() => {
    const pending = [1, -1].map((step) => {
      const img = new Image();
      img.src = list[(idx + step + list.length) % list.length];
      return img;
    });
    return () => {
      for (const img of pending) img.src = "";
    };
  }, [list, idx]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.isPrimary || e.button !== 0) return;
    dragStart.current = { x: e.clientX, t: e.timeStamp };
    setCommitted(false);
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;
    setDragX(e.clientX - dragStart.current.x);
  };
  const resetDrag = () => {
    dragStart.current = null;
    setIsDragging(false);
    setDragX(0);
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const start = dragStart.current;
    if (!start) return;
    const dx = e.clientX - start.x;
    const velocity = Math.abs(dx) / Math.max(e.timeStamp - start.t, 1);
    const commit = Math.abs(dx) > SWIPE_THRESHOLD || (Math.abs(dx) > SWIPE_MIN_FLICK && velocity > SWIPE_VELOCITY);
    if (commit) {
      setCommitted(true);
      (dx > 0 ? prev : next)();
    }
    resetDrag();
  };

  // Latest handlers for the document listener, which is bound once per onClose.
  const keyHandlers = useRef({ prev, next });
  keyHandlers.current = { prev, next };

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") keyHandlers.current.prev();
      if (e.key === "ArrowRight") keyHandlers.current.next();
      if (e.key === "Tab" && rootRef.current) {
        const items = Array.from(rootRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        const first = items[0];
        const last = items[items.length - 1];
        if (!first || !last) return;
        const outside = !rootRef.current.contains(document.activeElement);
        if (outside) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, [onClose]);

  const deviceLabel = device ? DEVICE_LABELS[device][lang] ?? DEVICE_LABELS[device].es : "";
  const alt = `${text.shot(idx + 1, name)}${device ? ` · ${deviceLabel}` : ""}`;
  const frameStyle = device ? { aspectRatio: DEVICE_RATIO[device], ["--ar" as string]: DEVICE_RATIO[device] } : undefined;

  return (
    <div ref={rootRef} className="proj-modal" role="dialog" aria-modal="true" aria-label={text.dialog(name)} onClick={onClose}>
      <div className="proj-modal-inner" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} type="button" className="proj-modal-close" onClick={onClose} aria-label={text.close}>×</button>
        {devices.length > 1 && (
          <div className="proj-device-toggle" role="group" aria-label={DEVICE_GROUP_LABEL[lang] ?? DEVICE_GROUP_LABEL.es}>
            {devices.map((d) => (
              <button key={d} type="button" aria-pressed={d === device} onClick={() => pickDevice(d)}>
                {DEVICE_LABELS[d][lang] ?? DEVICE_LABELS[d].es}
              </button>
            ))}
          </div>
        )}
        <div className="proj-modal-stage">
          <div
            className={`proj-modal-frame${device ? " proj-modal-frame--device" : ""}`}
            style={frameStyle}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={resetDrag}
          >
            <div
              className="proj-modal-slide"
              style={{
                transform: `translateX(${dragX}px)`,
                transition: isDragging || committed ? "none" : undefined,
              }}
            >
              <ShotImage
                key={`${device}-${idx}`}
                className="proj-modal-img"
                src={list[idx]}
                alt={alt}
                labels={text}
                onStatus={setShotStatus}
                style={{ ["--from" as string]: `${view.dir * 48}px` }}
              />
            </div>
          </div>
        </div>
        <div className="proj-modal-bar">
          <button type="button" onClick={prev} aria-label={text.prev}>‹</button>
          <span className="proj-modal-meta" role="status" aria-atomic="true">
            {name} · <span className="proj-modal-count">{pad2(idx + 1)} / {pad2(list.length)}</span>
            {shotStatus === "error" && <span className="visually-hidden"> · {text.failed}</span>}
          </span>
          <button type="button" onClick={next} aria-label={text.next}>›</button>
        </div>
      </div>
    </div>
  );
}

export function ProjectListComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [string];
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  // Stable identity: the modal's focus effect depends on it and must not re-run on parent renders.
  const closeModal = useCallback(() => setOpenIdx(null), []);
  const text = modalText(lang);
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
                <ProjectPreview shots={previewShots} name={name} text={text} onOpen={() => setOpenIdx(i)} />
                <div className="name-block">
                  <div className="name-row">
                    {/* Logo alt="" on purpose: the project name is the adjacent link text, so an alt would repeat it. */}
                    {p.logo ? (
                      <img className="proj-logo" src={p.logo} alt="" width={30} height={30} loading="lazy" decoding="async" />
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
          responsive={openItem.responsive}
          name={openItem.name}
          lang={lang}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
