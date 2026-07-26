import type { TemplateDefinition } from "@kimoxstudio/core";
import { CarouselComponent } from "./component";
import { carouselSchema } from "./schema";

export const carouselTemplate: TemplateDefinition<typeof carouselSchema> = {
  name: "carousel",
  component: CarouselComponent,
  schema: carouselSchema,
  composition: { acceptsChildren: true, allowedChildren: ["card"] },
};
