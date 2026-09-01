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
 *
 * `resolveInitial` mirrors `app/layout.jsx`'s pre-hydration script exactly
 * (localStorage value if present, else `prefers-color-scheme`, else 'dark')
 * so the store's client-side starting value already matches the `data-theme`
 * that script synchronously set on `<html>` before hydration ran. Without
 * this, a first-time visitor with no stored theme would start the store at
 * the hardcoded `initial` ('dark') regardless of OS preference, requiring a
 * post-mount correction effect in `useTheme()` — which raced with
 * MastheadComponent's own effect and could still trigger a double-fetch of
 * the inactive hero variant. `getServerSnapshot()` is unaffected: it always
 * returns `initial` ('dark'), matching this script's own SSR/catch fallback.
 */
export const themeStore = createClientStore<Theme>("dark", {
  key: "kimox-theme",
  serialize: (v) => v,
  deserialize: (r) => r as Theme,
  resolveInitial: () => {
    try {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch {
      return "dark";
    }
  },
});
