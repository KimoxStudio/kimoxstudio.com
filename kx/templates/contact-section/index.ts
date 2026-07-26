import type { TemplateDefinition } from "@kimoxstudio/core";
import { ContactSectionComponent } from "./component";
import { contactSectionSchema } from "./schema";

export const contactSectionTemplate: TemplateDefinition<typeof contactSectionSchema> = {
  name: "contact-section",
  component: ContactSectionComponent,
  schema: contactSectionSchema,
  category: "form",
};
