// Locale tuple shared by every localized template schema on this site.
export const LANGS = ["es", "en", "ja"] as const;
export type Lang = (typeof LANGS)[number];
