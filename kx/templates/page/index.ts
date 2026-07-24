import type { TemplateDefinition } from "@kimoxstudio/core";
import { PageComponent } from "./component";
import { pageSchema } from "./schema";

export const pageTemplate: TemplateDefinition<typeof pageSchema> = {
  name: "page",
  component: PageComponent,
  schema: pageSchema,
  composition: { acceptsChildren: true },
};
