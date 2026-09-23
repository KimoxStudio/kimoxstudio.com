// Server-safe URL helpers for the locale-prefixed routing scheme.
//
// Spanish (the default locale) lives at the unprefixed URLs the site has
// always had (/, /blog, /blog/<slug>); English and Japanese live under
// /en and /ja. The /es-prefixed routes exist internally (app/[locale]/*)
// but are never exposed: next.config.js rewrites / -> /es and 308-redirects
// any direct /es/* request back to the unprefixed URL.

export const BASE_URL = 'https://www.kimoxstudio.com';

// Single source of truth for the studio's public contact address. Every
// place that renders or references it imports this constant — a hand-typed
// duplicate is exactly how the original wrong-email bug happened.
export const CONTACT_EMAIL = 'info@kimoxstudio.com';

export const LOCALES = ['es', 'en', 'ja'];

export const DEFAULT_LOCALE = 'es';

/** Public path for `path` in `locale` — es stays unprefixed. */
export function localePath(locale, path = '/') {
  if (locale === DEFAULT_LOCALE) return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/** Absolute public URL for `path` in `locale`. */
export function localeUrl(locale, path = '/') {
  return `${BASE_URL}${localePath(locale, path)}`;
}

/**
 * `alternates.languages` map for a path: every locale points at its own
 * public URL, plus x-default on the Spanish (primary) version.
 */
export function languageAlternates(path = '/') {
  const languages = {};
  for (const locale of LOCALES) languages[locale] = localeUrl(locale, path);
  languages['x-default'] = localeUrl(DEFAULT_LOCALE, path);
  return languages;
}
