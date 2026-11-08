import { localized } from "@/kx/localized";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const projectListSchema = z.object({
  title: localized(LANGS),
  viewSite: localized(LANGS),
  viewMore: localized(LANGS),
  items: z
    .array(
      z.object({
        n: z.string(),
        name: z.string(),
        slug: z.string().describe("URL segment of the project detail page (/projects/<slug>)"),
        url: z.string(),
        year: z.string(),
        logo: z.string().optional(),
        category: localized(LANGS),
        body: localized(LANGS),
        tags: z.array(z.string()).default([]),
        screenshots: z.array(z.string()).default([]).describe("Screenshot paths; the home card uses the first one when responsive.desktop is empty"),
        responsive: z
          .object({
            desktop: z.array(z.string()),
            tablet: z.array(z.string()),
            mobile: z.array(z.string()),
          })
          .optional()
          .describe("Per-device screenshots; used by the project detail page"),
      }),
    )
    .default([]),
});
