import { localized } from "@/kx/localized";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const footerWordmarkSchema = z.object({
  rights: localized(LANGS),
  backToTop: localized(LANGS),
  blogLabel: localized(LANGS),
  email: z.string(),
});
