// Single source of truth for the studio's delivered projects: the home
// project list and the /projects/<slug> detail pages both read from here.
// Mirrors lib/posts.js (getAll* / get*(slug)), but the data is inline.

// Story sections: 3 per project (challenge, solution, what we shipped), in the
// order of the screenshot each one is shown with (desktop, tablet, mobile).
// `alt` describes the screenshot. Every project has written copy except Alea,
// whose sections still use the placeholder helpers below until its copy is
// ready.
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
    { es: "Lo entregado", en: "What we shipped", ja: "納品内容" },
    "Aquí irá lo que entregamos.",
    "What we shipped will be described here.",
    "納品した内容がここに入ります。",
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
      es: "Web de una cafetería del barrio de Schamann con repostería marroquí: carta online, galería del local, catering y reseñas de Google integradas. Dulces hechos a mano cada mañana.",
      en: "Website for a Schamann café with Moroccan pastries: online menu, venue gallery, catering and Google reviews built in. Sweets made by hand every morning.",
      ja: "シャマン地区にある、モロッコ菓子のカフェ＆ベーカリーのサイト。オンラインメニュー、店内ギャラリー、ケータリング、Googleのレビューを統合。毎朝手作りのスイーツを紹介します。",
    },
    tags: ["Next.js", "SEO", "Carta online", "Reseñas"],
    sections: [
      {
        title: { es: "Reto", en: "Challenge", ja: "課題" },
        alt: { es: "Página de la carta: categorías de platos y un especial de desayuno marroquí a 5,95 €", en: "Menu page: dish categories and a Moroccan breakfast special at 5.95 €", ja: "メニューページ。料理カテゴリと、5.95€のモロッコ風朝食スペシャル" },
        body: {
          es: "Una cafetería y repostería del barrio de Schamann, en Las Palmas de Gran Canaria, quería enseñar su carta con precios, su local y su catering, en español y en inglés.",
          en: "A café and bakery in the Schamann neighborhood of Las Palmas de Gran Canaria wanted to show its menu with prices, its space and its catering, in Spanish and English.",
          ja: "ラス・パルマス・デ・グラン・カナリアのシャマン地区にあるカフェ＆ベーカリーは、価格付きのメニュー、店内、ケータリングをスペイン語と英語で見せたいと考えていました。",
        },
      },
      {
        title: { es: "Solución", en: "Solution", ja: "解決策" },
        alt: { es: "Bonita Vida en tablet: puerta marroquí y botones «Ver la carta» y «Cómo llegar»", en: "Bonita Vida on tablet: a Moroccan door and “Ver la carta” and “Cómo llegar” buttons", ja: "タブレット版Bonita Vida。モロッコ風の扉と「Ver la carta」「Cómo llegar」ボタン" },
        body: {
          es: "Carta con precios, galería, catering, contacto y páginas sobre la historia del local y sobre su repostería, en español y en inglés. Las reseñas llegan directamente de Google, se guardan un día y se ocultan si Google no responde. El mapa de contacto solo carga cuando el visitante lo acepta.",
          en: "Menu with prices, gallery, catering, contact, and pages on the venue's story and on its bakery, in Spanish and English. Reviews come directly from Google, are kept for a day and are hidden if Google fails to respond. The contact map loads only when the visitor accepts it.",
          ja: "価格付きのメニュー、ギャラリー、ケータリング、お問い合わせ、店の歴史とベーカリーのページを、スペイン語と英語で用意しました。レビューはGoogleから直接取得して1日保存し、Googleが応答しない場合は非表示にします。問い合わせ用の地図は、訪問者が同意したときだけ読み込まれます。",
        },
      },
      {
        title: { es: "Lo entregado", en: "What we shipped", ja: "納品内容" },
        alt: { es: "Bonita Vida en móvil: puerta marroquí y botones «Ver la carta» y «Cómo llegar»", en: "Bonita Vida on mobile: a Moroccan door and “Ver la carta” and “Cómo llegar” buttons", ja: "モバイル版Bonita Vida。モロッコ風の扉と「Ver la carta」「Cómo llegar」ボタン" },
        body: {
          es: "Sitio hecho con Next.js y preparado para buscadores: cada idioma tiene su propia dirección y Google puede entender que es una cafetería.",
          en: "A Next.js site prepared for search engines: each language has its own address and Google can tell it is a café.",
          ja: "Next.jsで作った検索エンジン対応のサイトで、言語ごとに専用のアドレスがあり、Googleがカフェだと理解できます。",
        },
      },
    ],
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
      es: "Escáner de cartas Pokémon: enfoca la carta con la cámara y la reconoce en español e inglés (otros idiomas se cargan cuando hacen falta), gratis y sin límites. Sigue su valor con precios de Cardmarket y guarda tu colección con su valor total.",
      en: "Pokémon card scanner: point your camera at a card and it recognizes it in Spanish and English (other languages load when needed), free and unlimited. Tracks its value with Cardmarket prices and keeps your collection with its total worth.",
      ja: "ポケモンカードのスキャナーアプリ。カメラを向けるとスペイン語と英語のカードを認識し（ほかの言語は必要に応じて読み込み）、無料かつ無制限。Cardmarketの価格で価値を追い、コレクションの合計価値を管理できます。",
    },
    tags: ["WebGPU", "Cámara", "Cardmarket"],
    sections: [
      {
        title: { es: "Reto", en: "Challenge", ja: "課題" },
        alt: { es: "«Everything for your collection»: varias cartas a la vez, valor, lista de deseos, carpetas y CSV", en: "“Everything for your collection”: several cards at once, value, wishlist, folders and CSV", ja: "「Everything for your collection」複数カード認識、価値、ウィッシュリスト、フォルダ、CSV" },
        body: {
          es: "Quien colecciona cartas Pokémon quiere identificar una al enfocarla con la cámara, saber cuánto vale y guardarla en una colección con su valor total, sin pagar por escanear ni tener un límite.",
          en: "Pokémon card collectors want to identify a card by pointing the camera at it, see what it is worth and keep it in a collection with its total value, without paying per scan or hitting a limit.",
          ja: "ポケモンカードのコレクターが、カメラを向けるだけでカードを識別し、価値を確認し、合計価値つきのコレクションに保存でき、しかもスキャンに料金も回数の制限もかからないようにすることが課題でした。",
        },
      },
      {
        title: { es: "Solución", en: "Solution", ja: "解決策" },
        alt: { es: "Holovisor en tablet: carta Charizard ex con su precio de Cardmarket y botones Scan y Sign in", en: "Holovisor on tablet: a Charizard ex card with its Cardmarket price and Scan and Sign in buttons", ja: "タブレット版Holovisor。Charizard exのカードとCardmarket価格、ScanとSign inボタン" },
        body: {
          es: "El reconocimiento funciona dentro del navegador y usa la GPU (WebGPU) cuando el equipo lo permite. Por defecto reconoce cartas en español e inglés; otros idiomas se cargan cuando hacen falta. El catálogo viene de TCGdex y los precios, de la guía diaria de Cardmarket.",
          en: "Recognition runs inside the browser and uses the GPU (WebGPU) when the device allows it. By default it recognizes Spanish and English cards; other languages load when needed. The catalog comes from TCGdex and prices from Cardmarket's daily price guide.",
          ja: "認識はブラウザの中で動き、端末が対応していればGPU（WebGPU）も使います。標準ではスペイン語と英語のカードを認識し、ほかの言語は必要になると読み込みます。カタログはTCGdex、価格はCardmarketの日次価格ガイドが元です。",
        },
      },
      {
        title: { es: "Lo entregado", en: "What we shipped", ja: "納品内容" },
        alt: { es: "Holovisor en móvil: botones Scan y Sign in y una carta Charizard ex con su precio", en: "Holovisor on mobile: Scan and Sign in buttons and a Charizard ex card with its price", ja: "モバイル版Holovisor。ScanとSign inボタンと、価格付きのCharizard exのカード" },
        body: {
          es: "Una app web instalable que usa la cámara trasera y calcula en el servidor el valor total de la colección. También hay una app nativa, hecha con Capacitor, que abre la misma web.",
          en: "An installable web app that uses the rear camera and computes the collection's total value on the server. A native app built with Capacitor opens the same web app.",
          ja: "背面カメラを使うインストール可能なウェブアプリで、コレクションの合計価値はサーバー側で計算します。Capacitorで作ったネイティブアプリからも、同じウェブアプリを使えます。",
        },
      },
    ],
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
      es: "Plataforma de recetas y planificación de menús. Importa recetas desde redes sociales o desde un enlace, arma el menú semanal y genera la lista de la compra automáticamente.",
      en: "Recipe and meal-planning platform. Import recipes from social media or from a link, build your weekly menu, and get the shopping list generated automatically.",
      ja: "レシピと献立プランニングのプラットフォーム。SNSやリンクからレシピを取り込み、週間メニューを組み立てると、買い物リストが自動で生成されます。",
    },
    tags: ["React", "NestJS", "PostgreSQL", "Auth"],
    sections: [
      {
        title: { es: "Reto", en: "Challenge", ja: "課題" },
        alt: { es: "«Características» de mymedesp: lista de funciones y listado de recetas de la app", en: "mymedesp “Características” section: feature list and the app's recipe list", ja: "mymedespの「Características」セクション。機能一覧とアプリのレシピ一覧" },
        body: {
          es: "Las recetas viven repartidas entre webs y redes sociales, y pasarlas a un menú semanal y a una lista de la compra obliga a copiarlas a mano.",
          en: "Recipes live scattered across websites and social media, and turning them into a weekly menu and a shopping list means copying them by hand.",
          ja: "レシピはウェブサイトやSNSに散らばっていて、週間メニューや買い物リストにするには手で書き写す必要がありました。",
        },
      },
      {
        title: { es: "Solución", en: "Solution", ja: "解決策" },
        alt: { es: "mymedesp en tablet: «Guarda recetas de cualquier lugar en segundos» y botón «Empieza gratis»", en: "mymedesp on tablet: “Guarda recetas de cualquier lugar en segundos” and an “Empieza gratis” button", ja: "タブレット版mymedesp。「Guarda recetas de cualquier lugar en segundos」と「Empieza gratis」" },
        body: {
          es: "Las recetas se importan desde un enlace, desde redes sociales (Instagram, TikTok y Facebook, con el audio transcrito) o por voz, y se procesan en segundo plano. Una semana se puede guardar como plantilla de siete días y volver a aplicar en el calendario. La lista de la compra ajusta las cantidades según las raciones y las veces que aparece cada receta en el menú.",
          en: "Recipes are imported from a link, from social media (Instagram, TikTok and Facebook, with the audio transcribed) or by voice, and are processed in the background. A week can be saved as a seven-day template and applied again to the calendar. The shopping list scales quantities by servings and by how many times each recipe appears in the menu.",
          ja: "レシピはリンクやSNS（Instagram、TikTok、Facebook）、音声入力から取り込み、SNSの動画は音声を文字起こしして、バックグラウンドで処理します。1週間分を7日間のテンプレートとして保存し、カレンダーに繰り返し適用できます。買い物リストは、人数分と各レシピが献立に登場する回数に応じて分量を調整します。",
        },
      },
      {
        title: { es: "Lo entregado", en: "What we shipped", ja: "納品内容" },
        alt: { es: "mymedesp en móvil: «Guarda recetas de cualquier lugar en segundos» y botón «Empieza gratis»", en: "mymedesp on mobile: “Guarda recetas de cualquier lugar en segundos” and an “Empieza gratis” button", ja: "モバイル版mymedesp。「Guarda recetas de cualquier lugar en segundos」と「Empieza gratis」" },
        body: {
          es: "Sirve para guardar recetas, planificar la semana y compartir calendarios por invitación, con Chefi, un asistente de chat. Por debajo, un monorepo con la web en React (y Capacitor para móvil), una API en NestJS, una landing en Astro y un panel de administración, sobre Postgres con Supabase.",
          en: "It lets you save recipes, plan the week and share calendars by invitation, with Chefi, a chat assistant. Underneath is a monorepo with a React web app (plus Capacitor for mobile), a NestJS API, an Astro landing page and an admin panel, on Postgres with Supabase.",
          ja: "レシピの保存、1週間の計画、招待によるカレンダー共有ができ、チャットアシスタントのChefiも備えます。内部はモノレポで、React製のウェブアプリ（モバイルはCapacitor）、NestJSのAPI、Astroのランディングページ、管理画面があり、データベースはSupabase上のPostgresです。",
        },
      },
    ],
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
      es: "Sitio para un centro de estética y barbería en Las Palmas de Gran Canaria: uñas, cejas, pestañas, depilación láser y barbería. Presentación de servicios, con reserva en Booksy y contacto por WhatsApp o teléfono.",
      en: "Site for a beauty salon and barbershop in Las Palmas de Gran Canaria: nails, brows, lashes, laser hair removal and barbering. Service showcase, with booking on Booksy and contact by WhatsApp or phone.",
      ja: "ラス・パルマス・デ・グラン・カナリアの美容・理容サロンのサイトです。ネイル、眉、まつげ、レーザー脱毛、理容サービスを紹介し、予約はBooksy、連絡はWhatsAppか電話でできます。",
    },
    tags: ["Next.js", "SEO", "Booksy"],
    sections: [
      {
        title: { es: "Reto", en: "Challenge", ja: "課題" },
        alt: { es: "Galería de fotos de uñas y barbería, y tarifas de manicura y pedicura", en: "Photo gallery of nails and barbering, and manicure and pedicure price lists", ja: "ネイルと理容の写真ギャラリー、ネイルとフットケアの料金表" },
        body: {
          es: "Clientas y clientes de un centro de estética y barbería de Schamann necesitan ver qué se ofrece, a qué precio y cómo reservar.",
          en: "Clients of a beauty salon and barbershop in Schamann need to see what is offered, at what price and how to book.",
          ja: "シャマン地区の美容・理容サロンで、お客様がサービスの内容と料金、予約の方法を確認できるようにする必要がありました。",
        },
      },
      {
        title: { es: "Solución", en: "Solution", ja: "解決策" },
        alt: { es: "Patri Santana en tablet: título en caligrafía, presentación y botones «Reservar cita» y «WhatsApp»", en: "Patri Santana on tablet: script title, intro text and “Reservar cita” and “WhatsApp” buttons", ja: "タブレット版Patri Santana。筆記体のタイトル、紹介文、「Reservar cita」「WhatsApp」ボタン" },
        body: {
          es: "Una sola página con tarifas de nueve categorías de servicios y un apartado de packs; en móvil cada categoría se abre y se cierra con un toque. La galería reúne fotos de belleza y de barbería, con ejemplos de antes y después. Se abre a pantalla completa, se recorre arrastrando o con las teclas de flecha y se cierra con Escape.",
          en: "A single page with prices for nine service categories and a packs section; on mobile each category opens and closes with a tap. The gallery gathers beauty and barber photos, with before-and-after examples. It opens full screen; browse by swiping or with the arrow keys, and close it with Escape.",
          ja: "1ページに、9つのサービス区分とパックの項目の料金をまとめ、モバイルでは区分ごとにタップで開閉できます。ギャラリーにはビューティーと理容の写真とビフォーアフターを載せています。全画面表示で、ドラッグや矢印キーで閲覧し、Escで閉じます。",
        },
      },
      {
        title: { es: "Lo entregado", en: "What we shipped", ja: "納品内容" },
        alt: { es: "Patri Santana en móvil: título en caligrafía, presentación y botones «Reservar cita» y «WhatsApp»", en: "Patri Santana on mobile: script title, intro text and “Reservar cita” and “WhatsApp” buttons", ja: "モバイル版Patri Santana。筆記体のタイトル、紹介文、「Reservar cita」「WhatsApp」ボタン" },
        body: {
          es: "El botón «Reservar cita» lleva a una página externa de Booksy, y también se puede escribir por WhatsApp o llamar por teléfono. La web está preparada para buscadores, de modo que Google puede entender qué servicios ofrece y en qué horario, e incluye páginas legales.",
          en: "The booking button leads to an external Booksy page, and clients can also message on WhatsApp or call. The site is prepared for search engines, so Google can tell which services it offers and when it is open, and it includes legal pages.",
          ja: "予約ボタンは外部のBooksyのページにつながり、WhatsAppでの連絡や電話もできます。検索エンジンにも対応し、Googleがサービス内容と営業時間を理解できるようにしていて、法的情報のページも備えます。",
        },
      },
    ],
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
      es: "Diario de entrenamiento social para quien va al gimnasio y para quien corre. Registro rápido de ejercicios, progreso con gráficos de fuerza y cardio, rachas de constancia y clasificación entre amigos.",
      en: "Social training journal for gym-goers and runners. Fast exercise logging, strength and cardio progress charts, consistency streaks and a leaderboard among friends.",
      ja: "ジム利用者やランナー向けのソーシャル・トレーニング日記です。素早い運動記録、筋力・有酸素の進捗グラフ、連続記録（ストリーク）、友人同士のランキング機能を備えています。",
    },
    tags: ["Mobile", "Social", "GPS"],
    sections: [
      {
        title: { es: "Reto", en: "Challenge", ja: "課題" },
        alt: { es: "Pantalla «Clasificación» de RachaFit: ranking de fuerza entre amigos, por ejercicio", en: "RachaFit “Clasificación” screen: strength ranking among friends, by exercise", ja: "RachaFitの「Clasificación」画面。種目別の友人間の筋力ランキング" },
        body: {
          es: "Un diario de entrenamiento para quien va al gimnasio y para quien corre, en el que anotar una sesión sea tan simple como escribirla con tus palabras, con fotos si quieres.",
          en: "A training journal for gym-goers and runners, where logging a session should be as simple as writing it in your own words, with photos if you like.",
          ja: "ジムに通う人とランナーのためのトレーニング日記で、セッションを自分の言葉で書くだけで記録でき、写真も添えられるようにすることが課題でした。",
        },
      },
      {
        title: { es: "Solución", en: "Solution", ja: "解決策" },
        alt: { es: "RachaFit en tablet: «No rompas la racha», una tarjeta de rango y botón «Pruébalo sin cuenta»", en: "RachaFit on tablet: “No rompas la racha”, a rank card and a “Pruébalo sin cuenta” button", ja: "タブレット版RachaFit。「No rompas la racha」、ランクカード、「Pruébalo sin cuenta」ボタン" },
        body: {
          es: "Escribes el entrenamiento en lenguaje natural y un modelo de lenguaje lo convierte en datos estructurados. El texto se procesa en segundo plano y, si la app repite un envío, no se duplica. Para correr, la app nativa guarda la ruta por GPS.",
          en: "You write the workout in natural language and a language model turns it into structured data. Processing runs in the background and, if the app repeats a submission, it is not duplicated. For runs, the native app records the route by GPS.",
          ja: "トレーニング内容を自然な言葉で書くと、言語モデルが構造化データに変換します。処理はバックグラウンドで行われ、アプリが同じ送信を繰り返しても重複しません。ランニングでは、ネイティブアプリがGPSでルートを記録します。",
        },
      },
      {
        title: { es: "Lo entregado", en: "What we shipped", ja: "納品内容" },
        alt: { es: "RachaFit en móvil: «No rompas la racha», una tarjeta de rango y botón «Pruébalo sin cuenta»", en: "RachaFit on mobile: “No rompas la racha”, a rank card and a “Pruébalo sin cuenta” button", ja: "モバイル版RachaFit。「No rompas la racha」、ランクカード、「Pruébalo sin cuenta」ボタン" },
        body: {
          es: "Construida con Next.js y Capacitor, tiene apps para Android e iOS. Incluye diario, estadísticas, rangos, clasificación entre amigos, logros, rutinas, planes y objetivos, y sesiones que se comparten por enlace.",
          en: "Built with Next.js and Capacitor, it has apps for Android and iOS. It includes a journal, stats, ranks, a leaderboard among friends, achievements, routines, plans, goals, and sessions shared by link.",
          ja: "Next.jsとCapacitorで作り、AndroidとiOSのアプリがあります。日記、統計、ランク、友人とのランキング、実績、ルーティン、プラン、目標、リンクで共有できるセッションを備えます。",
        },
      },
    ],
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
