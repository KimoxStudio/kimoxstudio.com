"use client";

import { createClientStore } from "./client-store";
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

export type Theme = "dark" | "light";

/**
 * Shared client theme store. ThemeToggle (navbar) and MastheadComponent
 * (hero) mount as sibling React trees with no common parent, so a
 * per-component `useState` in lib/theme.js gave each its own copy — toggling
 * the button never notified the hero's src-backfill effect. Same fix and
 * persistence key ('kimox-theme') as the pre-existing langStore above.
 */
export const themeStore = createClientStore<Theme>("dark", {
  key: "kimox-theme",
  serialize: (v) => v,
  deserialize: (r) => r as Theme,
});
