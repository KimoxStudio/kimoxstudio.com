import { localized, localizedList } from "@kimoxstudio/registry";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const contactSectionSchema = z.object({
  label: localized(LANGS),
  title: localized(LANGS),
  body: localized(LANGS),
  or: localized(LANGS),
  email: z.string().describe("Contact email address (mailto target)"),
  location: localized(LANGS),
  fieldName: localized(LANGS),
  fieldEmail: localized(LANGS),
  fieldBudget: localized(LANGS),
  fieldMessage: localized(LANGS),
  fieldSend: localized(LANGS),
  budgets: localizedList(LANGS),
});
