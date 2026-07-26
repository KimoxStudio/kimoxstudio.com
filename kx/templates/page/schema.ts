import { z } from "zod";

export const pageSchema = z.object({
  theme: z
    .enum(["light", "dark"])
    .default("light")
    .describe("Color scheme used when chrome is 'styled'. Ignored when chrome is 'none'."),
  maxWidth: z
    .string()
    .optional()
    .describe("Optional CSS max-width applied when chrome is 'styled' (e.g. '72rem')."),
  chrome: z
    .enum(["styled", "none"])
    .default("styled")
    .describe(
      "'styled' (default) applies the stock inline background/color/min-height. 'none' renders a plain <main> with no inline styles so the site's own CSS ([data-theme] tokens, global styles) fully controls theming.",
    ),
});
