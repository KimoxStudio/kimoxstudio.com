import type { TemplateRenderProps } from "@kimoxstudio/core";
import { Children, Fragment, isValidElement } from "react";
import type { z } from "zod";
import type { entryListSchema } from "./schema";

type Props = z.infer<typeof entryListSchema>;

export function EntryListComponent({ props, children }: TemplateRenderProps<Props>) {
  const childArray = Children.toArray(children).filter(isValidElement);

  return (
    <section
      data-template="entry-list"
      data-density={props.density}
      id={props.anchor}
      style={{
        padding: "1.5rem 0",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      }}
    >
      {props.heading ? (
        <h2
          style={{
            fontSize: "0.95rem",
            fontWeight: 500,
            opacity: 0.6,
            margin: "0 0 0.75rem",
            letterSpacing: "0.02em",
          }}
        >
          {props.heading}
        </h2>
      ) : null}
      <div data-part="entries">
        {childArray.map((child, index) => {
          const isLast = index === childArray.length - 1;
          return (
            <Fragment key={index}>
              {child}
              {props.divider && !isLast ? (
                <hr
                  style={{
                    border: 0,
                    borderTop: "1px solid currentColor",
                    opacity: 0.1,
                    margin: 0,
                  }}
                />
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
