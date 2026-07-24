import type { TemplateDefinition } from "@kimoxstudio/core";
import { ProjectListComponent } from "./component";
import { projectListSchema } from "./schema";

export const projectListTemplate: TemplateDefinition<typeof projectListSchema> = {
  name: "project-list",
  component: ProjectListComponent,
  schema: projectListSchema,
  category: "marketing",
};
