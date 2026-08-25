import { z } from "zod";

/**
 * Local copies of the `@kimoxstudio/registry` helpers `kx/templates/**`
 * actually use at runtime: `localized()` / `localizedList()` (Zod schema
 * builders, referenced only through `z.infer` for prop typing — no
 * CMS/admin coupling; the original's `.describe()` marker only existed for
 * the now-removed admin AutoForm and is dropped here as dead weight),
 * `resolveLocalized()` (picks the value for the current locale, with
 * fallback — genuinely used at render time by several `component.tsx`
 * files), and `kxField()` (tags an element with a `data-kx-field="<path>"`
 * attribute; harmless no-op now that the admin's visual editor that read it
 * is gone, kept only so call sites in `component.tsx` don't need editing).
 * Inlined as part of removing kimox-fw so the static homepage's templates
 * keep working identically without the package.
 */

type LocaleTuple = readonly [string, ...string[]];

/** `{ en: string, es: string, ... }` — one required string per language. */
export function localized<L extends LocaleTuple>(langs: L) {
  const shape = Object.fromEntries(langs.map((lang) => [lang, z.string()])) as {
    [K in L[number]]: z.ZodString;
  };
  return z.object(shape);
}

/** `{ en: string[], es: string[], ... }` — one string list per language. */
export function localizedList<L extends LocaleTuple>(langs: L) {
  const shape = Object.fromEntries(langs.map((lang) => [lang, z.array(z.string())])) as {
    [K in L[number]]: z.ZodArray<z.ZodString>;
  };
  return z.object(shape);
}

/**
 * Resolve a localized value: requested locale -> fallback locale -> first
 * defined entry -> undefined. Pure; safe in RSC and client components.
 */
export function resolveLocalized<T>(
  value: Partial<Record<string, T>> | null | undefined,
  locale: string,
  fallbackLocale?: string,
): T | undefined {
  if (!value || typeof value !== "object") return undefined;
  if (value[locale] !== undefined) return value[locale];
  if (fallbackLocale && value[fallbackLocale] !== undefined) return value[fallbackLocale];
  for (const entry of Object.values(value)) if (entry !== undefined) return entry;
  return undefined;
}

/** Data attribute the (removed) admin's visual editor used to locate a field in the DOM. */
export function kxField(path: string): { "data-kx-field": string } {
  return { "data-kx-field": path };
}
