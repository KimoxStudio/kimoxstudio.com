import type { TemplateDefinition } from "@kx/core";
import { SiteNavComponent } from "./component";
import { siteNavSchema } from "./schema";

export const siteNavTemplate: TemplateDefinition<typeof siteNavSchema> = {
  name: "site-nav",
  component: SiteNavComponent,
  schema: siteNavSchema,
  category: "chrome",
};
