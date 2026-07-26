"use client";

import type { TemplateRenderProps } from "@kimoxstudio/core";
import { kxField, resolveLocalized } from "@kimoxstudio/registry";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/kx/langs";
import TeamCardPhoto from "@/components/TeamCardPhoto";
import type { z } from "zod";
import type { teamGridSchema } from "./schema";

type Props = z.infer<typeof teamGridSchema>;

function SectionHead({ n, label, meta, title }: { n: string; label: string; meta: string; title: string }) {
  return (
    <div className="head">
      <span className="label">
        <b>§{n}</b> {label}
      </span>
      <span></span>
      <span className="meta">{meta}</span>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
    </div>
  );
}

// Re-homes the About section (intro + stat grid + team cards). The per-card
// canvas photo effect lives in components/TeamCardPhoto.jsx (unchanged).
export function TeamGridComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang, (next: Lang) => void];
  const title = (resolveLocalized(props.title, lang, "es") ?? "").replace(
    /(bien|well|丁寧に)/,
    (m) => `<em>${m}</em>`,
  );
  return (
    <section className="poster-section about" id="about">
      <div className="wrap">
        <SectionHead
          n="07"
          label={resolveLocalized(props.label, lang, "es") ?? ""}
          meta={lang === "ja" ? "私たちについて" : lang === "en" ? "the studio" : "el estudio"}
          title={title}
        />
        <p {...kxField(`body.${lang}`)}>{resolveLocalized(props.body, lang, "es")}</p>
        <div className="stats">
          {props.stats.map((s, i) => (
            <div className="stat" key={i}>
              <div className="num">{s.n}</div>
              <div className="lbl" {...kxField(`stats.${i}.label.${lang}`)}>{resolveLocalized(s.label, lang, "es")}</div>
            </div>
          ))}
        </div>

        <div className="team-block">
          <div className="head-row">
            <span className="label">
              <b>§07.1</b> {resolveLocalized(props.teamLabel, lang, "es")}
            </span>
            <span></span>
            <span className="label">
              {props.team.length} {lang === "ja" ? "人" : lang === "en" ? "people" : "personas"}
            </span>
            <h3>
              {resolveLocalized(props.teamLabel, lang, "es")}
              <em>.</em>
            </h3>
          </div>
          <p className="sub-line" {...kxField(`teamSub.${lang}`)}>{resolveLocalized(props.teamSub, lang, "es")}</p>
          <div className="team-grid">
            {props.team.map((p, i) => (
              <div className="team-card" key={i}>
                <TeamCardPhoto
                  initials={p.initials}
                  index={i}
                  lang={lang}
                  photoSerious={p.photoSerious}
                  photoFun={p.photoFun}
                  photoFunOffsetY={p.photoFunOffsetY}
                  photoFunScale={p.photoFunScale}
                  objectPositionSerious={p.objectPositionSerious}
                  objectPositionFun={p.objectPositionFun}
                />
                <div className="name-row">
                  <h4 className="name">{p.name}</h4>
                  <span className="num">
                    0{i + 1} / 0{props.team.length}
                  </span>
                </div>
                <div className="role" {...kxField(`team.${i}.role.${lang}`)}>{resolveLocalized(p.role, lang, "es")}</div>
                <p className="bio" {...kxField(`team.${i}.bio.${lang}`)}>{resolveLocalized(p.bio, lang, "es")}</p>
                <div className="skills">
                  {p.skills.map((sk, j) => (
                    <span key={j}>{sk}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
