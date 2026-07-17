import { localized } from "@kx/registry";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const testimonialCarouselSchema = z.object({
  label: localized(LANGS),
  items: z
    .array(
      z.object({
        quote: localized(LANGS),
        name: z.string(),
        role: localized(LANGS),
      }),
    )
    .default([]),
});
