import { z } from "zod";

export const heroSchema = z.object({
  headline: z.string(),
  subheadline: z.string().optional(),
  background: z
    .object({
      type: z.enum(["image", "color"]),
      src: z.string(),
    })
    .optional(),
});
