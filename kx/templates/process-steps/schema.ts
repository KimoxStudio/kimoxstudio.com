import { localized } from "@/kx/localized";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const processStepsSchema = z.object({
  label: localized(LANGS),
  title: localized(LANGS),
  steps: z
    .array(
      z.object({
        n: z.string(),
        title: localized(LANGS),
        body: localized(LANGS),
      }),
    )
    .default([]),
});
