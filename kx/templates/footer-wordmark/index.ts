import type { TemplateDefinition } from "@kimoxstudio/core";
import { FooterWordmarkComponent } from "./component";
import { footerWordmarkSchema } from "./schema";

export const footerWordmarkTemplate: TemplateDefinition<typeof footerWordmarkSchema> = {
  name: "footer-wordmark",
  component: FooterWordmarkComponent,
  schema: footerWordmarkSchema,
  category: "marketing",
};
