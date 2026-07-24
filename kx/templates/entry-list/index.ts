import type { TemplateDefinition } from "@kimoxstudio/core";
import { EntryListComponent } from "./component";
import { entryListSchema } from "./schema";

export const entryListTemplate: TemplateDefinition<typeof entryListSchema> = {
  name: "entry-list",
  component: EntryListComponent,
  schema: entryListSchema,
  category: "collection",
  composition: { acceptsChildren: true, allowedChildren: ["entry"] },
};
