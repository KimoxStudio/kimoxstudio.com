import "../landing.css";
import { CONTACT_EMAIL, languageAlternates, localeUrl } from "@/lib/urls";
import type { PageNode } from "@/kx/template-types";
import { PageComponent } from "@/kx/templates/page/component";
import { SiteNavComponent } from "@/kx/templates/site-nav/component";
import { MastheadComponent } from "@/kx/templates/masthead/component";
import { MarqueeComponent } from "@/kx/templates/marquee/component";
import { ManifestoComponent } from "@/kx/templates/manifesto/component";
import { PricingTableComponent } from "@/kx/templates/pricing-table/component";
import { WebServiceComponent } from "@/kx/templates/web-service/component";
import { ProjectListComponent } from "@/kx/templates/project-list/component";
import { TestimonialCarouselComponent } from "@/kx/templates/testimonial-carousel/component";
import { ProcessStepsComponent } from "@/kx/templates/process-steps/component";
import { TeamGridComponent } from "@/kx/templates/team-grid/component";
import { FaqComponent } from "@/kx/templates/faq/component";
import { ContactSectionComponent } from "@/kx/templates/contact-section/component";
import { FooterWordmarkComponent } from "@/kx/templates/footer-wordmark/component";

// Static homepage — Phase 1 of removing kimox-fw (see README / repo history).
//
// This used to be served by the kx-fw catch-all (app/[[...slug]]/page.tsx),
// which called `renderPageFromContent()` to read content/pages/index.json at
// request time (through the git provider + cache) and walk it into this same
// tree of `kx/templates/*` components via `@kimoxstudio/renderer`. Next.js
// always prefers a matching static route (this file) over the sibling
// `[[...slug]]` catch-all, so this file now owns "/" — no routing config
// changes needed, and the catch-all keeps serving /admin's still-live
// variation/preview machinery for every other (nonexistent, for now) page.
//
// Every prop object below was generated once by running each node's raw
// props from content/pages/index.json through its *real* zod schema
// (`kx/templates/<name>/schema.ts`) — the exact validation
// `@kimoxstudio/renderer` applies at request time — so defaults are baked in
// identically. They are hardcoded here, not read from the JSON file at
// runtime or build time: this route now has zero dependency on
// content/pages/index.json, the git provider, or the kx cache/rate-limiter.
//
// Known side effect (expected, not a bug): content/pages/index.json and the
// /admin editor for the homepage document still exist (kept for this phase),
// but they no longer drive this route. Publishing an edit there — and its
// live preview iframe, which also targets "/" — has no effect on the
// deployed homepage until someone updates this file to match.
//
// Locale resolution (es/en/ja): every template below still calls
// `useLang()` (`lib/lang.js`) inside the component itself, but the language
// now comes from the route (`app/[locale]` + LangContext seeded by the
// layout) instead of a client-only store — so the pre-rendered HTML for
// /, /en and /ja is already in the right language. This file only supplies
// the same localized {es, en, ja} prop shapes it always did.

// Per-locale canonical + hreflang for the landing. Each language variant is
// canonical to ITSELF (es at the unprefixed root), and the three variants
// cross-link via `alternates.languages`.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    alternates: {
      canonical: localeUrl(locale, "/"),
      languages: languageAlternates("/"),
    },
  };
}

// `node` is required by `TemplateRenderProps<P>`'s type but unused by every
// component below (verified: none of them read it) — a minimal stand-in
// keeps the calls type-correct without resurrecting the JSON-node shape.
function stubNode(id: string, template: string): PageNode {
  return { id, template, props: {} };
}

