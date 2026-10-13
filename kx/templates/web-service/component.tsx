"use client";
import { useEffect, useRef, useState } from "react";
import type { TemplateRenderProps } from "@/kx/template-types";
import { kxField, resolveLocalized } from "@/kx/localized";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/kx/langs";
import type { z } from "zod";
import type { webServiceSchema } from "./schema";
import { wsIllustrations } from "./illustrations";

type Props = z.infer<typeof webServiceSchema>;

// Two 8s loops, stopped inside the hold window of the second so the drawing is complete when it rests.
const PLAY_MS = 14500;
// Touch devices step through the feats by themselves. Long enough to watch the drawing build before the next one replaces it.
const AUTO_STEP_MS = 6000;

// Re-homes WebServiceSec: same markup and class names, so landing.css styles it.
// The `emphasis` substring of the title keeps the serif-italic orange accent
// used by the other poster heads.
export function WebServiceComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang, (next: Lang) => void];
  const title = resolveLocalized(props.title, lang, "es") ?? "";
  const emphasis = resolveLocalized(props.emphasis, lang, "es") ?? "";
  const at = emphasis ? title.indexOf(emphasis) : -1;
  const priceNote = resolveLocalized(props.priceNote, lang, "es") ?? "";
  // One illustration per feat; feats beyond the illustration count are not rendered.
  const feats = (resolveLocalized(props.feats, lang, "es") ?? []).slice(0, wsIllustrations.length);
  // Index of the feat whose illustration the stage shows. Hover, focus and tap all
  // set it; nothing resets it, so the last one chosen stays on screen.
  const [activeFeat, setActiveFeat] = useState(0);
  // Index of the illustration currently animating. Animations never run unprompted
  // (WCAG 2.2.2): a selection plays the drawing for about two loops, then it rests.
  const [playingFeat, setPlayingFeat] = useState<number | null>(null);
  const playingRef = useRef<number | null>(null);
  const activeRef = useRef(0);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  // Set by the first user selection; auto-advance never restarts after it (WCAG 2.2.2 pause).
  const autoStopped = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => () => {
    if (stopTimer.current) clearTimeout(stopTimer.current);
  }, []);
  const stopAuto = () => {
    autoStopped.current = true;
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = null;
  };
  const select = (j: number, opts?: { auto?: boolean }) => {
    if (!opts?.auto) stopAuto();
    activeRef.current = j;
    setActiveFeat(j);
    if (playingRef.current === j) return;
    playingRef.current = j;
    setPlayingFeat(j);
    if (stopTimer.current) clearTimeout(stopTimer.current);
    stopTimer.current = setTimeout(() => {
      playingRef.current = null;
      setPlayingFeat(null);
    }, PLAY_MS);
  };
  // Only without hover (a phone has no pointer to trigger the drawings) and without reduced motion.
  // Runs only while the stage is on screen. Auto steps never call focus() or scroll.
  const autoSelect = useRef(select);
  autoSelect.current = select;
  const featCount = feats.length;
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || featCount < 2) return;
    if (!window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const clear = () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
      autoTimer.current = null;
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        clear();
        if (!entry?.isIntersecting || autoStopped.current) return;
        // Draw the current feat as soon as the stage shows up, instead of leaving it still for a whole step.
        autoSelect.current(activeRef.current, { auto: true });
        autoTimer.current = setInterval(() => {
          autoSelect.current((activeRef.current + 1) % featCount, { auto: true });
        }, AUTO_STEP_MS);
      },
      { threshold: 0.5 },
    );
    observer.observe(stage);
    return () => {
      observer.disconnect();
      clear();
    };
  }, [featCount]);
  const illustrations = wsIllustrations.slice(0, feats.length);

  return (
    <section className="poster-section web-service" id="web-service">
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
        <p className="bridge" {...kxField(`bridge.${lang}`)}>{resolveLocalized(props.bridge, lang, "es") ?? ""}</p>
        <div className="ws-panel">
          <div className="ws-main">
            <span className="ws-badge" {...kxField(`eyebrow.${lang}`)}>{resolveLocalized(props.eyebrow, lang, "es") ?? ""}</span>
            <p className="ws-sub" {...kxField(`sub.${lang}`)}>{resolveLocalized(props.sub, lang, "es") ?? ""}</p>
            <div className="ws-price">
              {props.prices.map((p, i) => (
                <div className="ws-price-row" key={i}>
                  <span className="plabel" {...kxField(`prices.${i}.label.${lang}`)}>{resolveLocalized(p.label, lang, "es") ?? ""}</span>
                  <span className="amount" {...kxField(`prices.${i}.amount.${lang}`)}>{resolveLocalized(p.amount, lang, "es") ?? ""}</span>
                </div>
              ))}
              <span className="iva" {...kxField(`igic.${lang}`)}>{resolveLocalized(props.igic, lang, "es") ?? ""}</span>
              {priceNote ? <p className="pnote" {...kxField(`priceNote.${lang}`)}>{priceNote}</p> : null}
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
                    <button
                      type="button"
                      className="ws-feat"
                      aria-pressed={j === activeFeat}
                      onClick={() => select(j)}
                      onFocus={() => select(j)}
                      onPointerEnter={(e) => {
                        // Touch fires pointerenter on any touchstart, scrolls included; only a tap should switch.
                        if (e.pointerType !== "touch") select(j);
                      }}
                    >
                      <span className="ws-feat-text">
                        <b>{(head ?? "").trim()}</b>
                        {body ? <span> — {body}</span> : null}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {illustrations.length > 0 ? (
              <div className="ws-stage" ref={stageRef}>
                {illustrations.map((Illustration, j) => (
                  <Illustration
                    key={j}
                    className={`ws-illu${j === activeFeat ? " is-active" : ""}${j === playingFeat ? " is-playing" : ""}`}
                  />
                ))}
              </div>
            ) : null}
            <p className="ws-closer" {...kxField(`featsCloser.${lang}`)}>{resolveLocalized(props.featsCloser, lang, "es") ?? ""}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
