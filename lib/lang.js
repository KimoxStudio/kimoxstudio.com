'use client';

import { useEffect, useState } from 'react';

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

export function useLang() {
  const [lang, setLang] = useState('es');
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kimox-lang');
      if (stored) setLang(stored);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem('kimox-lang', lang);
    } catch {}
    document.documentElement.lang = lang;
  }, [lang]);
  return [lang, setLang];
}
