import type { TemplateDefinition } from "@kimoxstudio/core";
import { MaintenancePlansComponent } from "./component";
import { maintenancePlansSchema } from "./schema";

export const maintenancePlansTemplate: TemplateDefinition<typeof maintenancePlansSchema> = {
  name: "maintenance-plans",
  component: MaintenancePlansComponent,
  schema: maintenancePlansSchema,
  category: "marketing",
};
