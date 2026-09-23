"use client";

import { createClientStore } from "./client-store";

// The language store that used to live here is gone: language is now
// route-driven (app/[locale]/* + LangContext in components/LangProvider.jsx)
// so the server-rendered HTML already comes in the right language. Only the
// theme store remains client-side (theme is a per-device preference, not
// content).

export type Theme = "dark" | "light";

/**
 * Shared client theme store. ThemeToggle (navbar) and MastheadComponent
 * (hero) mount as sibling React trees with no common parent, so a
 * per-component `useState` in lib/theme.js gave each its own copy — toggling
 * the button never notified the hero's src-backfill effect. Same fix and
 * persistence key ('kimox-theme') as before.
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
