import type { TemplateRegistry } from "@kimoxstudio/core";

// Stock vocabulary (copied from example-app) — base palette for the admin.
import { cardTemplate } from "./templates/card";
import { carouselTemplate } from "./templates/carousel";
import { contactFormTemplate } from "./templates/contact-form";
import { entryTemplate } from "./templates/entry";
import { entryListTemplate } from "./templates/entry-list";
import { heroTemplate } from "./templates/hero";
import { pageTemplate } from "./templates/page";
import { stackTemplate } from "./templates/stack";
import { twoColumnTemplate } from "./templates/two-column";

// Site-specific templates — bespoke sections of the kimoxstudio.com landing,
// each re-homing the original component's markup/classes with localized props.
import { contactSectionTemplate } from "./templates/contact-section";
import { footerWordmarkTemplate } from "./templates/footer-wordmark";
import { manifestoTemplate } from "./templates/manifesto";
import { marqueeTemplate } from "./templates/marquee";
import { mastheadTemplate } from "./templates/masthead";
import { webServiceTemplate } from "./templates/web-service";
import { pricingTableTemplate } from "./templates/pricing-table";
import { processStepsTemplate } from "./templates/process-steps";
import { projectListTemplate } from "./templates/project-list";
import { siteNavTemplate } from "./templates/site-nav";
import { teamGridTemplate } from "./templates/team-grid";
import { testimonialCarouselTemplate } from "./templates/testimonial-carousel";

export function registerTemplates(registry: TemplateRegistry): void {
  // Root container + stock generics.
  registry.register(pageTemplate);
  registry.register(heroTemplate);
  registry.register(carouselTemplate);
  registry.register(cardTemplate);
  registry.register(stackTemplate);
  registry.register(twoColumnTemplate);
  registry.register(entryListTemplate);
  registry.register(entryTemplate);
  registry.register(contactFormTemplate);

  // kimoxstudio.com landing sections.
  registry.register(siteNavTemplate);
  registry.register(mastheadTemplate);
  registry.register(marqueeTemplate);
  registry.register(manifestoTemplate);
  registry.register(pricingTableTemplate);
  registry.register(webServiceTemplate);
  registry.register(projectListTemplate);
  registry.register(processStepsTemplate);
  registry.register(testimonialCarouselTemplate);
  registry.register(teamGridTemplate);
  registry.register(contactSectionTemplate);
  registry.register(footerWordmarkTemplate);
}
