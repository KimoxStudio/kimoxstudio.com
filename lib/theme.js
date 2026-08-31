'use client';

import { useEffect } from 'react';
import { useClientStore } from '@/kx/client-store';
import { themeStore } from '@/kx/stores';

// Same public API as before ([theme, toggle]) but backed by the shared
// external store (kx/stores.ts) instead of useState, so every independently
// mounted consumer (ThemeToggle, MastheadComponent) re-renders together on
// toggle instead of each holding its own disconnected copy. See lib/lang.js
// for the identical pattern already used for the language switcher.
export function useTheme() {
  const theme = useClientStore(themeStore);

  // On mount, correct the store from the DOM's actual `data-theme` attribute
  // — set synchronously pre-hydration in app/layout.jsx from localStorage or
  // prefers-color-scheme — since the store's own hydration only reads
  // localStorage directly and doesn't know about the prefers-color-scheme
  // fallback used when nothing is stored yet.
  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    if (current !== theme) themeStore.set(current);
  }, [theme]);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    themeStore.set(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return [theme, toggle];
}
