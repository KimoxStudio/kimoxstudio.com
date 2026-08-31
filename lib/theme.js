'use client';

import { useClientStore } from '@/kx/client-store';
import { themeStore } from '@/kx/stores';

// Same public API as before ([theme, toggle]) but backed by the shared
// external store (kx/stores.ts) instead of useState, so every independently
// mounted consumer (ThemeToggle, MastheadComponent) re-renders together on
// toggle instead of each holding its own disconnected copy. See lib/lang.js
// for the identical pattern already used for the language switcher.
//
// No post-mount "correction effect" here: `themeStore`'s `resolveInitial`
// (kx/stores.ts) already mirrors app/layout.jsx's pre-hydration script's
// exact resolution order (localStorage, else prefers-color-scheme, else
// 'dark'), so the store's client-side starting value already matches the
// `data-theme` that script set on `<html>` before hydration. A correction
// effect here previously ran *after* useTheme() but *before*
// MastheadComponent's own src-backfill effect in the same commit — so
// calling `themeStore.set()` from it couldn't rerun that already-queued
// effect, leaving it to act on stale state and double-fetch the inactive
// hero variant. Removing the correction effect removes that race entirely
// rather than papering over it.
export function useTheme() {
  const theme = useClientStore(themeStore);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    themeStore.set(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return [theme, toggle];
}
