'use client';

import { useContext, useEffect } from 'react';
import { LangContext } from '@/components/LangProvider';

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

// The language comes from the URL: app/[locale]/layout.jsx seeds LangContext
// with the route's locale, so the server-rendered HTML is already in the
// right language (Google/LLMs see localized markup, not the Spanish
// skeleton). Switching language is a plain link to the same page under the
// other locale (see Nav), so there is no setter.
export function useLang() {
  const lang = useContext(LangContext);
  useEffect(() => {
    try {
      document.documentElement.lang = lang;
    } catch {}
  }, [lang]);
  return [lang];
}
