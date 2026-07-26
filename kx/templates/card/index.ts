import type { TemplateDefinition } from "@kimoxstudio/core";
import { CardComponent } from "./component";
import { cardSchema } from "./schema";

export const cardTemplate: TemplateDefinition<typeof cardSchema> = {
  name: "card",
  component: CardComponent,
  schema: cardSchema,
};
