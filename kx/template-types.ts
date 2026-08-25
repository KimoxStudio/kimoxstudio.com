import type { ReactNode } from "react";

/**
 * Local stand-ins for the two `@kimoxstudio/core` types every template
 * component (`kx/templates/<name>/component.tsx`) was written against.
 * Copied here (not re-exported from the package) as part of removing
 * kimox-fw: the CMS/admin layer that used to construct real `PageNode`
 * trees and pass them through `TemplateRenderProps` at request time is gone
 * (see README.md), so these are now just the prop shape the static
 * `app/page.tsx` (and every template component) still relies on for typing.
 */

/** Minimal stand-in for the old CMS `PageNode` — only the shape `app/page.tsx`'s `stubNode()` needs. */
export interface PageNode {
  id: string;
  template: string;
  props: Record<string, unknown>;
}

export interface TemplateRenderProps<P> {
  props: P;
  children?: ReactNode;
  slots?: Record<string, ReactNode>;
  /** Unused by every component (verified) — kept only for shape parity. */
  node: PageNode;
}
