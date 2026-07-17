import type { TemplateRegistry } from "@kx/core";

// Templates are registered in phase 4 of the migration. Empty stub keeps the
// registry importable (admin + catch-all) while zero content is migrated.
export function registerTemplates(_registry: TemplateRegistry): void {
  // no templates yet
}
