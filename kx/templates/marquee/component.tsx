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
  const [lang] = useLang() as [Lang, (next: Lang) => void];
  const items = resolveLocalized(props.items, lang, "es") ?? [];
  const all = [];
  for (let r = 0; r < 4; r++) for (let i = 0; i < items.length; i++) all.push(items[i]);
  return (
    <div className="marquee">
      <div className="marquee-track">
        {all.map((it, i) => (
          <Fragment key={i}>
            <span className="item">{it}</span>
            <span className="star">+</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
