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
        responsive: z
          .object({
            desktop: z.array(z.string()),
            tablet: z.array(z.string()),
            mobile: z.array(z.string()),
          })
          .optional()
          .describe("Per-device screenshots; enables the device selector in the project modal"),
      }),
    )
    .default([]),
});
