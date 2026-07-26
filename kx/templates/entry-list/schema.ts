import { z } from "zod";

/**
 * Dated list-of-entries container.
 *
 * Collapses sections 04 (projects) and 05 (writing) of the reference site
 * into the same template — and covers the common "blog index / changelog /
 * speaking page / release notes" shape generally.
 */
export const entryListSchema = z.object({
  heading: z.string().optional(),
  density: z.enum(["compact", "comfy"]).default("comfy"),
  divider: z.boolean().default(true),
  anchor: z.string().optional(),
});
