import type { TemplateRenderProps } from "@/kx/template-types";
import type { z } from "zod";
import type { entrySchema } from "./schema";

type Props = z.infer<typeof entrySchema>;

export function EntryComponent({ props }: TemplateRenderProps<Props>) {
  const inner = (
    <>
      {props.leading ? (
        <span
          data-part="leading"
          style={{
            color: "#807e76",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "0.85em",
            flex: "0 0 auto",
            minWidth: "5rem",
          }}
        >
          {props.leading}
        </span>
      ) : null}
      <span data-part="body" style={{ flex: "1 1 auto", minWidth: 0 }}>
        <span data-part="title" style={{ fontWeight: 600 }}>
          {props.title}
        </span>
        {props.description ? (
          <span
            data-part="description"
            style={{ marginLeft: "0.5rem", opacity: 0.75 }}
          >
            — {props.description}
          </span>
        ) : null}
        {props.tag ? (
          <span
            data-part="tag"
            style={{
              marginLeft: "0.5rem",
              padding: "0.05em 0.4em",
              borderRadius: "0.25em",
              border: "1px solid currentColor",
              opacity: 0.6,
              fontSize: "0.75em",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {props.tag}
          </span>
        ) : null}
      </span>
      {props.trailing ? (
        <span
          data-part="trailing"
          style={{
            color: "#807e76",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "0.85em",
            flex: "0 0 auto",
            marginLeft: "auto",
          }}
        >
          {props.trailing}
        </span>
      ) : null}
    </>
  );

  const baseStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    gap: "0.75rem",
    padding: "0.75rem 0",
    color: "inherit",
    textDecoration: "none",
  };

  if (props.href) {
    return (
      <a data-template="entry" href={props.href} style={baseStyle}>
        {inner}
      </a>
    );
  }
  return (
    <div data-template="entry" style={baseStyle}>
      {inner}
    </div>
  );
}
