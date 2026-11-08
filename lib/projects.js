// Single source of truth for the studio's delivered projects: the home
// project list and the /projects/<slug> detail pages both read from here.
// Mirrors lib/posts.js (getAll* / get*(slug)), but the data is inline.

// Story sections: 3 per project, in the order of the screenshot each one is
// shown with (desktop, tablet, mobile). Titles and bodies are provisional and
// every body is marked as a placeholder; the owner replaces them per project.
// `alt` describes the screenshot. Nothing here is a claim about the project.
const placeholderSection = (title, es, en, ja, alt) => ({
  title,
  // What the section's screenshot shows (factual, not placeholder copy).
  alt,
  body: {
    es: `[Texto provisional] ${es}`,
    en: `[Placeholder] ${en}`,
    ja: `[仮テキスト] ${ja}`,
  },
});

const placeholderSections = ([desktop, tablet, mobile]) => [
  placeholderSection(
    { es: "Reto", en: "Challenge", ja: "課題" },
    "Aquí irá la descripción del reto de este proyecto.",
    "The challenge of this project will be described here.",
    "このプロジェクトの課題がここに入ります。",
    desktop,
  ),
  placeholderSection(
    { es: "Solución", en: "Solution", ja: "解決策" },
    "Aquí irá la solución que construimos.",
    "The solution we built will be described here.",
    "私たちが作った解決策がここに入ります。",
    tablet,
  ),
  placeholderSection(
    { es: "Resultado", en: "Result", ja: "成果" },
    "Aquí irá el resultado del proyecto.",
    "The outcome of the project will be described here.",
    "プロジェクトの成果がここに入ります。",
    mobile,
  ),
];

