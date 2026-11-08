import './project.css';
import { notFound } from 'next/navigation';
import { getAllProjects, getProject } from '@/lib/projects';
import { BASE_URL, OG_LOCALES, languageAlternates, localePath, localeUrl } from '@/lib/urls';
import { serializeJsonLd } from '@/lib/jsonld';
import Nav from '@/components/Nav';
import ProjectCursor from '@/components/ProjectCursor';

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

const BREADCRUMB = {
  home: { es: 'Inicio', en: 'Home', ja: 'ホーム' },
  projects: { es: 'Proyectos', en: 'Projects', ja: 'プロジェクト' },
};

const SUFFIX = ' — Kimox Studio';

// Same fallback semantics as `t` in lib/lang.js: only a missing value falls back.
const pick = (field, locale) => field?.[locale] ?? field?.es ?? '';

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const path = `/projects/${project.slug}`;
  const title = project.name + SUFFIX;
  const description = pick(project.body, locale);
  const url = localeUrl(locale, path);
  // Explicit openGraph/twitter: Next.js does not merge these across segments,
  // so without them this page would inherit the layout's home og:url/title.
  // Same pattern as blog/page.jsx; the image is the site-wide poster.
  const ogImage = { url: `${BASE_URL}/opengraph-image`, width: 1200, height: 630, alt: title };
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Kimox Studio',
      locale: OG_LOCALES[locale] ?? OG_LOCALES.es,
      type: 'website',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
  };
}

// Page chrome copy. The project's own text lives in lib/projects.js.
const STR = {
  visit: { es: 'Visitar', en: 'Visit', ja: '訪問' },
  visitSite: { es: 'Visitar sitio', en: 'Visit site', ja: 'サイトを訪問' },
  shot: { es: 'Captura', en: 'Screenshot', ja: 'スクリーンショット' },
  newTab: { es: 'se abre en una pestaña nueva', en: 'opens in a new tab', ja: '新しいタブで開きます' },
  back: { es: 'Volver a proyectos', en: 'Back to projects', ja: 'プロジェクト一覧へ' },
  next: { es: 'Siguiente proyecto', en: 'Next project', ja: '次のプロジェクト' },
};
// Intrinsic size of the WebP exports (public/projects/<slug>/<device>/*.webp).
const SIZE = {
  desktop: { width: 1600, height: 1000 },
  tablet: { width: 1100, height: 1575 },
  mobile: { width: 600, height: 1298 },
};

// One screenshot per story section, in section order: desktop, tablet, mobile.
function storyImages({ desktop, tablet, mobile }) {
  return [
    { device: 'desktop', src: desktop[1] },
    { device: 'tablet', src: tablet[0] },
    { device: 'mobile', src: mobile[0] },
  ];
}

function ArrowText({ children }) {
  return (
    <>
      {children} <span aria-hidden="true">→</span>
    </>
  );
}

