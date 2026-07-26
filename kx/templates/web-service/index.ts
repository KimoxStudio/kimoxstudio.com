import type { TemplateDefinition } from "@kimoxstudio/core";
import { WebServiceComponent } from "./component";
import { webServiceSchema } from "./schema";

export const webServiceTemplate: TemplateDefinition<typeof webServiceSchema> = {
  name: "web-service",
  component: WebServiceComponent,
  schema: webServiceSchema,
  category: "marketing",
};
