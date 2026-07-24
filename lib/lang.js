'use client';

import { useEffect } from 'react';
import { useClientStore } from '@kimoxstudio/renderer/client';
import { langStore } from '@/kx/stores';

export const LANGS = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: 'JA' },
];

export const t = (n, l) => {
  if (n == null) return '';
  if (typeof n === 'string' || typeof n === 'number' || Array.isArray(n)) return n;
  return n[l] ?? n.en ?? n.es ?? '';
};

// Same public API as before ([lang, setLang]) but backed by the shared
// external store (kx/stores.ts) instead of useState, so the nav switcher
// drives every independently-mounted template. Islands that import useLang
// (BlogClient, BlogPostClient) keep working and now share the same store.
export function useLang() {
  const lang = useClientStore(langStore);
  useEffect(() => {
    try {
      document.documentElement.lang = lang;
    } catch {}
  }, [lang]);
  const setLang = (next) => langStore.set(next);
  return [lang, setLang];
}