export default async function Page({ params }) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  // The layout's dynamicParams = false does not cascade to this segment.
  if (!project) notFound();

  const path = `/projects/${project.slug}`;
  const breadcrumbJsonLd = serializeJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: BREADCRUMB.home[locale] ?? BREADCRUMB.home.es, item: localeUrl(locale, '/') },
      { '@type': 'ListItem', position: 2, name: BREADCRUMB.projects[locale] ?? BREADCRUMB.projects.es, item: `${localeUrl(locale, '/')}#work` },
      { '@type': 'ListItem', position: 3, name: project.name, item: localeUrl(locale, path) },
    ],
  });

  const all = getAllProjects();
  const next = all[(all.findIndex((p) => p.slug === project.slug) + 1) % all.length];
  const { responsive } = project;
  const sections = project.sections.slice(0, 3);
  const images = storyImages(responsive);
  const siteHref = `https://${project.url}`;
  const newTab = `(${pick(STR.newTab, locale)})`;
  const pad2 = (n) => String(n).padStart(2, '0');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <ProjectCursor />
      <Nav lang={locale} mode="post" />
      <main className="pj">
        <header className="pj-cover">
          <picture>
            {/* Portrait export on narrow screens: the tall cover would crop a landscape shot to its middle. */}
            <source media="(max-width: 700px)" srcSet={responsive.mobile[0]} />
            <img
              className="pj-cover__img"
              src={responsive.desktop[0]}
              alt=""
              width={SIZE.desktop.width}
              height={SIZE.desktop.height}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div className="pj-cover__txt wrap">
            <p className="pj-eyebrow" aria-hidden="true">{pick(project.category, locale)}</p>
            <h1 className="pj-title">{project.name}</h1>
          </div>
          <div className="pj-bar">
            {project.logo && <img className="pj-bar__logo" src={project.logo} alt="" width={30} height={30} />}
            <span className="pj-bar__name" aria-hidden="true">{project.name}</span>
            <a className="pj-pill pj-pill--sm" href={siteHref} target="_blank" rel="noopener noreferrer">
              <ArrowText>{pick(STR.visit, locale)}</ArrowText>
              <span className="pj-sr"> · {project.name} {newTab}</span>
            </a>
          </div>
        </header>

        <section className="pj-intro wrap">
          <div className="pj-intro__meta pj-rise" style={{ '--i': 0 }}>
            <p className="pj-eyebrow">{pick(project.category, locale)}</p>
            <p className="pj-year">{project.year}</p>
          </div>
          <div className="pj-intro__main">
            <p className="pj-lead pj-rise" style={{ '--i': 1 }}>{pick(project.body, locale)}</p>
            <ul className="pj-tags pj-rise" style={{ '--i': 2 }}>
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <p className="pj-rise" style={{ '--i': 3 }}>
              <a className="pj-pill" href={siteHref} target="_blank" rel="noopener noreferrer">
                <ArrowText>{pick(STR.visit, locale)}</ArrowText>
                <span className="pj-sr"> · {project.name} {newTab}</span>
              </a>
              <span className="pj-url">{project.url}</span>
            </p>
          </div>
        </section>

        <div className="pj-story wrap">
          {/* Sticky stage: decorative duplicate of the section images, shown only where
              the scroll-driven layout runs (see project.css). Each section carries the
              description, as an inline image or as .pj-sec__desc, never both. */}
          <div className="pj-stage" aria-hidden="true">
            <div className="pj-stage__frame">
              {images.map((img, i) => (
                <img
                  key={i}
                  className="pj-stage__img"
                  src={img.src}
                  alt=""
                  width={SIZE[img.device].width}
                  height={SIZE[img.device].height}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>
          <div className="pj-sections">
            {sections.map((sec, i) => (
              <section className="pj-sec" key={i} aria-labelledby={`pj-sec-${i}`}>
                <img
                  className={`pj-sec__fig${images[i].device === 'desktop' ? '' : ` pj-sec__fig--${images[i].device}`}`}
                  src={images[i].src}
                  alt={pick(sec.alt, locale)}
                  width={SIZE[images[i].device].width}
                  height={SIZE[images[i].device].height}
                  loading="lazy"
                  decoding="async"
                />
                <div className="pj-sec__txt">
                  <p className="pj-num" aria-hidden="true">{pad2(i + 1)} / {pad2(sections.length)}</p>
                  <h2 className="pj-h2" id={`pj-sec-${i}`}>{pick(sec.title, locale)}</h2>
                  <p className="pj-body">{pick(sec.body, locale)}</p>
                  <p className="pj-sec__desc pj-sr">{pick(STR.shot, locale)}{locale === 'ja' ? '：' : ': '}{pick(sec.alt, locale)}</p>
                </div>
              </section>
            ))}
          </div>
        </div>

        <footer className="pj-end wrap">
          <a className="pj-big" href={siteHref} target="_blank" rel="noopener noreferrer">
            <ArrowText>{pick(STR.visitSite, locale)}</ArrowText>
            <span className="pj-sr"> · {project.name} {newTab}</span>
          </a>
          <p className="pj-url">{project.url}</p>
          <div className="pj-links">
            <a className="pj-link" href={`${localePath(locale, '/')}#work`}>
              <span className="pj-eyebrow"><span aria-hidden="true">←</span> {pick(STR.back, locale)}</span>
            </a>
            <a className="pj-link" href={localePath(locale, `/projects/${next.slug}`)}>
              <span className="pj-eyebrow">{pick(STR.next, locale)} <span aria-hidden="true">→</span></span>
              <span className="pj-link__name">{next.name}</span>
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
