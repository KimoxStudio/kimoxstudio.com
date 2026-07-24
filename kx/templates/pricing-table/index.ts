import type { TemplateDefinition } from "@kimoxstudio/core";
import { PricingTableComponent } from "./component";
import { pricingTableSchema } from "./schema";

export const pricingTableTemplate: TemplateDefinition<typeof pricingTableSchema> = {
  name: "pricing-table",
  component: PricingTableComponent,
  schema: pricingTableSchema,
  category: "marketing",
};
