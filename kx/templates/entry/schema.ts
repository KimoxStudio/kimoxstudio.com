import { z } from "zod";

/**
 * `entry` — a single row inside an `entry-list`.
 *
 * Optional leading/trailing rails (date on the left, year on the right),
 * a single tag (e.g. "archivado"), and an optional href to make the row
 * clickable. Description is optional so the same shape covers a dense
 * date+title row (writing index) and a richer title+description+tag row
 * (project list).
 */
export const entrySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  leading: z.string().optional(),
  trailing: z.string().optional(),
  href: z.string().optional(),
  tag: z.string().optional(),
});
