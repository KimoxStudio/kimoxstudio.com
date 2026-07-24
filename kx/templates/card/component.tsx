import type { TemplateRenderProps } from "@kimoxstudio/core";
import type { z } from "zod";
import type { cardSchema } from "./schema";

type Props = z.infer<typeof cardSchema>;

export function CardComponent({ props }: TemplateRenderProps<Props>) {
  const content = (
    <>
      <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>{props.title}</h3>
      <p style={{ margin: "0.5rem 0 0", opacity: 0.85 }}>{props.body}</p>
    </>
  );
  const style: React.CSSProperties = {
    minWidth: 280,
    flex: "0 0 280px",
    padding: "1.5rem",
    border: "1px solid #e5e7eb",
    borderRadius: "0.5rem",
    background: "#ffffff",
    color: "#0a0a0a",
    scrollSnapAlign: "start",
    textDecoration: "none",
  };
  if (props.href) {
    return (
      <a data-template="card" href={props.href} style={style}>
        {content}
      </a>
    );
  }
  return (
    <article data-template="card" style={style}>
      {content}
    </article>
  );
}
