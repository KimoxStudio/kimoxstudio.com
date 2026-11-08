"use client";
import type { TemplateRenderProps } from "@/kx/template-types";
import { resolveLocalized } from "@/kx/localized";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/kx/langs";
import { Fragment } from "react";
import type { z } from "zod";
import type { marqueeSchema } from "./schema";

type Props = z.infer<typeof marqueeSchema>;

export function MarqueeComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang];
  const items = resolveLocalized(props.items, lang, "es") ?? [];
  // Four copies keep the scrolling track full; only the first is real content.
  // The copies are hidden from assistive tech and from the static (reduced-motion) layout.
  const all: { text: string; copy: boolean }[] = [];
  for (let r = 0; r < 4; r++) for (let i = 0; i < items.length; i++) all.push({ text: items[i], copy: r > 0 });
  return (
    <div className="marquee">
      <div className="marquee-track">
        {all.map((it, i) => (
          <Fragment key={i}>
            <span className={it.copy ? "item copy" : "item"} aria-hidden={it.copy || undefined}>{it.text}{!it.copy && <span className="visually-hidden">, </span>}</span>
            <span className={it.copy ? "star copy" : "star"} aria-hidden="true">+</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
