"use client";

import type { TemplateRenderProps } from "@kx/core";
import type { z } from "zod";
import Nav from "@/components/Nav";
import { useLang } from "@/lib/lang";
import { useSmoothCursor } from "@/lib/cursor";
import type { siteNavSchema } from "./schema";

type Props = z.infer<typeof siteNavSchema>;

// Re-homes the existing shared <Nav> (logo, section anchors, /blog link, CTA
// pill, theme toggle, language switch) with mode="landing", and initializes
// the smooth custom cursor that LandingClient used to own. Both read from the
// shared client stores so the switcher/toggle drive every section template.
export function SiteNavComponent(_props: TemplateRenderProps<Props>) {
  const [lang, setLang] = useLang();
  useSmoothCursor();
  return <Nav lang={lang} setLang={setLang} mode="landing" />;
}
