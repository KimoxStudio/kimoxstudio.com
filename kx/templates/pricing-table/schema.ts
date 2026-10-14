import { localized, localizedList } from "@/kx/localized";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const pricingTableSchema = z.object({
  title: localized(LANGS),
  fromLabel: localized(LANGS),
  billing: z.object({ groupLabel: localized(LANGS), monthlyLabel: localized(LANGS), oneOffLabel: localized(LANGS) }),
  items: z
    .array(
      z.object({
        n: z.string(),
        priceFrom: localized(LANGS),
        priceMonthly: localized(LANGS),
        priceMonthlyNote: localized(LANGS).optional(),
        // Secondary line under the price naming the OTHER billing mode, so
        // both prices are in the HTML whichever mode is selected.
        altOneOff: localized(LANGS).optional(),
        altMonthly: localized(LANGS).optional(),
        title: localized(LANGS),
        body: localized(LANGS),
        bullets: localizedList(LANGS),
        bulletsMonthly: localizedList(LANGS).optional(),
      }),
    )
    .default([]),
  extrasLabel: localized(LANGS),
  extras: localizedList(LANGS),
});
