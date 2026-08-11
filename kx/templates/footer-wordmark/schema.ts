import { localized } from "@kimoxstudio/registry";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const footerWordmarkSchema = z.object({
  rights: localized(LANGS),
  backToTop: localized(LANGS),
  blogLabel: localized(LANGS),
  privacyLabel: localized(LANGS),
  legalLabel: localized(LANGS),
  email: z.string(),
});
