import { localized } from "@/kx/localized";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const testimonialCarouselSchema = z.object({
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
