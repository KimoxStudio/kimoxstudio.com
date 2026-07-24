import type { TemplateDefinition } from "@kimoxstudio/core";
import { ProcessStepsComponent } from "./component";
import { processStepsSchema } from "./schema";

export const processStepsTemplate: TemplateDefinition<typeof processStepsSchema> = {
  name: "process-steps",
  component: ProcessStepsComponent,
  schema: processStepsSchema,
  category: "marketing",
};