export default function HomePage() {
  return (
    <PageComponent props={{ theme: "light", chrome: "none" }} node={stubNode("root", "page")}>
      <SiteNavComponent props={{}} node={stubNode("nav", "site-nav")} />

      <main>
      <MastheadComponent
        props={{
          h1: {
            es: ["Software", "con alma", "que habla", "tu idioma."],
            en: ["Software", "with soul", "that speaks", "your language."],
            ja: ["魂のある", "ソフトウェアを", "あなたの言葉で。"],
          },
          sub: {
            es: "Diseñamos y desarrollamos aplicaciones web y móviles que cargan con los valores de tu marca. Sin plantillas. Sin atajos. Sin software de catálogo.",
            en: "We design and build web and mobile applications that carry your brand's values. No templates. No shortcuts. No off-the-shelf software.",
            ja: "ブランドの価値を体現するウェブ・モバイルアプリケーションを設計・開発します。テンプレートなし、近道なし、既製品なし。",
          },
          cta1: { es: "Cuéntanos tu idea", en: "Tell us your idea", ja: "アイデアを聞かせて" },
          cta2: { es: "Ver proyectos", en: "See our work", ja: "プロジェクトを見る" },
        }}
        node={stubNode("hero", "masthead")}
      />

      <MarqueeComponent
        props={{
          items: {
            es: ["DESARROLLO A MEDIDA", "WEB & MÓVIL", "MANTENIMIENTO", "MIGRACIONES", "SEO TÉCNICO"],
            en: ["CUSTOM DEVELOPMENT", "WEB & MOBILE", "MAINTENANCE", "MIGRATIONS", "TECHNICAL SEO"],
            ja: ["カスタム開発", "ウェブ＆モバイル", "保守", "移行", "テクニカルSEO"],
          },
        }}
        node={stubNode("marquee", "marquee")}
      />

      <ManifestoComponent
        props={{
          title: {
            es: "No hacemos software genérico.",
            en: "We don't ship generic software.",
            ja: "汎用ソフトウェアは作りません。",
          },
          body: {
            es: "Kimox Studio es un estudio de software con base en Las Palmas de Gran Canaria: diseñamos y desarrollamos webs, aplicaciones web y móviles a medida, ofrecemos consultoría de IA y trabajamos en remoto con clientes de cualquier país. No empezamos un proyecto buscando qué plantilla encaja. Primero entendemos el problema, después decidimos cómo debería funcionar y, por último, cómo debería verse.",
            en: "Kimox Studio is a software studio based in Las Palmas de Gran Canaria: we design and build custom websites, web and mobile apps, offer AI consulting, and work remotely with clients worldwide. We don't start a project by hunting for the right template. First we understand the problem, then we decide how it should work, and only then, how it should look.",
            ja: "Kimox Studioは、ラス・パルマス・デ・グラン・カナリアを拠点とするソフトウェアスタジオです。ウェブサイト、ウェブ・モバイルアプリのオーダーメイド開発とAIコンサルティングを手がけ、世界中のお客様とリモートで仕事をしています。私たちはテンプレート探しからプロジェクトを始めません。まず問題を理解し、次にどう機能すべきかを決め、最後に外見を決めます。",
          },
          bullets: {
            es: [
              "Construimos producto, no plantillas.",
              "Optimizamos para SEO desde la primera línea.",
              "Te entregamos código que tu equipo puede leer.",
              "Si no aporta valor, no se envía.",
            ],
            en: [
              "We build product, not templates.",
              "We optimize for SEO from line one.",
              "We hand over code your team can read.",
              "If it doesn't add value, it doesn't ship.",
            ],
            ja: [
              "テンプレートではなくプロダクトを作ります。",
              "1行目からSEOを意識します。",
              "読めるコードをお渡しします。",
              "価値がなければ出荷しません。",
            ],
          },
        }}
        node={stubNode("manifesto", "manifesto")}
      />

      <PricingTableComponent
        props={{
          title: { es: "Lo que construimos.", en: "What we build.", ja: "私たちが作るもの。" },
          fromLabel: { es: "Desde", en: "From", ja: "〜から" },
          billing: {
            groupLabel: { es: "Modalidad de pago", en: "Billing option", ja: "お支払い方法" },
            monthlyLabel: { es: "Mensual", en: "Monthly", ja: "月額" },
            oneOffLabel: { es: "Pago único", en: "One-off", ja: "一括払い" },
          },
          items: [
            {
              n: "01",
              priceFrom: { es: "500€", en: "500€", ja: "500€" },
              priceMonthly: { es: "80€/mes", en: "80€/mo", ja: "月額80€" },
              altOneOff: { es: "o desde 500€ en pago único", en: "or from 500€ one-off", ja: "または一括500€から" },
              altMonthly: { es: "o desde 80€/mes", en: "or from 80€/mo", ja: "または月額80€から" },
              title: { es: "Landing pages", en: "Landing pages", ja: "ランディングページ" },
              body: {
                es: "Páginas hechas a mano, rápidas y optimizadas para SEO. Pensadas para convertir desde el primer pixel.",
                en: "Hand-crafted pages, fast and SEO-tuned. Built to convert from the first pixel.",
                ja: "手作りで高速、SEOに最適化されたページ。最初のピクセルから成果につながります。",
              },
              bullets: {
                es: ["Diseño a medida", "SEO técnico incluido", "Entrega en 2-3 semanas"],
                en: ["Custom design", "Technical SEO included", "2-3 week delivery"],
                ja: ["カスタムデザイン", "テクニカルSEO込み", "2〜3週間で納品"],
              },
            },
            {
              n: "02",
              priceFrom: { es: "1.500€", en: "1.500€", ja: "1.500€" },
              priceMonthly: { es: "120€/mes", en: "120€/mo", ja: "月額120€" },
              altOneOff: { es: "o desde 1.500€ en pago único", en: "or from 1.500€ one-off", ja: "または一括1.500€から" },
              altMonthly: { es: "o desde 120€/mes", en: "or from 120€/mo", ja: "または月額120€から" },
              priceMonthlyNote: {
                es: "* El precio depende de las funcionalidades finales.",
                en: "* Price depends on the final feature set.",
                ja: "* 料金は最終的な機能によって変わります。",
              },
              title: { es: "Aplicaciones web", en: "Web applications", ja: "ウェブアプリケーション" },
              body: {
                es: "Apps web completas con base de datos, autenticación y panel propio. Como Mymedesp o Holovisor.",
                en: "Full web apps with database, auth and admin panel. Like Mymedesp or Holovisor.",
                ja: "データベース、認証、管理画面を備えた本格的なウェブアプリ。Mymedesp や Holovisor のような。",
              },
              bullets: {
                es: ["Stack moderno", "Escalable", "Hosting incluido el primer año"],
                en: ["Modern stack", "Scalable", "First year of hosting included"],
                ja: ["モダンなスタック", "スケーラブル", "初年度ホスティング込み"],
              },
              bulletsMonthly: {
                es: ["Stack moderno", "Escalable", "Hosting incluido"],
                en: ["Modern stack", "Scalable", "Hosting included"],
                ja: ["モダンなスタック", "スケーラブル", "ホスティング込み"],
              },
            },
            {
              n: "03",
              priceFrom: { es: "A medida", en: "Custom", ja: "個別見積もり" },
              priceMonthly: { es: "A medida", en: "Custom", ja: "個別見積もり" },
              title: { es: "Tu propia idea", en: "Your own idea", ja: "あなたのアイデア" },
              body: {
                es: "Aplicaciones móviles, SaaS, integraciones, plataformas complejas. Cuéntanos qué necesitas y te pasamos un plan.",
                en: "Mobile apps, SaaS, integrations, complex platforms. Tell us what you need and we'll send a plan.",
                ja: "モバイルアプリ、SaaS、統合、複雑なプラットフォーム。要件をお聞かせいただき、計画をご提案します。",
              },
              bullets: {
                es: [
                  "Desarrollo multiplataforma nativo: iOS, Android, Desktop, etc.",
                  "Diseño + desarrollo",
                  "Acompañamiento post-lanzamiento",
                ],
                en: [
                  "Native cross-platform development: iOS, Android, Desktop, etc.",
                  "Design + development",
                  "Post-launch support",
                ],
                ja: [
                  "マルチプラットフォーム・ネイティブ開発: iOS、Android、デスクトップなど",
                  "デザイン＋開発",
                  "ローンチ後のサポート",
                ],
              },
            },
          ],
          extrasLabel: { es: "También hacemos", en: "We also do", ja: "他にも" },
          extras: {
            es: ["Mantenimiento de proyectos existentes", "Migraciones de stack", "Auditorías SEO técnicas", "Refactor de código heredado"],
            en: ["Maintenance for existing projects", "Stack migrations", "Technical SEO audits", "Legacy code refactor"],
            ja: ["既存プロジェクトの保守", "スタック移行", "テクニカルSEO監査", "レガシーコードのリファクタ"],
          },
        }}
        node={stubNode("services", "pricing-table")}
      />

      <WebServiceComponent
        props={{
          eyebrow: { es: "Web y apps como servicio", en: "Web & apps as a service", ja: "ウェブ・アプリの月額プラン" },
          title: {
            es: "Tu web o tu app, sin soltarla de golpe.",
            en: "Your site or app, without paying all at once.",
            ja: "ウェブもアプリも、月々のお支払いで。",
          },
          emphasis: { es: "de golpe", en: "all at once", ja: "月々" },
          bridge: {
            es: "Dos formas de tener tu web o tu app: la pagas una vez, o la tienes por una cuota al mes. Tú eliges. La cuota vale para las dos.",
            en: "Two ways to get your site or app: pay once, or pay a monthly fee. Your call. The monthly plan covers both.",
            ja: "ウェブサイトもアプリも、一括払いと月額払いからお選びいただけます。月額プランはどちらにも対応しています。",
          },
          sub: {
            es: "La misma web o app que te haríamos por un pago único, repartida en una cuota al mes. Diseño, hosting y mantenimiento, todo dentro. Tú te olvidas; nosotros la cuidamos.",
            en: "The same site or app we'd build you for a one-off price, spread into a monthly fee. Design, hosting and maintenance, all in. You forget about it; we keep it running.",
            ja: "一括払いでお作りするものと同じウェブサイトやアプリを、月額に分けてご提供します。デザイン、ホスティング、保守まですべて含まれます。運用は私たちにお任せください。",
          },
          prices: [
            {
              label: { es: "Webs, desde", en: "Websites from", ja: "ウェブサイト" },
              amount: { es: "80€/mes", en: "80€/mo", ja: "月額 80€〜" },
            },
            {
              label: { es: "Apps, desde", en: "Apps from", ja: "アプリ" },
              amount: { es: "120€/mes*", en: "120€/mo*", ja: "月額 120€〜\u2060*" },
            },
          ],
          priceNote: {
            es: "* El precio de las apps depende de las funcionalidades finales.",
            en: "* App pricing depends on the final feature set.",
            ja: "* アプリの料金は、最終的な機能によって変わります。",
          },
          igic: { es: "sin IGIC", en: "ex. IGIC", ja: "税抜" },
          includesLabel: { es: "Todo dentro", en: "All in", ja: "月額に含まれるもの" },
          feats: {
            es: [
              "DISEÑO Y DESARROLLO — tu web o tu app desde cero, hecha a mano",
              "HOSTING — incluido, rápido y seguro",
              "MANTENIMIENTO — técnico y al día, sin que lo pidas",
              "SOPORTE — personas reales, no un ticket al vacío",
              "EVOLUCIÓN — mejoras continuas; no la dejamos quieta",
            ],
            en: [
              "DESIGN & BUILD — your site or app from scratch, by hand",
              "HOSTING — included, fast and secure",
              "MAINTENANCE — kept technically current, without you having to ask",
              "SUPPORT — real people, not a ticket into the void",
              "EVOLUTION — continuous improvements; we don't leave it sitting still",
            ],
            ja: [
              "デザイン・開発 — ゼロから手作りで構築します",
              "ホスティング — 高速で安全な環境を含みます",
              "保守 — ご依頼がなくても、技術面を常に最新に保ちます",
              "サポート — 担当者が直接対応します",
              "改善 — 公開後も継続的に手を入れていきます",
            ],
          },
          featsCloser: {
            es: "Rápida, segura, accesible y siempre actualizada.",
            en: "Fast, secure, accessible and always up to date.",
            ja: "高速で安全、アクセシブルで、常に最新の状態を保ちます。",
          },
          commitment: {
            es: "Como la construimos desde cero, arrancamos con un compromiso mínimo. Lo justo para hacerla bien y que salga a cuenta. A partir de ahí, sigues mes a mes.",
            en: "Since we build it from scratch, we start with a minimum commitment. Just enough to do it right and make it worth it. After that, you carry on month to month.",
            ja: "ゼロから構築するため、開始時に最低契約期間を設けています。きちんと作り、費用に見合う形にするための期間です。その後は月単位でご継続いただけます。",
          },
          ctaLabel: { es: "Quiero la mía así →", en: "I want mine this way →", ja: "月額プランについて相談する →" },
        }}
        node={stubNode("web-service", "web-service")}
      />

      <ProcessStepsComponent
        props={{
          label: { es: "Consultoría de IA", en: "AI consulting", ja: "AIコンサルティング" },
          title: {
            es: "Consultoría de IA, donde de verdad sirve.",
            en: "AI consulting, where it actually helps.",
            ja: "本当に役立つところに、AIコンサルティングを。",
          },
          emphasis: { es: "sirve", en: "helps", ja: "役立つ" },
          sub: {
            es: "Para negocios que oyen hablar de IA a todas horas y no saben por dónde empezar. Empezamos por tu trabajo de cada día y la herramienta la elegimos después.",
            en: "For businesses that hear about AI all the time and don't know where to start. We start with your day-to-day work and choose the tool after that.",
            ja: "AIの話題は耳にするものの、何から始めればよいか迷っている企業の皆さまへ。まず日々の業務を拝見し、ツールはその後で選びます。",
          },
          steps: [
            {
              n: "01",
              title: { es: "Diagnóstico", en: "Audit", ja: "診断" },
              body: {
                es: "Revisamos tus procesos y te decimos dónde la IA ahorra tiempo o dinero, y dónde no merece la pena.",
                en: "We review your processes and tell you where AI saves time or money, and where it isn't worth it.",
                ja: "業務を見直し、AIで時間やコストを削減できる所と、そうでない所を見極めます。",
              },
            },
            {
              n: "02",
              title: { es: "Formación", en: "Training", ja: "研修" },
              body: {
                es: "Talleres prácticos con las tareas reales de tu equipo, para que la IA entre en su día a día.",
                en: "Hands-on workshops built on your team's real tasks, so AI becomes part of their day-to-day work.",
                ja: "チームの実際の業務を題材にしたワークショップで、AIを日々の仕事に根付かせます。",
              },
            },
            {
              n: "03",
              title: { es: "Implantación", en: "Implementation", ja: "導入" },
              body: {
                es: "Construimos agentes, automatizaciones e integraciones con modelos de lenguaje en los sistemas que ya usas.",
                en: "We build agents, automations and LLM integrations into the systems you already use.",
                ja: "エージェントや自動化、LLM連携を、今お使いのシステムに組み込みます。",
              },
            },
            {
              n: "04",
              title: { es: "Acompañamiento", en: "Ongoing support", ja: "伴走" },
              body: {
                es: "Seguimos cerca cada mes para ajustar lo implantado, resolver dudas y decidir qué toca después.",
                en: "We stay close every month to fine-tune what's live, answer questions and plan what comes next.",
                ja: "導入後も毎月寄り添い、調整や疑問への対応、次の一手の検討を続けます。",
              },
            },
          ],
        }}
        node={stubNode("ai", "process-steps")}
      />

      <ProjectListComponent
        props={{
          title: {
            es: "Proyectos que hemos realizado.",
            en: "Projects we've delivered.",
            ja: "私たちが手がけたプロジェクト。",
          },
          viewSite: { es: "Visitar →", en: "Visit →", ja: "訪問 →" },
          items: [
            {
              n: "01",
              name: "Cafetería Bonita Vida",
              url: "cafeteriabonitavida.com",
              year: "2026",
              logo: "/projects/bonitavida.webp",
              category: {
                es: "Web · Cafetería y repostería",
                en: "Website · Café & bakery",
                ja: "ウェブサイト · カフェ&ベーカリー",
              },
              body: {
                es: "Web de la cafetería y repostería marroquí del barrio de Schamann: carta online, galería del local, catering y reseñas de Google integradas. Dulces que se amasan cada mañana y un 5,0 sobre 220 reseñas.",
                en: "Website for the Moroccan café and bakery in the Schamann neighborhood: online menu, venue gallery, catering and Google reviews built in. Sweets kneaded fresh every morning and a 5.0 across 220 reviews.",
                ja: "シャマン地区にあるモロッコ系カフェ&ベーカリーのサイト。オンラインメニュー、店内ギャラリー、ケータリング、Googleのレビューを統合。毎朝手作りのスイーツと、220件のレビューで5.0の評価を紹介します。",
              },
              tags: ["Next.js", "SEO", "Carta online", "Reseñas"],
              screenshots: [
                "/projects/bonitavida/1.webp",
                "/projects/bonitavida/2.webp",
                "/projects/bonitavida/3.webp",
              ],
              responsive: {
                desktop: ["/projects/bonitavida/desktop/1.webp", "/projects/bonitavida/desktop/2.webp", "/projects/bonitavida/desktop/3.webp"],
                tablet: ["/projects/bonitavida/tablet/1.webp", "/projects/bonitavida/tablet/2.webp", "/projects/bonitavida/tablet/3.webp"],
                mobile: ["/projects/bonitavida/mobile/1.webp", "/projects/bonitavida/mobile/2.webp", "/projects/bonitavida/mobile/3.webp"],
              },
            },
            {
              n: "02",
              name: "Holovisor",
              url: "holovisor.app",
              year: "2026",
              logo: "/projects/holovisor.webp",
              category: {
                es: "App web · Pokémon TCG",
                en: "Web app · Pokémon TCG",
                ja: "ウェブアプリ · ポケモンTCG",
              },
              body: {
                es: "Escáner de cartas Pokémon: enfoca la carta con la cámara y la reconoce en cualquier idioma, gratis y sin límites. Sigue su valor con precios de Cardmarket y guarda tu colección con su valor total.",
                en: "Pokémon card scanner: point your camera at a card and it recognizes it in any language, free and unlimited. Tracks its value with Cardmarket prices and keeps your collection with its total worth.",
                ja: "ポケモンカードのスキャナーアプリ。カメラを向けるとどの言語のカードでも認識し、無料かつ無制限。Cardmarketの価格で価値を追い、コレクションの合計価値を管理できます。",
              },
              tags: ["PWA", "Cámara", "Cardmarket"],
              screenshots: [
                "/projects/holovisor/1.webp",
                "/projects/holovisor/2.webp",
                "/projects/holovisor/3.webp",
              ],
              responsive: {
                desktop: ["/projects/holovisor/desktop/1.webp", "/projects/holovisor/desktop/2.webp"],
                tablet: ["/projects/holovisor/tablet/1.webp", "/projects/holovisor/tablet/2.webp"],
                mobile: ["/projects/holovisor/mobile/1.webp", "/projects/holovisor/mobile/2.webp"],
              },
            },
            {
              n: "03",
              name: "Mymedesp",
              url: "mymedesp.com",
              year: "2025",
              logo: "/projects/mymedesp.webp",
              category: { es: "App web · Cocina", en: "Web app · Cooking", ja: "ウェブアプリ · 料理" },
              body: {
                es: "Plataforma de recetas y planificación de menús. Importa recetas desde redes sociales o cualquier web, arma el menú semanal y genera la lista de la compra automáticamente.",
                en: "Recipe and meal-planning platform. Import recipes from social media or any website, build your weekly menu, and get the shopping list generated automatically.",
                ja: "レシピと献立プランニングのプラットフォーム。SNSやウェブサイトからレシピを取り込み、週間メニューを組み立てると、買い物リストが自動で生成されます。",
              },
              tags: ["Next.js", "PostgreSQL", "Auth", "SEO"],
              screenshots: [
                "/projects/mymedesp/1.webp",
                "/projects/mymedesp/2.webp",
                "/projects/mymedesp/3.webp",
                "/projects/mymedesp/4.webp",
              ],
              responsive: {
                desktop: ["/projects/mymedesp/desktop/1.webp", "/projects/mymedesp/desktop/2.webp", "/projects/mymedesp/desktop/3.webp"],
                tablet: ["/projects/mymedesp/tablet/1.webp", "/projects/mymedesp/tablet/2.webp", "/projects/mymedesp/tablet/3.webp"],
                mobile: ["/projects/mymedesp/mobile/1.webp", "/projects/mymedesp/mobile/2.webp", "/projects/mymedesp/mobile/3.webp"],
              },
            },
            {
              n: "04",
              name: "Alea Las Palmas",
              url: "alealaspalmas.es",
              year: "2025",
              logo: "/projects/alea.webp",
              category: {
                es: "Web institucional · Asociación cultural",
                en: "Institutional site · Cultural association",
                ja: "団体サイト · 文化協会",
              },
              body: {
                es: "Sitio de la asociación cultural de juegos de rol, mesa, wargames y miniaturas de Las Palmas. Listado de eventos, directorio de tiendas y locales colaboradores y un canal para que la comunidad lúdica de la isla se encuentre.",
                en: "Website for the Las Palmas cultural association around roleplaying, board games, wargames and miniatures. Event listings, partner shop directory and a channel for the island's tabletop community to find each other.",
                ja: "ロールプレイング、ボードゲーム、ウォーゲーム、ミニチュアを楽しむラス・パルマスの文化協会のウェブサイト。イベント一覧、協賛店ディレクトリ、島内のテーブルトップ・コミュニティが集う場を提供します。",
              },
              tags: ["WordPress", "Eventos", "Comunidad"],
              screenshots: ["/projects/alea/1.webp", "/projects/alea/2.webp", "/projects/alea/3.webp"],
              responsive: {
                desktop: ["/projects/alea/desktop/1.webp", "/projects/alea/desktop/2.webp", "/projects/alea/desktop/3.webp"],
                tablet: ["/projects/alea/tablet/1.webp", "/projects/alea/tablet/2.webp", "/projects/alea/tablet/3.webp"],
                mobile: ["/projects/alea/mobile/1.webp", "/projects/alea/mobile/2.webp", "/projects/alea/mobile/3.webp"],
              },
            },
            {
              n: "05",
              name: "Patri Santana Estética",
              url: "patrisantanaestetica.com",
              year: "2026",
              logo: "/projects/patrisantana.webp",
              category: {
                es: "Web institucional · Estética & Barbería",
                en: "Institutional site · Beauty & Barbershop",
                ja: "団体サイト · 美容&理容",
              },
              body: {
                es: "Sitio para un centro de belleza y bienestar en Las Palmas de Gran Canaria: uñas, cejas, pestañas, depilación láser y barbería. Presentación de servicios y vía directa de contacto y reserva para clientas y clientes.",
                en: "Site for a beauty and wellness center in Las Palmas de Gran Canaria: nails, brows, lashes, laser hair removal and barbering. Service showcase with a direct booking and contact path.",
                ja: "ラス・パルマス・デ・グラン・カナリアの美容・ウェルネスセンターのサイト。ネイル、眉、まつげ、レーザー脱毛、理容サービスを紹介し、直接予約・問い合わせできる導線を用意。",
              },
              tags: ["Next.js", "SEO", "Reservas"],
              screenshots: [
                "/projects/patri-santana/1.webp",
                "/projects/patri-santana/2.webp",
                "/projects/patri-santana/3.webp",
              ],
              responsive: {
                desktop: ["/projects/patri-santana/desktop/1.webp", "/projects/patri-santana/desktop/2.webp", "/projects/patri-santana/desktop/3.webp"],
                tablet: ["/projects/patri-santana/tablet/1.webp", "/projects/patri-santana/tablet/2.webp", "/projects/patri-santana/tablet/3.webp"],
                mobile: ["/projects/patri-santana/mobile/1.webp", "/projects/patri-santana/mobile/2.webp", "/projects/patri-santana/mobile/3.webp"],
              },
            },
            {
              n: "06",
              name: "RachaFit",
              url: "rachafit.com",
              year: "2026",
              logo: "/projects/rachafit.webp",
              category: {
                es: "App móvil · Fitness social",
                en: "Mobile app · Social fitness",
                ja: "モバイルアプリ · ソーシャルフィットネス",
              },
              body: {
                es: "Diario de entrenamiento social para gimnastas y corredores. Registro rápido de ejercicios, progreso con gráficos de fuerza y cardio, rachas de constancia y competición amistosa por rangos entre usuarios.",
                en: "Social training journal for gym-goers and runners. Fast exercise logging, strength and cardio progress charts, consistency streaks and friendly rank competition between users.",
                ja: "ジム利用者やランナー向けのソーシャル・トレーニング日記。素早い運動記録、筋力・有酸素の進捗グラフ、継続の記録、ユーザー同士のランク競争機能を備える。",
              },
              tags: ["Mobile", "Social", "GPS"],
              screenshots: [
                "/projects/rachafit/1.webp",
                "/projects/rachafit/2.webp",
                "/projects/rachafit/3.webp",
                "/projects/rachafit/4.webp",
              ],
              responsive: {
                desktop: ["/projects/rachafit/desktop/1.webp", "/projects/rachafit/desktop/2.webp", "/projects/rachafit/desktop/3.webp"],
                tablet: ["/projects/rachafit/tablet/1.webp", "/projects/rachafit/tablet/2.webp", "/projects/rachafit/tablet/3.webp"],
                mobile: ["/projects/rachafit/mobile/1.webp", "/projects/rachafit/mobile/2.webp", "/projects/rachafit/mobile/3.webp"],
              },
            },
          ],
        }}
        node={stubNode("work", "project-list")}
      />

      <TestimonialCarouselComponent
        props={{
          items: [
            {
              quote: {
                es: "Antes mantener el calendario de torneos era un grupo de WhatsApp eterno. Ahora la gente entra a la web, ve qué hay este mes y se apunta. Hemos doblado inscritos en las jornadas nuevas.",
                en: "Keeping the tournament calendar updated used to be an endless WhatsApp group. Now people open the site, see what's on this month and sign up. We've doubled attendance at the new game days.",
                ja: "以前はトーナメントのカレンダーを管理するのが終わりのないWhatsAppグループでした。今はみんながサイトを開いて、今月の予定を見て申し込む。新しいイベントの参加者は倍になりました。",
              },
              name: "Sergio",
              role: {
                es: "Cofundador · Alea Las Palmas",
                en: "Cofounder · Alea Las Palmas",
                ja: "共同創業者 · Alea Las Palmas",
              },
            },
          ],
        }}
        node={stubNode("testimonials", "testimonial-carousel")}
      />

      <TeamGridComponent
        props={{
          title: { es: "El equipo.", en: "The team.", ja: "チーム。" },
          body: {
            es: "Somos un equipo reducido de gente que diseña y programa. Trabajamos con pocos clientes a la vez para poder meternos a fondo en cada proyecto. No subcontratamos. No usamos plantillas. No tenemos vendedores.",
            en: "We're a small team of people who design and code. We work with a few clients at a time so we can go deep on each one. We don't subcontract. We don't use templates. We don't have salespeople.",
            ja: "デザインとコードを書く少人数のチームです。各プロジェクトに深く入り込めるよう、同時に対応するクライアントを絞っています。外注なし、テンプレートなし、営業もいません。",
          },
          stats: [
            { n: "12+", label: { es: "Proyectos enviados", en: "Projects shipped", ja: "出荷プロジェクト" } },
            { n: "100%", label: { es: "Código a medida", en: "Custom code", ja: "カスタムコード" } },
            { n: "3", label: { es: "Idiomas que hablamos", en: "Languages we speak", ja: "話せる言語" } },
            { n: "0", label: { es: "Plantillas usadas", en: "Templates used", ja: "使ったテンプレート" } },
          ],
          teamLabel: { es: "Pequeño a propósito", en: "Small on purpose", ja: "意図して少人数" },
          teamSub: {
            es: "Cada persona toca el código, el diseño y al cliente.",
            en: "Every person touches the code, the design, and the client.",
            ja: "全員がコード、デザイン、クライアントに直接関わります。",
          },
          team: [
            {
              initials: "J",
              name: "Jesé Romero Arbelo",
              photoSerious: "/team/01-serious.webp",
              photoFun: "/team/01-fun.webp",
              photoFunOffsetY: -100,
              objectPositionSerious: "50% 50%",
              objectPositionFun: "50% 50%",
              role: {
                es: "Fundador · Swiss-stack developer",
                en: "Founder · Swiss-stack developer",
                ja: "創業者 · スイス・スタック開発者",
              },
              bio: {
                es: "Como una navaja suiza, pero con compilador: arquitectura, frontend, backend, DevOps y lo que haga falta. Fuera del editor toco el piano, juego con la gastronomía científica y leo física como otros leen novelas.",
                en: "Like a Swiss army knife with a compiler: architecture, frontend, backend, DevOps, and whatever the job needs. Off-keyboard he plays the piano, tinkers with scientific gastronomy and reads physics the way others read novels.",
                ja: "コンパイラ付きのスイスアーミーナイフのような存在。設計、フロント、バック、DevOps、必要なら何でも。仕事の外ではピアノを弾き、分子料理をいじり、物理を小説のように読みます。",
              },
              skills: [
                "Next.js",
                "React Native",
                "TypeScript",
                "Bun",
                "Python",
                "Postgres",
                "Docker",
                "Vercel",
                "AI agents",
                "SEO",
              ],
            },
            {
              initials: "A",
              name: "Adrián Mujica González",
              photoSerious: "/team/02-serious.webp",
              photoFun: "/team/02-fun.webp",
              objectPositionSerious: "72% 35%",
              objectPositionFun: "55% 22%",
              role: { es: "Fundador · Arquitecto", en: "Founder · Architect", ja: "創業者 · アーキテクト" },
              bio: {
                es: "Diseña la arquitectura y se mete hasta la base de datos sin perder el sentido del ritmo. Es quien escucha la idea del cliente con oído de músico y la devuelve con una vuelta original que nadie había visto. Fuera del editor compone canciones y comparte casa con dos perros que tienen opinión sobre todo.",
                en: "Designs the architecture and dives all the way down to the database without losing his sense of rhythm. He's the one who listens to the client's idea like a musician and hands it back with an original twist no one else had spotted. Off-keyboard he writes songs and shares a house with two dogs who have opinions on everything.",
                ja: "アーキテクチャを設計し、データベースの奥までリズム感を失わずに潜っていく人。クライアントの話を音楽家の耳で聴き、誰も気づかなかったオリジナルなひねりを返します。仕事の外では曲を書き、何にでも意見のある犬2匹と暮らしています。",
              },
              skills: [
                "Node.js",
                "TypeScript",
                "Next.js",
                "Python",
                "PostgreSQL",
                "MongoDB",
                "Redis",
                "Docker",
                "AWS",
                "Spring Boot",
              ],
            },
            {
              initials: "S",
              name: "Samuel Romero Arbelo",
              photoSerious: "/team/03-serious.webp",
              photoFun: "/team/03-fun.webp",
              photoFunScale: 1.3,
              objectPositionSerious: "75% 35%",
              objectPositionFun: "52% 22%",
              role: {
                es: "Full-stack · Aire fresco del estudio",
                en: "Full-stack · The studio's fresh air",
                ja: "フルスタック · スタジオの新しい風",
              },
              bio: {
                es: "Trastea con ordenadores desde crío y con anime desde antes incluso. Aparece con una idea que nadie había puesto sobre la mesa y de repente el proyecto respira distinto. Se deja la piel en cada feature y mantiene viva la curiosidad por enredarse con cualquier herramienta nueva.",
                en: "Tinkering with computers since he was a kid, and with anime since even earlier. Shows up with an idea no one had put on the table and suddenly the project breathes differently. Throws himself into every feature and keeps a wide-open curiosity for whatever tool is new.",
                ja: "子供の頃からコンピュータをいじり、それより前からアニメを見続けてきました。誰もテーブルに出していなかったアイデアを持ち込んで、プロジェクトの空気を一変させる存在。どんな機能にも全力で、新しい道具にはいつでも飛び込む好奇心を持っています。",
              },
              skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind", "WordPress", "PHP", "MySQL", "Git"],
            },
          ],
        }}
        node={stubNode("about", "team-grid")}
      />

      <FaqComponent
        props={{
          title: {
            es: "Preguntas frecuentes.",
            en: "Frequently asked questions.",
            ja: "よくあるご質問。",
          },
          emphasis: { es: "frecuentes", en: "asked", ja: "ご質問" },
          items: [
            {
              q: { es: "¿Qué es Kimox Studio?", en: "What is Kimox Studio?", ja: "Kimox Studioとは？" },
              a: {
                es: "Kimox Studio es un estudio independiente de software con base en Las Palmas de Gran Canaria. Diseñamos y desarrollamos webs, aplicaciones web y aplicaciones móviles a medida, sin plantillas, y ofrecemos consultoría de IA. Trabajamos en remoto con clientes de cualquier país.",
                en: "Kimox Studio is an independent software studio based in Las Palmas de Gran Canaria. We design and build custom websites, web apps and mobile apps, with no templates, and we offer AI consulting. We work remotely with clients from any country.",
                ja: "Kimox Studioは、ラス・パルマス・デ・グラン・カナリアを拠点とする独立系ソフトウェアスタジオです。テンプレートを使わず、ウェブサイト、ウェブアプリ、モバイルアプリをオーダーメイドで設計・開発し、AIコンサルティングも提供しています。世界中のお客様とリモートで仕事をしています。",
              },
            },
            {
              q: { es: "¿Cuánto cuesta una landing page?", en: "How much does a landing page cost?", ja: "ランディングページの料金は？" },
              a: {
                es: "Desde 80 €/mes o 500 € en pago único, sin IGIC. Son páginas hechas a mano, rápidas y optimizadas para SEO. Incluyen diseño a medida, SEO técnico y entrega en 2-3 semanas.",
                en: "From €80/month or €500 as a one-off payment, excluding IGIC (Canary Islands tax). Pages are hand-crafted, fast and SEO-tuned. They include custom design, technical SEO and delivery in 2-3 weeks.",
                ja: "月額80€から、または一括500€です（IGIC別）。手作りで高速、SEOに最適化されたページで、カスタムデザイン、テクニカルSEO、2〜3週間での納品が含まれます。",
              },
            },
            {
              q: { es: "¿Cuánto cuesta una aplicación web?", en: "How much does a web application cost?", ja: "ウェブアプリケーションの料金は？" },
              a: {
                es: "Desde 120 €/mes o desde 1.500 € en pago único, sin IGIC. El precio final depende de las funcionalidades. Son apps web completas con base de datos, autenticación y panel propio, con un stack moderno y escalable. Con cuota mensual el hosting va incluido; con pago único, el primer año.",
                en: "From €120/month or from €1,500 as a one-off payment, excluding IGIC (Canary Islands tax). The final price depends on the feature set. These are full web apps with database, authentication and admin panel, on a modern, scalable stack. With the monthly plan hosting is included; with a one-off payment, the first year.",
                ja: "月額120€から、または一括1,500€からです（IGIC別）。最終的な料金は機能によって変わります。データベース、認証、管理画面を備えた本格的なウェブアプリを、モダンでスケーラブルなスタックで構築します。月額プランではホスティング込み、一括払いでは初年度のホスティングが含まれます。",
              },
            },
            {
              q: { es: "¿Qué es «web y apps como servicio»?", en: "What is “web and apps as a service”?", ja: "「ウェブ・アプリの月額プラン」とは？" },
              a: {
                es: "Es tener tu web o tu app con una cuota mensual en lugar de un pago único: webs desde 80 €/mes y apps desde 120 €/mes, sin IGIC. La cuota incluye diseño y desarrollo, hosting, mantenimiento, soporte y evolución continua. Como la construimos desde cero, arrancamos con un compromiso mínimo; a partir de ahí, sigues mes a mes.",
                en: "It means getting your site or app for a monthly fee instead of a one-off payment: websites from €80/month and apps from €120/month, excluding IGIC. The fee covers design and development, hosting, maintenance, support and continuous improvements. Since we build it from scratch, we start with a minimum commitment; after that, you carry on month to month.",
                ja: "ウェブサイトやアプリを、一括払いではなく月額でご利用いただくプランです。ウェブサイトは月額80€から、アプリは月額120€からです（IGIC別）。月額にはデザイン・開発、ホスティング、保守、サポート、継続的な改善が含まれます。ゼロから構築するため、開始時に最低契約期間を設けており、その後は月単位でご継続いただけます。",
              },
            },
            {
              q: { es: "¿Ofrecéis consultoría de IA para empresas?", en: "Do you offer AI consulting for businesses?", ja: "企業向けのAIコンサルティングはありますか？" },
              a: {
                es: "Sí. Empezamos por tu trabajo de cada día y elegimos la herramienta después, en cuatro pasos: diagnóstico (dónde la IA ahorra tiempo o dinero y dónde no merece la pena), formación (talleres prácticos con las tareas reales de tu equipo), implantación (agentes, automatizaciones e integraciones con modelos de lenguaje en los sistemas que ya usas) y acompañamiento (seguimiento mensual para ajustar lo implantado y decidir qué toca después). No tiene precio cerrado porque se hace a medida, y la primera conversación es sin compromiso.",
                en: "Yes. We start with your day-to-day work and choose the tool after that, in four steps: audit (where AI saves time or money, and where it isn't worth it), training (hands-on workshops built on your team's real tasks), implementation (agents, automations and LLM integrations in the systems you already use) and ongoing support (monthly follow-up to fine-tune what's live and plan what comes next). There's no fixed price because it's tailored to you, and the first conversation comes with no commitment.",
                ja: "はい。まず日々の業務を拝見し、ツールはその後で選びます。進め方は4段階です。診断（AIで時間やコストを削減できる所と、そうでない所の見極め）、研修（チームの実際の業務を題材にしたワークショップ）、導入（エージェント、自動化、LLM連携を今お使いのシステムに組み込み）、伴走（毎月の調整と次の一手の検討）。料金は内容に合わせたオーダーメイドのため固定ではありません。最初のご相談に契約の義務はありません。",
              },
            },
            {
              q: { es: "¿Mantenéis proyectos que no habéis hecho vosotros?", en: "Do you maintain projects you didn't build?", ja: "他社が作ったプロジェクトの保守も依頼できますか？" },
              a: {
                es: "Sí. Además de proyectos nuevos, hacemos mantenimiento de proyectos existentes, migraciones de stack, auditorías SEO técnicas y refactor de código heredado.",
                en: "Yes. Besides new projects, we do maintenance for existing projects, stack migrations, technical SEO audits and legacy code refactoring.",
                ja: "はい。新規プロジェクトに加えて、既存プロジェクトの保守、スタック移行、テクニカルSEO監査、レガシーコードのリファクタに対応しています。",
              },
            },
            {
              q: { es: "¿Trabajáis solo en Canarias?", en: "Do you only work in the Canary Islands?", ja: "対応はカナリア諸島のみですか？" },
              a: {
                es: "No. Tenemos base en Las Palmas de Gran Canaria, pero trabajamos en remoto con clientes de cualquier país. Nuestra web está en español, inglés y japonés.",
                en: "No. We are based in Las Palmas de Gran Canaria, but we work remotely with clients from any country. Our website is available in Spanish, English and Japanese.",
                ja: "いいえ。拠点はラス・パルマス・デ・グラン・カナリアですが、世界中のお客様とリモートで仕事をしています。ウェブサイトはスペイン語、英語、日本語に対応しています。",
              },
            },
            {
              q: { es: "¿Cómo os contacto?", en: "How do I contact you?", ja: "どうすれば連絡できますか？" },
              a: {
                es: "Escríbenos a info@kimoxstudio.com o usa el formulario de contacto de esta página. Respondemos en menos de 24h con preguntas, ideas o un plan.",
                en: "Email us at info@kimoxstudio.com or use the contact form on this page. We reply within 24h with questions, ideas, or a plan.",
                ja: "info@kimoxstudio.com までメールいただくか、このページのお問い合わせフォームをご利用ください。24時間以内に質問・アイデア・計画でお返事します。",
              },
            },
          ],
        }}
        node={stubNode("faq", "faq")}
      />

      <ContactSectionComponent
        props={{
          title: { es: "¿Empezamos algo?", en: "Shall we start something?", ja: "何か始めませんか？" },
          body: {
            es: "Cuéntanos en dos líneas qué tienes en mente. Respondemos en menos de 24h con preguntas, ideas o un plan.",
            en: "Tell us in two lines what you have in mind. We reply within 24h with questions, ideas, or a plan.",
            ja: "考えていることを2行でお聞かせください。24時間以内に質問・アイデア・計画でお返事します。",
          },
          or: { es: "o escríbenos a", en: "or email us at", ja: "またはメールで" },
          email: CONTACT_EMAIL,
          fieldName: { es: "Tu nombre", en: "Your name", ja: "お名前" },
          fieldEmail: { es: "Tu email", en: "Your email", ja: "メールアドレス" },
          fieldBudget: { es: "Presupuesto aproximado", en: "Rough budget", ja: "おおよその予算" },
          fieldMessage: { es: "Cuéntanos la idea", en: "Tell us the idea", ja: "アイデアをどうぞ" },
          fieldSend: { es: "Enviar →", en: "Send it →", ja: "送信 →" },
          budgets: {
            es: ["< 1.000€", "1.000 – 5.000€", "5.000 – 15.000€", "15.000€ +", "Aún no lo sé"],
            en: ["< €1,000", "€1,000 – 5,000", "€5,000 – 15,000", "€15,000 +", "Not sure yet"],
            ja: ["1,000€未満", "1,000〜5,000€", "5,000〜15,000€", "15,000€以上", "まだ未定"],
          },
        }}
        node={stubNode("contact", "contact-section")}
      />

      </main>

      <FooterWordmarkComponent
        props={{
          rights: {
            es: "© 2026 Kimox Studio · Hecho a mano en Las Palmas de Gran Canaria",
            en: "© 2026 Kimox Studio · Handcrafted in Las Palmas de Gran Canaria",
            ja: "© 2026 Kimox Studio · ラス・パルマス・デ・グラン・カナリアで手作り",
          },
          backToTop: { es: "Volver arriba ↑", en: "Back to top ↑", ja: "トップへ ↑" },
          blogLabel: { es: "Blog", en: "Blog", ja: "ブログ" },
          email: CONTACT_EMAIL,
        }}
        node={stubNode("footer", "footer-wordmark")}
      />
    </PageComponent>
  );
}
