import { localized } from "@kx/registry";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const teamGridSchema = z.object({
  label: localized(LANGS),
  title: localized(LANGS),
  body: localized(LANGS),
  stats: z
    .array(
      z.object({
        n: z.string(),
        label: localized(LANGS),
      }),
    )
    .default([]),
  teamLabel: localized(LANGS),
  teamSub: localized(LANGS),
  team: z
    .array(
      z.object({
        initials: z.string(),
        name: z.string(),
        photoSerious: z.string().optional().describe("Path to the 'serious' photo (painted on canvas)"),
        photoFun: z.string().optional().describe("Path to the 'fun' photo revealed on scratch"),
        photoFunOffsetY: z.number().optional().describe("Vertical pixel offset for the fun photo"),
        photoFunScale: z.number().optional().describe("Scale factor for the fun photo"),
        objectPositionSerious: z.string().optional().describe("CSS object-position for the serious photo, e.g. '50% 50%'"),
        objectPositionFun: z.string().optional().describe("CSS object-position for the fun photo"),
        role: localized(LANGS),
        bio: localized(LANGS),
        skills: z.array(z.string()).default([]),
      }),
    )
    .default([]),
});
