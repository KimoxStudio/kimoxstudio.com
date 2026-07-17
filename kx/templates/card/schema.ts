import { z } from "zod";

export const cardSchema = z.object({
  title: z.string(),
  body: z.string(),
  href: z.string().optional(),
});
