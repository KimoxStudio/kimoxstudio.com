import { localized, localizedList } from "@kimoxstudio/registry";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const manifestoSchema = z.object({
  label: localized(LANGS),
  title: localized(LANGS),
  body: localized(LANGS),
  bullets: localizedList(LANGS),
});
