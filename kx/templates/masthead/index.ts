import type { TemplateDefinition } from "@kimoxstudio/core";
import { MastheadComponent } from "./component";
import { mastheadSchema } from "./schema";

export const mastheadTemplate: TemplateDefinition<typeof mastheadSchema> = {
  name: "masthead",
  component: MastheadComponent,
  schema: mastheadSchema,
  category: "marketing",
};
