import { localized } from "@kimoxstudio/registry";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const projectListSchema = z.object({
  label: localized(LANGS),
  title: localized(LANGS),
  viewSite: localized(LANGS),
  items: z
    .array(
      z.object({
        n: z.string(),
        name: z.string(),
        url: z.string(),
        year: z.string(),
        logo: z.string().optional(),
        category: localized(LANGS),
        body: localized(LANGS),
        tags: z.array(z.string()).default([]),
      }),
    )
    .default([]),
});
