'use client';

import { createContext } from 'react';

// Route-driven language context. app/[locale]/layout.jsx mounts this with
// the locale from the URL, so every client component that calls useLang()
// (lib/lang.js) resolves the same language on the server render as in the
// browser — the served HTML already comes in the right language, no JS or
// localStorage involved. Replaces the old client-only langStore.
export const LangContext = createContext('es');

export default function LangProvider({ lang, children }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}
