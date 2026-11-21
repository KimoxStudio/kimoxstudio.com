import "@/app/landing.css";
import "@/app/service.css";
import type { PageNode } from "@/kx/template-types";
import { ProjectListComponent } from "@/kx/templates/project-list/component";
import { FaqComponent } from "@/kx/templates/faq/component";
import { ContactSectionComponent } from "@/kx/templates/contact-section/component";
import { FooterWordmarkComponent } from "@/kx/templates/footer-wordmark/component";
import { CONTACT_PROPS, FOOTER_PROPS, projectItems, type ProjectKey } from "@/app/[locale]/_shared/content";
import { BASE_URL, CONTACT_PHONE, ORG_ID, localeUrl } from "@/lib/urls";
import { serializeJsonLd } from "@/lib/jsonld";
import ServiceNav from "./ServiceNav";

// Spanish-only landing page for one service with local search intent
// ("diseño web Las Palmas", "desarrollo de apps Las Palmas"). Everything a
// page says comes from its `ServiceContent`; prices and claims must match
// the home page (app/[locale]/page.tsx), which stays the source of truth.

export type ServiceContent = {
  path: string;
  serviceType: string;
  h1: string;
  lede: string;
  priceHint: string;
  includes: { title: string; body: string }[];
  prices: { name: string; body: string; oneOff: string; monthly: string }[];
  priceNote?: string;
  steps: { title: string; body: string }[];
  local: { title: string; paragraphs: string[] };
  projectsTitle: string;
  projects: ProjectKey[];
  faq: { q: string; a: string }[];
};

const L = (es: string) => ({ es, en: es, ja: es });
const node = (id: string, template: string): PageNode => ({ id, template, props: {} });

function jsonLd(c: ServiceContent) {
  const url = localeUrl("es", c.path);
  return serializeJsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: c.h1,
        serviceType: c.serviceType,
        url,
        provider: { "@id": ORG_ID },
        areaServed: [
          { "@type": "City", name: "Las Palmas de Gran Canaria" },
          { "@type": "AdministrativeArea", name: "Gran Canaria" },
        ],
        availableChannel: { "@type": "ServiceChannel", servicePhone: CONTACT_PHONE, serviceUrl: url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: c.h1, item: url },
        ],
      },
    ],
  });
}

export default function ServiceLanding({ content: c }: { content: ServiceContent }) {
  const whatsapp = `https://wa.me/${CONTACT_PHONE.replace(/\D/g, "")}`;
  return (
    <>
      <ServiceNav />
      <main>
        <section className="svc-hero" id="top">
          <div className="wrap">
            <nav className="svc-crumbs" aria-label="Migas de pan">
              <a href="/">Inicio</a> <span aria-hidden="true">/</span> <span aria-current="page">{c.h1}</span>
            </nav>
            <h1>{c.h1}</h1>
            <p className="svc-lede">{c.lede}</p>
            <div className="svc-ctas">
              <a href="#contact" className="btn-primary">
                <span>Pedir presupuesto</span>
                <span className="arr">↗</span>
              </a>
              <a href={whatsapp} className="btn-secondary" target="_blank" rel="noopener noreferrer">
                Escríbenos por WhatsApp
              </a>
            </div>
            <p className="svc-price-hint">{c.priceHint}</p>
          </div>
        </section>

        <section className="poster-section svc-includes">
          <div className="wrap">
            <div className="head">
              <h2>Qué incluye</h2>
            </div>
            <ul className="svc-grid">
              {c.includes.map((it) => (
                <li key={it.title}>
                  <h3>{it.title}</h3>
                  <p>{it.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="poster-section svc-prices">
          <div className="wrap">
            <div className="head">
              <h2>Precios</h2>
            </div>
            <ul className="svc-price-list">
              {c.prices.map((p) => (
                <li key={p.name}>
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.body}</p>
                  </div>
                  <div className="svc-price-amount">
                    <span className="from">Desde</span>
                    <span className="amount">{p.oneOff}</span>
                    <span className="alt">{p.monthly}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="svc-price-note">
              Precios sin IGIC. {c.priceNote ?? ""} Te decimos el precio final antes de empezar.
            </p>
          </div>
        </section>

        <section className="poster-section svc-steps">
          <div className="wrap">
            <div className="head">
              <h2>Cómo trabajamos</h2>
            </div>
            <ol className="svc-step-list">
              {c.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="poster-section svc-local">
          <div className="wrap">
            <div className="head">
              <h2>{c.local.title}</h2>
            </div>
            <div className="svc-local-body">
              {c.local.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <ProjectListComponent
          props={{ title: L(c.projectsTitle), viewSite: L("Visitar →"), items: projectItems(c.projects) }}
          node={node("work", "project-list")}
        />

        <FaqComponent
          props={{
            title: L("Preguntas frecuentes."),
            emphasis: L("frecuentes"),
            items: c.faq.map(({ q, a }) => ({ q: L(q), a: L(a) })),
          }}
          node={node("faq", "faq")}
        />

        <ContactSectionComponent props={CONTACT_PROPS} node={node("contact", "contact-section")} />
      </main>
      <FooterWordmarkComponent props={FOOTER_PROPS} node={node("footer", "footer-wordmark")} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(c) }} />
    </>
  );
}
