import { localized, localizedList } from "@/kx/localized";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const mastheadSchema = z.object({
  h1: localizedList(LANGS),
  sub: localized(LANGS),
  cta1: localized(LANGS),
  cta2: localized(LANGS),
  meta: localizedList(LANGS),
  facts: localizedList(LANGS),
});
