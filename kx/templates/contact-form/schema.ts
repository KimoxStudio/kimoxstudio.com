import { z } from "zod";

/**
 * `contact-form` — first form primitive in the framework.
 *
 * Posts to `endpoint` (any URL — a Next.js API route, route handler, or a
 * server action exposed via a POST route). The renderer keeps the markup
 * progressive: the form submits without JavaScript and consumers can
 * upgrade to client-side hydration later when the widget concept lands.
 */
export const contactFormSchema = z.object({
  intro: z.string().optional(),
  submitLabel: z.string().default("Enviar"),
  endpoint: z.string(),
  method: z.enum(["POST", "GET"]).default("POST"),
  fields: z.array(
    z.object({
      name: z.string(),
      label: z.string(),
      type: z.enum(["text", "email", "textarea"]),
      placeholder: z.string().optional(),
      required: z.boolean().default(false),
    }),
  ),
  fallback: z
    .object({
      label: z.string(),
      href: z.string(),
    })
    .optional(),
  anchor: z.string().optional(),
});
