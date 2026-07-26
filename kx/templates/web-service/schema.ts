import { localized, localizedList } from "@kimoxstudio/registry";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

// "Web as a service" — the single monthly-fee plan that replaced the earlier
// three-tier maintenance block. Copy mirrors lib/i18n.js `webService`.
export const webServiceSchema = z.object({
  label: localized(LANGS),
  eyebrow: localized(LANGS),
  title: localized(LANGS),
  bridge: localized(LANGS),
  sub: localized(LANGS),
  price: localized(LANGS),
  igic: localized(LANGS),
  includesLabel: localized(LANGS),
  // Each entry is "HEADING — body"; the component splits on the em dash.
  feats: localizedList(LANGS),
  featsCloser: localized(LANGS),
  commitment: localized(LANGS),
  ctaLabel: localized(LANGS),
});
