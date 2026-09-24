'use client';

import { useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LangContext } from '@/components/LangProvider';
import { localePath } from '@/lib/urls';

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

/** Strip a /en or /ja prefix from a public pathname; es is unprefixed. */
const stripLocale = (pathname) =>
  (pathname || '/').replace(/^\/(en|ja)(?=\/|$)/, '') || '/';

// Same public API as before ([lang, setLang]), but the language now comes
// from the URL: app/[locale]/layout.jsx seeds LangContext with the route's
// locale, so the server-rendered HTML is already in the right language
// (Google/LLMs see localized markup, not the Spanish skeleton). setLang
// navigates to the same path under the target locale instead of mutating a
// client store — the language IS the URL now.
export function useLang() {
  const lang = useContext(LangContext);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    try {
      document.documentElement.lang = lang;
    } catch {}
  }, [lang]);
  const setLang = (next) => {
    if (next === lang) return;
    router.push(localePath(next, stripLocale(pathname)));
  };
  return [lang, setLang];
}
