import './globals.css';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  metadataBase: new URL('https://www.kimoxstudio.com'),
  title: 'Kimox Studio — Software con alma propia',
  description: 'Estudio de software. Aplicaciones web y móviles a medida.',
  icons: { icon: '/logos/icon.svg' },
  openGraph: {
    title: 'Kimox Studio — Software con alma que habla tu idioma',
    description:
      'Estudio independiente. Diseñamos y desarrollamos aplicaciones web y móviles a medida. Sin plantillas, sin atajos.',
    url: 'https://www.kimoxstudio.com',
    siteName: 'Kimox Studio',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kimox Studio — Software con alma que habla tu idioma',
    description:
      'Estudio independiente. Aplicaciones web y móviles a medida.',
  },
};

// Sets `data-theme` on <html> synchronously, before hydration or any paint,
// so CSS never has a themeless flash. `kx/templates/masthead/component.tsx`
// reuses this same synchronous, pre-hydration technique (and reads this same
// `data-theme` attribute, rather than re-reading localStorage) for the hero
// image's initial `src` — it can't be merged into this script because the
// hero <img> elements don't exist yet when this one runs (this one executes
// in <head>, before <body> is parsed).
const themeInit = `
(function(){
  try {
    var stored = localStorage.getItem('kimox-theme');
    var prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var theme = stored || prefers;
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning data-scroll-behavior="smooth">
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
        <div id="cursor-ring" />
        <div id="cursor" />
        <div id="cursor-trail" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
