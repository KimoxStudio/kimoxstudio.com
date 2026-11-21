// Content shared by the home page and the service landing pages
// (app/[locale]/diseno-web-las-palmas, app/[locale]/desarrollo-apps-las-palmas),
// so a project, the contact block or the footer is written once.
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "@/lib/urls";
import { SERVICE_PAGES } from "@/lib/service-pages";
import type { z } from "zod";
import type { projectListSchema } from "@/kx/templates/project-list/schema";
import type { contactSectionSchema } from "@/kx/templates/contact-section/schema";
import type { footerWordmarkSchema } from "@/kx/templates/footer-wordmark/schema";

export type Project = z.infer<typeof projectListSchema>["items"][number];

/** Projects keyed by slug; `n` (the list position) is assigned by `projectItems`. */
const PROJECT_DATA = {
  bonitaVida: {
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
  holovisor: {
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
  mymedesp: {
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
  alea: {
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
  patriSantana: {
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
  rachafit: {
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
} satisfies Record<string, Omit<Project, "n">>;

export type ProjectKey = keyof typeof PROJECT_DATA;

/** The given projects, in order, numbered 01, 02… for the project-list template. */
export function projectItems(keys: ProjectKey[]): Project[] {
  return keys.map((k, i) => ({ n: String(i + 1).padStart(2, "0"), ...PROJECT_DATA[k] }));
}

export const CONTACT_PROPS = {
  title: { es: "¿Empezamos algo?", en: "Shall we start something?", ja: "何か始めませんか？" },
  body: {
    es: "Cuéntanos en dos líneas qué tienes en mente. Respondemos en menos de 24h con preguntas, ideas o un plan.",
    en: "Tell us in two lines what you have in mind. We reply within 24h with questions, ideas, or a plan.",
    ja: "考えていることを2行でお聞かせください。24時間以内に質問・アイデア・計画でお返事します。",
  },
  or: { es: "o escríbenos a", en: "or email us at", ja: "またはメールで" },
  email: CONTACT_EMAIL,
  phone: CONTACT_PHONE,
  phoneDisplay: CONTACT_PHONE_DISPLAY,
  phoneLabel: { es: "o llámanos / WhatsApp", en: "or call / WhatsApp us", ja: "または電話 / WhatsApp" },
  whatsappLabel: { es: "WhatsApp", en: "WhatsApp", ja: "WhatsApp" },
  callLabel: { es: "Llamar", en: "Call", ja: "電話する" },
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
} satisfies z.infer<typeof contactSectionSchema>;

export const FOOTER_PROPS = {
  rights: {
    es: "© 2026 Kimox Studio · Hecho a mano en Las Palmas de Gran Canaria",
    en: "© 2026 Kimox Studio · Handcrafted in Las Palmas de Gran Canaria",
    ja: "© 2026 Kimox Studio · ラス・パルマス・デ・グラン・カナリアで手作り",
  },
  backToTop: { es: "Volver arriba ↑", en: "Back to top ↑", ja: "トップへ ↑" },
  blogLabel: { es: "Blog", en: "Blog", ja: "ブログ" },
  email: CONTACT_EMAIL,
  phone: CONTACT_PHONE,
  phoneDisplay: CONTACT_PHONE_DISPLAY,
  serviceLinks: SERVICE_PAGES.map(({ path, label }) => ({ href: path, label })),
} satisfies z.infer<typeof footerWordmarkSchema>;
