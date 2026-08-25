import type { TemplateRenderProps } from "@/kx/template-types";
import type { z } from "zod";
import type { pageSchema } from "./schema";

type Props = z.infer<typeof pageSchema>;

export function PageComponent({ props, children }: TemplateRenderProps<Props>) {
  if (props.chrome === "none") {
    // Bare chrome: kimoxstudio.com owns its theming via [data-theme] tokens
    // on <html> (set by the root layout's inline script). The original
    // landing rendered its sections directly under <body> with no wrapper
    // element, so we emit a bare fragment — no <main>, no inline styles — to
    // keep the DOM structure (fixed nav, section anchors) byte-for-byte.
    return <>{children}</>;
  }
  const isDark = props.theme === "dark";
  return (
    <main
      data-template="page"
      data-theme={props.theme}
      style={{
        minHeight: "100vh",
        background: isDark ? "#0a0a0a" : "#ffffff",
        color: isDark ? "#f5f5f5" : "#0a0a0a",
        maxWidth: props.maxWidth,
        margin: props.maxWidth ? "0 auto" : undefined,
      }}
    >
      {children}
    </main>
  );
}
