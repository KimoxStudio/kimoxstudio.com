import type { TemplateRenderProps } from "@/kx/template-types";
import type { z } from "zod";
import type { contactFormSchema } from "./schema";

type Props = z.infer<typeof contactFormSchema>;

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.85rem",
  marginBottom: "0.35rem",
  opacity: 0.8,
};

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "0.55rem 0.7rem",
  fontFamily: "inherit",
  fontSize: "0.95rem",
  background: "transparent",
  color: "inherit",
  border: "1px solid currentColor",
  borderRadius: "0.25rem",
  outline: "none",
};

export function ContactFormComponent({ props }: TemplateRenderProps<Props>) {
  return (
    <section
      data-template="contact-form"
      id={props.anchor}
      style={{ padding: "1.5rem 0" }}
    >
      {props.intro ? (
        <p style={{ margin: "0 0 1rem", opacity: 0.85 }}>{props.intro}</p>
      ) : null}
      <form
        action={props.endpoint}
        method={props.method}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "32rem",
        }}
      >
        {props.fields.map((field) => {
          const inputId = `contact-form-${field.name}`;
          return (
            <div key={field.name} data-field={field.name}>
              <label htmlFor={inputId} style={labelStyle}>
                {field.label}
                {field.required ? <span aria-hidden="true"> *</span> : null}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={inputId}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              ) : (
                <input
                  id={inputId}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  style={inputStyle}
                />
              )}
            </div>
          );
        })}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginTop: "0.25rem",
            flexWrap: "wrap",
          }}
        >
          <button
            type="submit"
            style={{
              padding: "0.6rem 1.1rem",
              border: "1px solid currentColor",
              borderRadius: "0.25rem",
              background: "currentColor",
              color: "#fff",
              fontFamily: "inherit",
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            {props.submitLabel}
          </button>
          {props.fallback ? (
            <a
              href={props.fallback.href}
              data-part="fallback"
              style={{ color: "inherit", opacity: 0.7 }}
            >
              {props.fallback.label}
            </a>
          ) : null}
        </div>
      </form>
    </section>
  );
}
