import { localized } from "@/kx/localized";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const projectListSchema = z.object({
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
        screenshots: z.array(z.string()).default([]).describe("Real screenshot paths; falls back to placeholders when empty"),
      }),
    )
    .default([]),
});
