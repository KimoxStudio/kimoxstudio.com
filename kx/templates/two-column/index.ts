import type { TemplateDefinition } from "@kx/core";
import { TwoColumnComponent } from "./component";
import { twoColumnSchema } from "./schema";

export const twoColumnTemplate: TemplateDefinition<typeof twoColumnSchema> = {
  name: "two-column",
  component: TwoColumnComponent,
  schema: twoColumnSchema,
  category: "layout",
  composition: {
    slots: ["start", "end"],
    // Also accept children as a fallback for consumers that don't use slots yet.
    acceptsChildren: true,
  },
};
