import { z } from "zod";

/**
 * Two-column layout primitive (slot-based).
 *
 * Uses the renderer's `slots` path (`start`, `end`) rather than `children`
 * to dogfood `composition.slots` (framework observation F7). The renderer
 * passes a `slots` record to the component.
 */
export const twoColumnSchema = z.object({
  ratio: z.enum(["1:1", "2:1", "1:2", "3:2", "2:3"]).default("1:1"),
  align: z.enum(["top", "center", "bottom"]).default("top"),
  gap: z.enum(["sm", "md", "lg"]).default("md"),
  collapseAt: z.enum(["sm", "md", "lg"]).default("md"),
  anchor: z.string().optional(),
});
