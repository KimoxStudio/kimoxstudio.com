// Localized 404 for URLs that match no route. Rendered outside
// app/[locale]/layout.jsx (whose [locale] segment cannot resolve here), so it
// is a full document that repeats the layout's theme script and fonts.
import './fonts.css';
import './globals.css';
import NotFoundContent, { LOCALE_BOOT_SCRIPT } from '@/components/NotFoundContent';
import { BASE_URL } from '@/lib/urls';
import { themeInit } from '@/lib/theme-init';

// metadataBase so file-convention images (opengraph-image) resolve to the
// public origin instead of localhost. Next adds noindex to not-found pages.
// The <title> is set per locale by LOCALE_BOOT_SCRIPT, not here.
export const metadata = {
  metadataBase: new URL(BASE_URL),
};

export default function GlobalNotFound() {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {/* Self-hosted fonts (app/fonts.css); preload the two used above the fold. */}
        <link rel="preload" href="/fonts/familjen-grotesk-700-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/ibm-plex-mono-400-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: LOCALE_BOOT_SCRIPT }} />
        <NotFoundContent />
      </body>
    </html>
  );
}
