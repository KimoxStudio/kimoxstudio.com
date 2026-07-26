import type { TemplateDefinition } from "@kimoxstudio/core";
import { TestimonialCarouselComponent } from "./component";
import { testimonialCarouselSchema } from "./schema";

export const testimonialCarouselTemplate: TemplateDefinition<typeof testimonialCarouselSchema> = {
  name: "testimonial-carousel",
  component: TestimonialCarouselComponent,
  schema: testimonialCarouselSchema,
  category: "marketing",
};
