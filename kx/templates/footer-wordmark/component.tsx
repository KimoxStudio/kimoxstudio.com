"use client";
import type { TemplateRenderProps } from "@kimoxstudio/core";
import { kxField, resolveLocalized } from "@kimoxstudio/registry";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/kx/langs";
import Link from "next/link";
import type { z } from "zod";
import type { footerWordmarkSchema } from "./schema";

type Props = z.infer<typeof footerWordmarkSchema>;

function BreakOnDots({ text }: { text: string }) {
  const segments = text.split(/(?<=[·.])/).filter(Boolean);
  return segments.map((seg, i) => {
    const m = seg.match(/^(.*?)([·.])$/);
    const body = m ? m[1] : seg;
    const dot = m ? m[2] : '';
    return (<span className="row" key={i}>{body}{dot && <span className="dot-accent">{dot}</span>}</span>);
  });
}

export function FooterWordmarkComponent({ props }: TemplateRenderProps<Props>) {
  const [lang] = useLang() as [Lang, (next: Lang) => void];
  return (
    <>
      <div className="wrap"><div className="footer-big" aria-hidden="true"><BreakOnDots text="KIMOX·STUDIO." /></div></div>
      <footer className="bot">
        <div className="wrap"><div className="row">
          <div {...kxField(`rights.${lang}`)}>{resolveLocalized(props.rights, lang, "es") ?? ""}</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href={`mailto:${props.email}`}>{props.email}</a>
            <Link href="/blog" {...kxField(`blogLabel.${lang}`)}>{resolveLocalized(props.blogLabel, lang, "es") ?? ""}</Link>
            <Link href="/politica-privacidad" {...kxField(`privacyLabel.${lang}`)}>{resolveLocalized(props.privacyLabel, lang, "es") ?? ""}</Link>
            <Link href="/aviso-legal" {...kxField(`legalLabel.${lang}`)}>{resolveLocalized(props.legalLabel, lang, "es") ?? ""}</Link>
            <a href="#top" {...kxField(`backToTop.${lang}`)}>{resolveLocalized(props.backToTop, lang, "es") ?? ""}</a>
          </div>
        </div></div>
      </footer>
    </>
  );
}
