import { localized, localizedList } from "@/kx/localized";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const manifestoSchema = z.object({
  title: localized(LANGS),
  body: localized(LANGS),
  bullets: localizedList(LANGS),
});
