"use client";

import { createClientStore } from "@kx/renderer/client";
import type { Lang } from "./langs";

/**
 * Shared client language store. The site's templates mount as sibling React
 * trees with no common parent, so the nav's language switcher can only drive
 * every section through a module-scoped external store. Replaces the old
 * per-component `useState('es')` in lib/lang.js (which gave each section its
 * own copy). Persisted to localStorage under the original key 'kimox-lang'
 * with a raw-string serializer so pre-migration saved values still load.
 */
export const langStore = createClientStore<Lang>("es", {
  key: "kimox-lang",
  serialize: (v) => v,
  deserialize: (r) => r as Lang,
});
