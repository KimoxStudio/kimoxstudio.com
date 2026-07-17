import { localized, localizedList } from "@kx/registry";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const mastheadSchema = z.object({
  h1: localizedList(LANGS),
  sub: localized(LANGS),
  cta1: localized(LANGS),
  cta2: localized(LANGS),
  location: localized(LANGS),
});
