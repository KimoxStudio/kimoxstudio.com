import { localized, localizedList } from "@/kx/localized";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const contactSectionSchema = z.object({
  title: localized(LANGS),
  body: localized(LANGS),
  or: localized(LANGS),
  email: z.string().describe("Contact email address (mailto target)"),
  fieldName: localized(LANGS),
  fieldEmail: localized(LANGS),
  fieldBudget: localized(LANGS),
  fieldMessage: localized(LANGS),
  fieldSend: localized(LANGS),
  budgets: localizedList(LANGS),
});
