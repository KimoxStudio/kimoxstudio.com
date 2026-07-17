import { z } from "zod";

export const carouselSchema = z.object({
  autoplay: z.boolean().default(false),
  intervalMs: z.number().int().positive().optional(),
});
