import { localized } from "@/kx/localized";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const faqSchema = z.object({
  title: localized(LANGS),
  emphasis: localized(LANGS),
  items: z
    .array(
      z.object({
        q: localized(LANGS),
        a: localized(LANGS),
      }),
    )
    .default([]),
});
