import type { TemplateRenderProps } from "@/kx/template-types";
import type { z } from "zod";
import type { stackSchema } from "./schema";

type Props = z.infer<typeof stackSchema>;

const GAP_SCALE: Record<Props["gap"], string> = {
  none: "0",
  sm: "0.5rem",
  md: "1rem",
  lg: "2rem",
  xl: "4rem",
};

const PADDING_SCALE: Record<Props["padding"], string> = {
  none: "0",
  sm: "0.5rem",
  md: "1rem",
  lg: "2rem",
  xl: "4rem",
};

const JUSTIFY_MAP: Record<Props["justify"], string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
};

const ALIGN_MAP: Record<Props["align"], string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
};

export function StackComponent({ props, children }: TemplateRenderProps<Props>) {
  return (
    <section
      data-template="stack"
      data-direction={props.direction}
      id={props.anchor}
      style={{
        display: "flex",
        flexDirection: props.direction === "horizontal" ? "row" : "column",
        gap: GAP_SCALE[props.gap],
        alignItems: ALIGN_MAP[props.align],
        justifyContent: JUSTIFY_MAP[props.justify],
        padding: PADDING_SCALE[props.padding],
      }}
    >
      {children}
    </section>
  );
}
