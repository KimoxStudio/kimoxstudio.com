import { localized, localizedList } from "@/kx/localized";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const contactSectionSchema = z.object({
  title: localized(LANGS),
  body: localized(LANGS),
  or: localized(LANGS),
  email: z.string().describe("Contact email address (mailto target)"),
  phone: z.string().describe("Company phone in E.164 (tel: and wa.me target)"),
  phoneDisplay: z.string().describe("Phone formatted for display"),
  phoneLabel: localized(LANGS),
  whatsappLabel: localized(LANGS),
  callLabel: localized(LANGS),
  fieldName: localized(LANGS),
  fieldEmail: localized(LANGS),
  fieldBudget: localized(LANGS),
  fieldMessage: localized(LANGS),
  fieldSend: localized(LANGS),
  budgets: localizedList(LANGS),
});
