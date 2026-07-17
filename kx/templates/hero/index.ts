import type { TemplateDefinition } from "@kx/core";
import { HeroComponent } from "./component";
import { heroSchema } from "./schema";

export const heroTemplate: TemplateDefinition<typeof heroSchema> = {
  name: "hero",
  component: HeroComponent,
  schema: heroSchema,
};
