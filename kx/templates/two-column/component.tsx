import type { TemplateRenderProps } from "@kimoxstudio/core";
import type { z } from "zod";
import type { twoColumnSchema } from "./schema";

type Props = z.infer<typeof twoColumnSchema>;

const RATIO_MAP: Record<Props["ratio"], string> = {
  "1:1": "1fr 1fr",
  "2:1": "2fr 1fr",
  "1:2": "1fr 2fr",
  "3:2": "3fr 2fr",
  "2:3": "2fr 3fr",
};

const GAP_MAP: Record<Props["gap"], string> = {
  sm: "0.5rem",
  md: "1.5rem",
  lg: "3rem",
};

const ALIGN_MAP: Record<Props["align"], string> = {
  top: "start",
  center: "center",
  bottom: "end",
};

export function TwoColumnComponent({ props, slots, children }: TemplateRenderProps<Props>) {
  // Prefer slots (`start`/`end`); fall back to splitting children if a consumer
  // hasn't migrated yet (first child -> start, rest -> end).
  let start: React.ReactNode = slots?.start;
  let end: React.ReactNode = slots?.end;

  if (!start && !end && children) {
    const childArray = Array.isArray(children) ? children : [children];
    start = childArray[0];
    end = childArray.slice(1);
  }

  return (
    <section
      data-template="two-column"
      data-ratio={props.ratio}
      id={props.anchor}
      style={{
        display: "grid",
        gridTemplateColumns: RATIO_MAP[props.ratio],
        alignItems: ALIGN_MAP[props.align],
        gap: GAP_MAP[props.gap],
        width: "100%",
      }}
    >
      <div data-slot="start" style={{ minWidth: 0 }}>
        {start}
      </div>
      <div data-slot="end" style={{ minWidth: 0 }}>
        {end}
      </div>
    </section>
  );
}
