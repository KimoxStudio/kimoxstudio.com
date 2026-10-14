import '../globals.css';
import { Analytics } from '@vercel/analytics/next';
import LangProvider from '@/components/LangProvider';
import { BASE_URL, LOCALES, localeUrl } from '@/lib/urls';
import { serializeJsonLd, siteGraph } from '@/lib/jsonld';
import { themeInit } from '@/lib/theme-init';

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
    title: 'Kimox Studio — Webs y apps a medida en Las Palmas',
    description:
      'Estudio de software con base en Las Palmas: webs y apps a medida y consultoría de IA, desde 80 €/mes. Trabajamos en remoto con clientes de cualquier país.',
    ogTitle: 'Kimox Studio — Software con alma que habla tu idioma',
    ogDescription:
      'Estudio independiente con base en Las Palmas de Gran Canaria. Webs y apps a medida y consultoría de IA, desde 80 €/mes. Sin plantillas, sin atajos.',
    ogLocale: 'es_ES',
  },
  en: {
    title: 'Kimox Studio — Custom Web & App Development',
    description:
      'Software studio based in Las Palmas, Canary Islands: custom websites, web and mobile apps and AI consulting, from €80/month. Remote, with clients worldwide.',
    ogTitle: 'Kimox Studio — Software with soul that speaks your language',
    ogDescription:
      'Independent studio based in Las Palmas de Gran Canaria. Custom web and mobile apps and AI consulting, from €80/month. No templates, no shortcuts.',
    ogLocale: 'en_US',
  },
  ja: {
    title: 'Kimox Studio — ウェブ・アプリのオーダーメイド開発',
    description:
      'ラス・パルマス（グラン・カナリア）を拠点とするソフトウェアスタジオ。ウェブサイト・アプリのオーダーメイド開発とAIコンサルティングを月額80€から。世界中のお客様とリモートで対応します。',
    ogTitle: 'Kimox Studio — 魂のあるソフトウェアをあなたの言葉で',
    ogDescription:
      'ラス・パルマス・デ・グラン・カナリアを拠点とする独立スタジオ。ウェブ・モバイルアプリのオーダーメイド開発とAIコンサルティングを月額80€から。テンプレートなし、近道なし。',
    ogLocale: 'ja_JP',
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const m = META[locale] ?? META.es;
  // Explicit og:image/twitter:image. When the root layout lived at app/
  // next to app/opengraph-image.jsx the file convention attached the image
  // automatically, but after the move to app/[locale] the layout sits in a
  // child segment and Next.js does not reliably carry the ancestor's
  // file-convention image across segments (and this openGraph object would
  // shallow-replace it anyway). app/opengraph-image.jsx still serves the
  // poster at /opengraph-image; we just reference it explicitly here so
  // home and the blog index (which inherit this metadata) keep a preview
  // image in all three locales.
  const ogImage = {
    url: `${BASE_URL}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: m.ogTitle,
  };
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
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.ogTitle,
      description: m.description,
      images: [ogImage],
    },
  };
}

// The `data-theme` init script (lib/theme-init.js) runs before hydration or any
// paint, so CSS never has a themeless flash. `kx/templates/masthead/component.tsx`
// reuses this same synchronous, pre-hydration technique (and reads this same
// `data-theme` attribute, rather than re-reading localStorage) for the hero
// image's initial `src` — it can't be merged into this script because the
// hero <img> elements don't exist yet when this one runs (this one executes
// in <head>, before <body> is parsed).

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {/* Organization + WebSite graph, see lib/jsonld.js. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteGraph(locale)) }}
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
