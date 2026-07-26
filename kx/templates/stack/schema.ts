import { z } from "zod";

/**
 * Vertical (or horizontal) stack layout primitive.
 *
 * Pairs with `two-column` as a first-class layout container so consumers
 * compose pages without inventing one-off section templates.
 */
export const stackSchema = z.object({
  direction: z.enum(["vertical", "horizontal"]).default("vertical"),
  gap: z.enum(["none", "sm", "md", "lg", "xl"]).default("md"),
  align: z.enum(["start", "center", "end", "stretch"]).default("stretch"),
  justify: z.enum(["start", "center", "end", "between", "around"]).default("start"),
  padding: z.enum(["none", "sm", "md", "lg", "xl"]).default("none"),
  anchor: z.string().optional(),
});
