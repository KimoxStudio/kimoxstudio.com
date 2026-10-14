import { BASE_URL, CONTACT_EMAIL, LOCALES, ORG_ID, WEBSITE_ID } from './urls';

// Site-wide structured data: the studio (Organization) and the site (WebSite)
// as one @graph, localized per route locale. Only confirmed facts: the studio
// is remote with NO physical premises, so the address is city-level only (no
// street, postal code, geo or opening hours) and the type is not
// LocalBusiness/ProfessionalService; no social profiles (none exist in the repo).

const L = (locale, values) => values[locale] ?? values.es;

const DESCRIPTION = {
  es: 'Estudio independiente de software con base en Las Palmas de Gran Canaria. Diseñamos y desarrollamos webs, aplicaciones web y móviles a medida, y ofrecemos consultoría de IA. Trabajamos en remoto con clientes de cualquier país.',
  en: 'Independent software studio based in Las Palmas de Gran Canaria. We design and build custom websites, web and mobile apps, and offer AI consulting. We work remotely with clients worldwide.',
  ja: 'ラス・パルマス・デ・グラン・カナリアを拠点とする独立系ソフトウェアスタジオ。ウェブサイト、ウェブ・モバイルアプリのオーダーメイド開発とAIコンサルティングを提供し、世界中のお客様とリモートで仕事をしています。',
};

const REGION = { es: 'Islas Canarias', en: 'Canary Islands', ja: 'カナリア諸島' };

const FOUNDERS = [
  {
    name: 'Jesé Romero Arbelo',
    jobTitle: {
      es: 'Fundador · Swiss-stack developer',
      en: 'Founder · Swiss-stack developer',
      ja: '創業者 · スイス・スタック開発者',
    },
  },
  {
    name: 'Adrián Mujica González',
    jobTitle: { es: 'Fundador · Arquitecto', en: 'Founder · Architect', ja: '創業者 · アーキテクト' },
  },
];

const KNOWS_ABOUT = {
  es: ['Desarrollo web a medida', 'Aplicaciones web', 'Aplicaciones móviles', 'SEO técnico', 'Consultoría de IA', 'Next.js', 'TypeScript'],
  en: ['Custom web development', 'Web applications', 'Mobile applications', 'Technical SEO', 'AI consulting', 'Next.js', 'TypeScript'],
  ja: ['カスタムWeb開発', 'ウェブアプリケーション', 'モバイルアプリケーション', 'テクニカルSEO', 'AIコンサルティング', 'Next.js', 'TypeScript'],
};

const monthly = (price, minimum) => ({
  '@type': 'UnitPriceSpecification',
  [minimum ? 'minPrice' : 'price']: price,
  priceCurrency: 'EUR',
  valueAddedTaxIncluded: false,
  referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
});

const oneOff = (price, minimum) => ({
  '@type': 'PriceSpecification',
  [minimum ? 'minPrice' : 'price']: price,
  priceCurrency: 'EUR',
  valueAddedTaxIncluded: false,
});

function offers(locale) {
  const landing = {
    '@type': 'Service',
    name: L(locale, { es: 'Landing page a medida', en: 'Custom landing page', ja: 'オーダーメイドのランディングページ' }),
    description: L(locale, {
      es: 'Páginas hechas a mano, rápidas y optimizadas para SEO. Diseño a medida y SEO técnico incluido.',
      en: 'Hand-crafted pages, fast and SEO-tuned. Custom design and technical SEO included.',
      ja: '手作りで高速、SEOに最適化されたページ。カスタムデザインとテクニカルSEO込み。',
    }),
  };
  const app = {
    '@type': 'Service',
    name: L(locale, { es: 'Aplicación web a medida', en: 'Custom web application', ja: 'オーダーメイドのウェブアプリケーション' }),
    description: L(locale, {
      es: 'Apps web completas con base de datos, autenticación y panel propio. El precio depende de las funcionalidades finales.',
      en: 'Full web apps with database, auth and admin panel. Price depends on the final feature set.',
      ja: 'データベース、認証、管理画面を備えた本格的なウェブアプリ。料金は最終的な機能によって変わります。',
    }),
  };
  const ai = {
    '@type': 'Service',
    name: L(locale, { es: 'Consultoría de IA', en: 'AI consulting', ja: 'AIコンサルティング' }),
    description: L(locale, {
      es: 'Diagnóstico, formación, implantación y acompañamiento mensual.',
      en: 'Audit, training, implementation and ongoing monthly support.',
      ja: '診断、研修、導入、そして毎月の伴走。',
    }),
  };
  return [
    { '@type': 'Offer', itemOffered: landing, priceSpecification: oneOff(500, true) },
    { '@type': 'Offer', itemOffered: landing, priceSpecification: monthly(80, true) },
    { '@type': 'Offer', itemOffered: app, priceSpecification: oneOff(1500, true) },
    { '@type': 'Offer', itemOffered: app, priceSpecification: monthly(120, true) },
    { '@type': 'Offer', itemOffered: ai },
  ];
}

export function siteGraph(locale) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'Kimox Studio',
        url: BASE_URL,
        // PNG, not SVG: Google doesn't reliably support SVG logos in
        // structured data (same reason the favicon moved to app/icon.png).
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/opengraph-image`,
        email: CONTACT_EMAIL,
        description: L(locale, DESCRIPTION),
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Las Palmas de Gran Canaria',
          addressRegion: L(locale, REGION),
          addressCountry: 'ES',
        },
        areaServed: 'Worldwide',
        founder: FOUNDERS.map((f) => ({
          '@type': 'Person',
          name: f.name,
          jobTitle: L(locale, f.jobTitle),
        })),
        knowsAbout: L(locale, KNOWS_ABOUT),
        makesOffer: offers(locale),
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: 'Kimox Studio',
        alternateName: 'Kimox',
        url: BASE_URL,
        inLanguage: LOCALES,
        publisher: { '@id': ORG_ID },
      },
    ],
  };
}

/** JSON for an inline ld+json script: every `<` escaped so no value can close the tag early. */
export const serializeJsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');
