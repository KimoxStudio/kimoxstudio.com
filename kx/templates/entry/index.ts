import type { TemplateDefinition } from "@kx/core";
import { EntryComponent } from "./component";
import { entrySchema } from "./schema";

export const entryTemplate: TemplateDefinition<typeof entrySchema> = {
  name: "entry",
  component: EntryComponent,
  schema: entrySchema,
  category: "collection",
};
