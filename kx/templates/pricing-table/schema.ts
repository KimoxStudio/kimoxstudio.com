import { localized, localizedList } from "@/kx/localized";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const pricingTableSchema = z.object({
  title: localized(LANGS),
  fromLabel: localized(LANGS),
  items: z
    .array(
      z.object({
        n: z.string(),
        priceFrom: localized(LANGS),
        title: localized(LANGS),
        body: localized(LANGS),
        bullets: localizedList(LANGS),
      }),
    )
    .default([]),
  extrasLabel: localized(LANGS),
  extras: localizedList(LANGS),
});
