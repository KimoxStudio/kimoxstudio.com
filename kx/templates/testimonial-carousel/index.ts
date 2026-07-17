import type { TemplateDefinition } from "@kx/core";
import { TestimonialCarouselComponent } from "./component";
import { testimonialCarouselSchema } from "./schema";

export const testimonialCarouselTemplate: TemplateDefinition<typeof testimonialCarouselSchema> = {
  name: "testimonial-carousel",
  component: TestimonialCarouselComponent,
  schema: testimonialCarouselSchema,
  category: "marketing",
};
