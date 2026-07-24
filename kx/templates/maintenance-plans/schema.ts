import { localized, localizedList } from "@kimoxstudio/registry";
import { z } from "zod";
import { LANGS } from "@/kx/langs";

// Monthly maintenance plans — recurring counterpart to the one-off
// `pricing-table` section. Prices/units are plain strings (identical across
// locales); prose is localized. `ja` currently mirrors `en` as a temporary
// fallback pending professional translation.
export const maintenancePlansSchema = z.object({
  label: localized(LANGS),
  // Subscription pill/badge (e.g. "Suscripción · Cuidado mensual"). Optional
  // for backward compatibility with docs authored before the badge existed.
  badge: localized(LANGS).optional(),
  title: localized(LANGS),
  subtitle: localized(LANGS),
  plans: z
    .array(
      z.object({
        n: z.string(),
        name: z.string(),
        price: z.string(),
        priceUnit: localized(LANGS),
        term: localized(LANGS),
        hook: localized(LANGS),
        features: localizedList(LANGS),
        // Highlights a plan as recommended (orange top rule + filled CTA).
        recommended: z.boolean().optional(),
      }),
    )
    .default([]),
  // Bridge line connecting the monthly subscription to the one-off services
  // below it. Optional for backward compatibility.
  bridge: localized(LANGS).optional(),
  note: localized(LANGS),
});
