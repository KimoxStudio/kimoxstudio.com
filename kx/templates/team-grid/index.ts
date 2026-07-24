import type { TemplateDefinition } from "@kimoxstudio/core";
import { TeamGridComponent } from "./component";
import { teamGridSchema } from "./schema";

export const teamGridTemplate: TemplateDefinition<typeof teamGridSchema> = {
  name: "team-grid",
  component: TeamGridComponent,
  schema: teamGridSchema,
  category: "marketing",
};
