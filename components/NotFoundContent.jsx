import Link from 'next/link';
import { localePath } from '../lib/urls';
import '../app/not-found.css';

// Server component: global-not-found is prerendered once, for every unmatched
// URL, so it cannot know the visitor's locale at render time. All three
// locales are rendered and CSS shows the one matching <html lang>, which
// LOCALE_BOOT_SCRIPT sets from the URL before first paint (no hydration
// involved, so no mismatch). Without JS the default (es) block shows.
const COPY = {
  es: {
    title: 'Página no encontrada — Kimox Studio',
    eyebrow: 'Error 404',
    heading: ['Página', 'no encontrada'],
    sub: 'La dirección que buscas no existe o ha cambiado de sitio. Prueba con uno de estos enlaces.',
    links: { home: 'Inicio', services: 'Servicios', work: 'Proyectos', contact: 'Contacto', blog: 'Blog' },
  },
  en: {
    title: 'Page not found — Kimox Studio',
    eyebrow: 'Error 404',
    heading: ['Page', 'not found'],
    sub: 'The address you are looking for does not exist or has moved. Try one of these links.',
    links: { home: 'Home', services: 'Services', work: 'Work', contact: 'Contact', blog: 'Blog' },
  },
  ja: {
    title: 'ページが見つかりません — Kimox Studio',
    eyebrow: 'エラー 404',
    heading: ['ページが', '見つかりません'],
    sub: 'お探しのアドレスは存在しないか、移動した可能性があります。以下のリンクをお試しください。',
    links: { home: 'ホーム', services: 'サービス', work: 'プロジェクト', contact: 'お問い合わせ', blog: 'ブログ' },
  },
};

const TITLES = { es: COPY.es.title, en: COPY.en.title, ja: COPY.ja.title };

// Runs synchronously right after <body> opens, before first paint. The
// document <title> is set here and not through metadata: the prerendered
// metadata title would be es for every URL, and Next re-applies it after
// hydration, overwriting the localized one.
export const LOCALE_BOOT_SCRIPT = `
(function(){
  var m = /^\\/(en|ja)(?:\\/|$)/.exec(location.pathname);
  var l = m ? m[1] : 'es';
  document.documentElement.lang = l;
  document.title = ${JSON.stringify(TITLES)}[l];
})();
`;

function Block({ locale }) {
  const c = COPY[locale];
  const home = localePath(locale, '/');
  return (
    <div className="wrap" lang={locale} data-nf={locale}>
      <span className="eyebrow">{c.eyebrow}</span>
      <h1>
        {c.heading[0]} <em>{c.heading[1]}</em>.
      </h1>
      <p className="sub">{c.sub}</p>
      <div className="links">
        <Link href={home}>{c.links.home}</Link>
        <Link href={`${home}#services`}>{c.links.services}</Link>
        <Link href={`${home}#work`}>{c.links.work}</Link>
        <Link href={`${home}#contact`}>{c.links.contact}</Link>
        <Link href={localePath(locale, '/blog')}>{c.links.blog}</Link>
      </div>
    </div>
  );
}

export default function NotFoundContent() {
  return (
    <main className="nf">
      {Object.keys(COPY).map((locale) => (
        <Block key={locale} locale={locale} />
      ))}
    </main>
  );
}