const PROJECTS = [
  {
    n: "01",
    name: "Cafetería Bonita Vida",
    slug: "bonitavida",
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
    sections: placeholderSections([
      { es: "Página de la carta: categorías de platos y un especial de desayuno marroquí a 5,95 €", en: "Menu page: dish categories and a Moroccan breakfast special at 5.95 €", ja: "メニューページ。料理カテゴリと、5.95€のモロッコ風朝食スペシャル" },
      { es: "Bonita Vida en tablet: puerta marroquí y botones «Ver la carta» y «Cómo llegar»", en: "Bonita Vida on tablet: a Moroccan door and “Ver la carta” and “Cómo llegar” buttons", ja: "タブレット版Bonita Vida。モロッコ風の扉と「Ver la carta」「Cómo llegar」ボタン" },
      { es: "Bonita Vida en móvil: puerta marroquí y botones «Ver la carta» y «Cómo llegar»", en: "Bonita Vida on mobile: a Moroccan door and “Ver la carta” and “Cómo llegar” buttons", ja: "モバイル版Bonita Vida。モロッコ風の扉と「Ver la carta」「Cómo llegar」ボタン" },
    ]),
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
    slug: "holovisor",
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
    sections: placeholderSections([
      { es: "«Everything for your collection»: varias cartas a la vez, valor, lista de deseos, carpetas y CSV", en: "“Everything for your collection”: several cards at once, value, wishlist, folders and CSV", ja: "「Everything for your collection」複数カード認識、価値、ウィッシュリスト、フォルダ、CSV" },
      { es: "Holovisor en tablet: carta Charizard ex con su precio de Cardmarket y botones Scan y Sign in", en: "Holovisor on tablet: a Charizard ex card with its Cardmarket price and Scan and Sign in buttons", ja: "タブレット版Holovisor。Charizard exのカードとCardmarket価格、ScanとSign inボタン" },
      { es: "Holovisor en móvil: botones Scan y Sign in y una carta Charizard ex con su precio", en: "Holovisor on mobile: Scan and Sign in buttons and a Charizard ex card with its price", ja: "モバイル版Holovisor。ScanとSign inボタンと、価格付きのCharizard exのカード" },
    ]),
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
    slug: "mymedesp",
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
    sections: placeholderSections([
      { es: "«Características» de mymedesp: lista de funciones y listado de recetas de la app", en: "mymedesp “Características” section: feature list and the app's recipe list", ja: "mymedespの「Características」セクション。機能一覧とアプリのレシピ一覧" },
      { es: "mymedesp en tablet: «Guarda recetas de cualquier lugar en segundos» y botón «Empieza gratis»", en: "mymedesp on tablet: “Guarda recetas de cualquier lugar en segundos” and an “Empieza gratis” button", ja: "タブレット版mymedesp。「Guarda recetas de cualquier lugar en segundos」と「Empieza gratis」" },
      { es: "mymedesp en móvil: «Guarda recetas de cualquier lugar en segundos» y botón «Empieza gratis»", en: "mymedesp on mobile: “Guarda recetas de cualquier lugar en segundos” and an “Empieza gratis” button", ja: "モバイル版mymedesp。「Guarda recetas de cualquier lugar en segundos」と「Empieza gratis」" },
    ]),
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
    slug: "alea",
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
    sections: placeholderSections([
      { es: "Sección «Próximos eventos» con tres carteles de eventos en un carrusel", en: "“Upcoming events” section with three event posters in a carousel", ja: "「Próximos Eventos」セクション。3枚のイベントポスターがカルーセルに並ぶ" },
      { es: "Alea Las Palmas en tablet: título y subtítulo sobre un fondo oscuro con un pentagrama", en: "Alea Las Palmas on tablet: title and subtitle over a dark pentagram background", ja: "タブレット版Alea Las Palmas。五芒星の暗い背景にタイトルとサブタイトル" },
      { es: "Alea Las Palmas en móvil: título y subtítulo centrados sobre un fondo oscuro", en: "Alea Las Palmas on mobile: centred title and subtitle over a dark background", ja: "モバイル版Alea Las Palmas。暗い背景の中央にタイトルとサブタイトル" },
    ]),
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
    slug: "patri-santana",
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
    sections: placeholderSections([
      { es: "Galería de fotos de uñas y barbería, y tarifas de manicura y pedicura", en: "Photo gallery of nails and barbering, and manicure and pedicure price lists", ja: "ネイルと理容の写真ギャラリー、ネイルとフットケアの料金表" },
      { es: "Patri Santana en tablet: título en caligrafía, presentación y botones «Reservar cita» y «WhatsApp»", en: "Patri Santana on tablet: script title, intro text and “Reservar cita” and “WhatsApp” buttons", ja: "タブレット版Patri Santana。筆記体のタイトル、紹介文、「Reservar cita」「WhatsApp」ボタン" },
      { es: "Patri Santana en móvil: título en caligrafía, presentación y botones «Reservar cita» y «WhatsApp»", en: "Patri Santana on mobile: script title, intro text and “Reservar cita” and “WhatsApp” buttons", ja: "モバイル版Patri Santana。筆記体のタイトル、紹介文、「Reservar cita」「WhatsApp」ボタン" },
    ]),
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
    slug: "rachafit",
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
    sections: placeholderSections([
      { es: "Pantalla «Clasificación» de RachaFit: ranking de fuerza entre amigos, por ejercicio", en: "RachaFit “Clasificación” screen: strength ranking among friends, by exercise", ja: "RachaFitの「Clasificación」画面。種目別の友人間の筋力ランキング" },
      { es: "RachaFit en tablet: «No rompas la racha», una tarjeta de rango y botón «Pruébalo sin cuenta»", en: "RachaFit on tablet: “No rompas la racha”, a rank card and a “Pruébalo sin cuenta” button", ja: "タブレット版RachaFit。「No rompas la racha」、ランクカード、「Pruébalo sin cuenta」ボタン" },
      { es: "RachaFit en móvil: «No rompas la racha», una tarjeta de rango y botón «Pruébalo sin cuenta»", en: "RachaFit on mobile: “No rompas la racha”, a rank card and a “Pruébalo sin cuenta” button", ja: "モバイル版RachaFit。「No rompas la racha」、ランクカード、「Pruébalo sin cuenta」ボタン" },
    ]),
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
];

export function getAllProjects() {
  return PROJECTS;
}

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug) || null;
}
