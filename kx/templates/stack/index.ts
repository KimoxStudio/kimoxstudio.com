import type { TemplateDefinition } from "@kimoxstudio/core";
import { StackComponent } from "./component";
import { stackSchema } from "./schema";

export const stackTemplate: TemplateDefinition<typeof stackSchema> = {
  name: "stack",
  component: StackComponent,
  schema: stackSchema,
  category: "layout",
  composition: { acceptsChildren: true },
};
