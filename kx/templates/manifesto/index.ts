import type { TemplateDefinition } from "@kimoxstudio/core";
import { ManifestoComponent } from "./component";
import { manifestoSchema } from "./schema";

export const manifestoTemplate: TemplateDefinition<typeof manifestoSchema> = {
  name: "manifesto",
  component: ManifestoComponent,
  schema: manifestoSchema,
  category: "marketing",
};
