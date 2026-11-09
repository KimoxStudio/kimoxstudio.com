import './project.css';
import { notFound } from 'next/navigation';
import { getAllProjects, getProject } from '@/lib/projects';
import { DEFAULT_LOCALE, localePath, localeUrl } from '@/lib/urls';
import { resolveLocalized } from '@/kx/localized';
import { BREADCRUMB_LABELS, breadcrumbJsonLd } from '@/lib/jsonld';
import { SITE_NAME, buildMetadata } from '@/lib/metadata';
import Nav from '@/components/Nav';
import ProjectCursor from '@/components/ProjectCursor';
import ProjectSection from '@/components/ProjectSection';

// `{ es, en, ja }` field for the route's locale; missing values fall back to es, then to any defined locale.
const pick = (field, locale) => resolveLocalized(field, locale, DEFAULT_LOCALE) ?? '';

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    locale,
    path: `/projects/${project.slug}`,
    title: `${project.name} — ${SITE_NAME}`,
    description: pick(project.body, locale),
  });
}

// Page chrome copy. The project's own text lives in lib/projects.js.
const STR = {
  visit: { es: 'Visitar', en: 'Visit', ja: '訪問' },
  visitSite: { es: 'Visitar sitio', en: 'Visit site', ja: 'サイトを訪問' },
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

  const breadcrumbs = breadcrumbJsonLd([
    { name: pick(BREADCRUMB_LABELS.home, locale), url: localeUrl(locale, '/') },
    { name: pick(BREADCRUMB_LABELS.projects, locale), url: `${localeUrl(locale, '/')}#work` },
    { name: project.name, url: localeUrl(locale, `/projects/${project.slug}`) },
  ]);

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbs }} />
      <ProjectCursor />
      <Nav lang={locale} mode="post" />
      <main className="pj">
        <header className="pj-hero">
          <picture>
            {/* Portrait export on narrow screens: a landscape shot would crop to its middle strip. */}
            <source media="(max-width: 700px)" srcSet={responsive.mobile[0]} />
            <img
              className="pj-hero__img"
              src={responsive.desktop[0]}
              alt=""
              width={SIZE.desktop.width}
              height={SIZE.desktop.height}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div className="pj-hero__txt wrap">
            <h1 className="pj-title">{project.name}</h1>
          </div>
        </header>

        <section className="pj-intro wrap">
          <div className="pj-intro__meta">
            <p className="pj-eyebrow">{pick(project.category, locale)}</p>
            <p className="pj-year">{project.year}</p>
          </div>
          <div className="pj-intro__main">
            <p className="pj-lead">{pick(project.body, locale)}</p>
            <ul className="pj-tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <p>
              <a className="pj-pill" href={siteHref} target="_blank" rel="noopener noreferrer">
                <ArrowText>{pick(STR.visit, locale)}</ArrowText>
                <span className="pj-sr"> · {project.name} {newTab}</span>
              </a>
              <span className="pj-url">{project.url}</span>
            </p>
          </div>
        </section>

        <div className="wrap">
          {sections.map((sec, i) => (
            <ProjectSection className="pj-sec" key={i} aria-labelledby={`pj-sec-${i}`}>
              <div>
                <p className="pj-num" aria-hidden="true">{pad2(i + 1)} / {pad2(sections.length)}</p>
                <h2 className="pj-h2" id={`pj-sec-${i}`}>{pick(sec.title, locale)}</h2>
                <p className="pj-body">{pick(sec.body, locale)}</p>
              </div>
              <img
                className={`pj-sec__fig${images[i].device === 'desktop' ? '' : ` pj-sec__fig--${images[i].device}`}`}
                src={images[i].src}
                alt={pick(sec.alt, locale)}
                width={SIZE[images[i].device].width}
                height={SIZE[images[i].device].height}
                loading="lazy"
                decoding="async"
              />
            </ProjectSection>
          ))}
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
