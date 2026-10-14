// Localized 404 for URLs that match no route. Rendered outside
// app/[locale]/layout.jsx (whose [locale] segment cannot resolve here), so it
// is a full document that repeats the layout's theme script and fonts.
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: LOCALE_BOOT_SCRIPT }} />
        <NotFoundContent />
      </body>
    </html>
  );
}
