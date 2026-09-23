import '../globals.css';
import { Analytics } from '@vercel/analytics/next';
import LangProvider from '@/components/LangProvider';
import { BASE_URL, LOCALES, localeUrl } from '@/lib/urls';

// Root layout, now under app/[locale] so the served HTML already comes in
// the right language (es at the unprefixed URLs via next.config.js rewrites,
// en/ja under /en and /ja). One static HTML per locale — no client JS needed
// for Google/LLMs to see the localized content.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// Localized site metadata. All strings are the site's existing copy
// (masthead h1/sub in app/[locale]/page.tsx) — nothing invented.
const META = {
  es: {
    title: 'Kimox Studio — Software con alma propia',
    description: 'Estudio de software. Aplicaciones web y móviles a medida.',
    ogTitle: 'Kimox Studio — Software con alma que habla tu idioma',
    ogDescription:
      'Estudio independiente. Diseñamos y desarrollamos aplicaciones web y móviles a medida. Sin plantillas, sin atajos.',
    ogLocale: 'es_ES',
  },
  en: {
    title: 'Kimox Studio — Software with soul',
    description: 'Software studio. Custom web and mobile applications.',
    ogTitle: 'Kimox Studio — Software with soul that speaks your language',
    ogDescription:
      'Independent studio. We design and build custom web and mobile applications. No templates, no shortcuts.',
    ogLocale: 'en_US',
  },
  ja: {
    title: 'Kimox Studio — 魂のあるソフトウェア',
    description: 'ソフトウェアスタジオ。カスタムのウェブ・モバイルアプリケーション。',
    ogTitle: 'Kimox Studio — 魂のあるソフトウェアをあなたの言葉で',
    ogDescription:
      '独立スタジオ。ウェブ・モバイルアプリケーションをオーダーメイドで設計・開発します。テンプレートなし、近道なし。',
    ogLocale: 'ja_JP',
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] ?? META.es;
  return {
    metadataBase: new URL(BASE_URL),
    title: m.title,
    description: m.description,
    // Favicon via App Router file conventions: app/favicon.ico (16/32/48) and
    // app/icon.png (192x192). Google Search does not support SVG favicons, so
    // the old icons:{icon:'/logos/icon.svg'} config was replaced by these files.
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: localeUrl(locale, '/'),
      siteName: 'Kimox Studio',
      locale: m.ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: m.ogTitle,
      description: m.description,
    },
  };
}

// Sets `data-theme` on <html> synchronously, before hydration or any paint,
// so CSS never has a themeless flash. `kx/templates/masthead/component.tsx`
// reuses this same synchronous, pre-hydration technique (and reads this same
// `data-theme` attribute, rather than re-reading localStorage) for the hero
// image's initial `src` — it can't be merged into this script because the
// hero <img> elements don't exist yet when this one runs (this one executes
// in <head>, before <body> is parsed).
// Organization structured data (JSON-LD) for search engines and AI crawlers.
// Only verifiable facts — no invented addresses or social profiles.
const organizationJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kimox Studio',
  url: 'https://www.kimoxstudio.com',
  logo: 'https://www.kimoxstudio.com/logos/icon.svg',
  email: 'info@kimoxstudio.com',
  description:
    'Estudio independiente de software. Diseñamos y desarrollamos aplicaciones web y móviles a medida.',
});

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

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
        />
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
        <LangProvider lang={locale}>{children}</LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
