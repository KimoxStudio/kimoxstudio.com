import type { TemplateDefinition } from "@kx/core";
import { FooterWordmarkComponent } from "./component";
import { footerWordmarkSchema } from "./schema";

export const footerWordmarkTemplate: TemplateDefinition<typeof footerWordmarkSchema> = {
  name: "footer-wordmark",
  component: FooterWordmarkComponent,
  schema: footerWordmarkSchema,
  category: "marketing",
};
