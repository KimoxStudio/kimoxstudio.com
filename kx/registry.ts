import type { TemplateRegistry } from "@kimoxstudio/core";
import { createRegistry } from "@kimoxstudio/registry";
import { registerTemplates } from "./register";

// Process-wide registry singleton. Only pulls React + Zod (via templates), so
// it is safe to import from client components — the admin AutoForm needs it on
// the client. Never import ./config here (that would drag server-only deps in).
type GlobalKx = { __kxRegistry?: TemplateRegistry };
const g = globalThis as unknown as GlobalKx;

export const registry: TemplateRegistry =
  g.__kxRegistry ??
  (g.__kxRegistry = (() => {
    const r = createRegistry();
    registerTemplates(r);
    return r;
  })());
