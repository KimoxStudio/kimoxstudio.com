import { localized, localizedList } from "@/kx/localized";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

// "Web & apps as a service" — the single monthly-fee plan that replaced the earlier
// three-tier maintenance block. Copy mirrors lib/i18n.js `webService`.
export const webServiceSchema = z.object({
  eyebrow: localized(LANGS),
  title: localized(LANGS),
  emphasis: localized(LANGS),
  bridge: localized(LANGS),
  sub: localized(LANGS),
  // Stacked big amounts (e.g. websites, apps); priceNote renders small below.
  prices: z.array(z.object({ label: localized(LANGS), amount: localized(LANGS) })),
  priceNote: localized(LANGS).optional(),
  igic: localized(LANGS),
  includesLabel: localized(LANGS),
  // Each entry is "HEADING — body"; the component splits on the em dash.
  // The component has one illustration per feat and renders at most that many (5).
  feats: localizedList(LANGS).describe("At most 5 entries are rendered, one per illustration"),
  featsCloser: localized(LANGS),
  commitment: localized(LANGS),
  ctaLabel: localized(LANGS),
});
