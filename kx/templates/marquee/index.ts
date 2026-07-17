import type { TemplateDefinition } from "@kx/core";
import { MarqueeComponent } from "./component";
import { marqueeSchema } from "./schema";

export const marqueeTemplate: TemplateDefinition<typeof marqueeSchema> = {
  name: "marquee",
  component: MarqueeComponent,
  schema: marqueeSchema,
  category: "marketing",
};
