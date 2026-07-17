import type { TemplateRenderProps } from "@kx/core";
import type { z } from "zod";
import type { heroSchema } from "./schema";

type Props = z.infer<typeof heroSchema>;

export function HeroComponent({ props }: TemplateRenderProps<Props>) {
  const background =
    props.background?.type === "color"
      ? props.background.src
      : props.background?.type === "image"
        ? `center / cover no-repeat url(${props.background.src})`
        : "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)";

  return (
    <section
      data-template="hero"
      style={{
        padding: "4rem 2rem",
        textAlign: "center",
        background,
      }}
    >
      <h1 style={{ fontSize: "3rem", margin: 0, fontWeight: 700 }}>{props.headline}</h1>
      {props.subheadline ? (
        <p style={{ fontSize: "1.25rem", marginTop: "0.5rem", opacity: 0.8 }}>
          {props.subheadline}
        </p>
      ) : null}
    </section>
  );
}
