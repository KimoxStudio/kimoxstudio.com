import type { TemplateDefinition } from "@kimoxstudio/core";
import { ContactFormComponent } from "./component";
import { contactFormSchema } from "./schema";

export const contactFormTemplate: TemplateDefinition<typeof contactFormSchema> = {
  name: "contact-form",
  component: ContactFormComponent,
  schema: contactFormSchema,
  category: "form",
};
