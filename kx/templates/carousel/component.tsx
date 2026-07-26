import type { TemplateRenderProps } from "@kimoxstudio/core";
import type { z } from "zod";
import type { carouselSchema } from "./schema";

type Props = z.infer<typeof carouselSchema>;

export function CarouselComponent({ props, children }: TemplateRenderProps<Props>) {
  return (
    <section
      data-template="carousel"
      data-autoplay={props.autoplay ? "true" : "false"}
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        overflowX: "auto",
        padding: "2rem",
        scrollSnapType: "x mandatory",
      }}
    >
      {children}
    </section>
  );
}
