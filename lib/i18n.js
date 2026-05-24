// Shared content for Kimox Studio landing — ES / EN / JA
// Used by all three variations. Each terminal value is { es, en, ja }.

export const I18N = {
  meta: {
    studioName: { es: "Kimox Studio", en: "Kimox Studio", ja: "Kimox Studio" },
    tagline: {
      es: "Estudio de software · Web & Móvil",
      en: "Software studio · Web & Mobile",
      ja: "ソフトウェアスタジオ · ウェブ＆モバイル"
    },
    email: "kimoxstudio@gmail.com",
    location: { es: "Trabajamos en remoto · España", en: "Remote · Spain", ja: "リモート · スペイン" }
  },

  nav: {
    work: { es: "Proyectos", en: "Work", ja: "プロジェクト" },
    services: { es: "Servicios", en: "Services", ja: "サービス" },
    process: { es: "Proceso", en: "Process", ja: "プロセス" },
    about: { es: "Nosotros", en: "About", ja: "私たち" },
    blog: { es: "Blog", en: "Blog", ja: "ブログ" },
    contact: { es: "Contacto", en: "Contact", ja: "お問い合わせ" }
  },

  hero: {
    eyebrow: {
      es: "Estudio independiente · Desde 2024",
      en: "Independent studio · Since 2024",
      ja: "独立スタジオ · 2024年〜"
    },
    h1: {
      es: ["Software", "con alma", "que habla", "tu idioma."],
      en: ["Software", "with soul", "that speaks", "your language."],
      ja: ["魂のある", "ソフトウェアを", "あなたの言葉で。"]
    },
    sub: {
      es: "Diseñamos y desarrollamos aplicaciones web y móviles que cargan con los valores de tu marca. Sin plantillas. Sin atajos. Sin software de catálogo.",
      en: "We design and build web and mobile applications that carry your brand's values. No templates. No shortcuts. No off-the-shelf software.",
      ja: "ブランドの価値を体現するウェブ・モバイルアプリケーションを設計・開発します。テンプレートなし、近道なし、既製品なし。"
    },
    cta1: { es: "Cuéntanos tu idea", en: "Tell us your idea", ja: "アイデアを聞かせて" },
    cta2: { es: "Ver proyectos", en: "See our work", ja: "プロジェクトを見る" },
    marquee: {
      es: ["DESARROLLO A MEDIDA", "WEB & MÓVIL", "MANTENIMIENTO", "MIGRACIONES", "SEO TÉCNICO"],
      en: ["CUSTOM DEVELOPMENT", "WEB & MOBILE", "MAINTENANCE", "MIGRATIONS", "TECHNICAL SEO"],
      ja: ["カスタム開発", "ウェブ＆モバイル", "保守", "移行", "テクニカルSEO"]
    }
  },

  manifesto: {
    label: { es: "Manifiesto", en: "Manifesto", ja: "宣言" },
    title: {
      es: "No hacemos software genérico.",
      en: "We don't ship generic software.",
      ja: "汎用ソフトウェアは作りません。"
    },
    body: {
      es: "Cada proyecto es un organismo distinto. Tiene su propio carácter, su propio idioma, sus propios rituales. Nuestro trabajo es escuchar lo que tu producto quiere ser y dárselo en forma de código que perdura.",
      en: "Every project is its own organism. It has its own character, its own language, its own rituals. Our job is to listen to what your product wants to be — and give it that, in code that lasts.",
      ja: "各プロジェクトは独立した生き物です。独自の個性、独自の言語、独自の儀式があります。私たちの役割は、プロダクトがなりたい姿に耳を傾け、それを長く残るコードにすることです。"
    },
    bullets: {
      es: [
        "Construimos producto, no plantillas.",
        "Optimizamos para SEO desde la primera línea.",
        "Te entregamos código que tu equipo puede leer.",
        "Si no aporta valor, no se envía."
      ],
      en: [
        "We build product, not templates.",
        "We optimize for SEO from line one.",
        "We hand over code your team can read.",
        "If it doesn't add value, it doesn't ship."
      ],
      ja: [
        "テンプレートではなくプロダクトを作ります。",
        "1行目からSEOを意識します。",
        "読めるコードをお渡しします。",
        "価値がなければ出荷しません。"
      ]
    }
  },

  services: {
    label: { es: "Servicios", en: "Services", ja: "サービス" },
    title: {
      es: "Lo que construimos.",
      en: "What we build.",
      ja: "私たちが作るもの。"
    },
    items: [
      {
        n: "01",
        priceFrom: "500€",
        title: { es: "Landing pages", en: "Landing pages", ja: "ランディングページ" },
        body: {
          es: "Páginas hechas a mano, rápidas y optimizadas para SEO. Pensadas para convertir desde el primer pixel.",
          en: "Hand-crafted pages, fast and SEO-tuned. Built to convert from the first pixel.",
          ja: "手作りで高速、SEOに最適化されたページ。最初のピクセルから成果につながります。"
        },
        bullets: {
          es: ["Diseño a medida", "SEO técnico incluido", "Entrega en 2-3 semanas"],
          en: ["Custom design", "Technical SEO included", "2-3 week delivery"],
          ja: ["カスタムデザイン", "テクニカルSEO込み", "2〜3週間で納品"]
        }
      },
      {
        n: "02",
        priceFrom: "1.500€",
        title: { es: "Aplicaciones web", en: "Web applications", ja: "ウェブアプリケーション" },
        body: {
          es: "Apps web completas con base de datos, autenticación y panel propio. Como Mymedesp o Characters Vault.",
          en: "Full web apps with database, auth and admin panel. Like Mymedesp or Characters Vault.",
          ja: "データベース、認証、管理画面を備えた本格的なウェブアプリ。Mymedesp や Characters Vault のような。"
        },
        bullets: {
          es: ["Stack moderno", "Escalable", "Hosting incluido el primer año"],
          en: ["Modern stack", "Scalable", "First year of hosting included"],
          ja: ["モダンなスタック", "スケーラブル", "初年度ホスティング込み"]
        }
      },
      {
        n: "03",
        priceFrom: { es: "A medida", en: "Custom", ja: "個別見積もり" },
        title: { es: "Tu propia idea", en: "Your own idea", ja: "あなたのアイデア" },
        body: {
          es: "Aplicaciones móviles, SaaS, integraciones, plataformas complejas. Cuéntanos qué necesitas y te pasamos un plan.",
          en: "Mobile apps, SaaS, integrations, complex platforms. Tell us what you need and we'll send a plan.",
          ja: "モバイルアプリ、SaaS、統合、複雑なプラットフォーム。要件をお聞かせいただき、計画をご提案します。"
        },
        bullets: {
          es: ["iOS + Android nativo o cross-platform", "Diseño + desarrollo", "Acompañamiento post-lanzamiento"],
          en: ["iOS + Android native or cross-platform", "Design + development", "Post-launch support"],
          ja: ["iOS・Android ネイティブまたはクロスプラットフォーム", "デザイン＋開発", "ローンチ後のサポート"]
        }
      }
    ],
    extras: {
      label: { es: "También hacemos", en: "We also do", ja: "他にも" },
      items: {
        es: ["Mantenimiento mensual", "Migraciones de stack", "Auditorías SEO técnicas", "Refactor de código heredado"],
        en: ["Monthly maintenance", "Stack migrations", "Technical SEO audits", "Legacy code refactor"],
        ja: ["月次保守", "スタック移行", "テクニカルSEO監査", "レガシーコードのリファクタ"]
      }
    },
    fromLabel: { es: "Desde", en: "From", ja: "〜から" }
  },

  work: {
    label: { es: "Proyectos", en: "Selected work", ja: "選ばれた作品" },
    title: {
      es: "Cosas que hemos enviado.",
      en: "Things we've shipped.",
      ja: "出荷したもの。"
    },
    items: [
      {
        n: "01",
        name: "Mymedesp",
        url: "mymedesp.com",
        year: "2025",
        logo: "/projects/mymedesp.png",
        category: { es: "App web · Salud", en: "Web app · Health", ja: "ウェブアプリ · 医療" },
        body: {
          es: "Plataforma de consulta médica con autenticación, panel de paciente y búsqueda avanzada de medicamentos.",
          en: "Medical reference platform with auth, patient panel and advanced drug search.",
          ja: "認証、患者パネル、高度な薬剤検索を備えた医療リファレンスプラットフォーム。"
        },
        tags: ["Next.js", "PostgreSQL", "Auth", "SEO"]
      },
      {
        n: "02",
        name: "Characters Vault",
        url: "charactersvault.com",
        year: "2025",
        logo: "/projects/charactersvault.png",
        category: { es: "App web · Creativa", en: "Web app · Creative", ja: "ウェブアプリ · クリエイティブ" },
        body: {
          es: "Biblioteca de personajes con sistema de fichas, etiquetado y galerías. Diseño juguetón con muchas micro-animaciones.",
          en: "Character library with character sheets, tagging and galleries. Playful design with lots of micro-animations.",
          ja: "キャラクターシート、タグ付け、ギャラリー機能を備えたキャラクター図鑑。マイクロアニメーション豊富な遊び心ある設計。"
        },
        tags: ["React", "Animations", "DB", "Auth"]
      },
      {
        n: "03",
        name: "AIA Core",
        url: "github.com/Linkaynn/aia",
        year: "2026",
        category: { es: "Open source · Tooling IA", en: "Open source · AI tooling", ja: "OSS · AIツール" },
        body: {
          es: "Motor de workflows multi-agente y multi-proveedor: orquesta equipos de agentes (Claude, Gemini, Codex, opencode) que planifican, implementan, revisan y mergean cambios en worktrees aislados hasta llegar a consenso.",
          en: "Multi-agent, multi-provider workflow engine: orchestrates teams of AI agents (Claude, Gemini, Codex, opencode) that plan, implement, review, and merge changes in isolated git worktrees until they reach consensus.",
          ja: "マルチエージェント・マルチプロバイダのワークフローエンジン。Claude、Gemini、Codex、opencodeのエージェント群が独立したworktreeで計画、実装、レビュー、マージを合意形成まで自律的に進めます。"
        },
        tags: ["TypeScript", "Bun", "Next.js", "OSS"]
      }
    ],
    viewSite: { es: "Visitar →", en: "Visit →", ja: "訪問 →" }
  },

  process: {
    label: { es: "Proceso", en: "Process", ja: "プロセス" },
    title: {
      es: "Cómo trabajamos.",
      en: "How we work.",
      ja: "私たちの働き方。"
    },
    steps: [
      {
        n: "01",
        title: { es: "Escuchamos", en: "We listen", ja: "聞く" },
        body: {
          es: "Una llamada larga para entender qué quieres construir, por qué, y para quién. Te pasamos un plan honesto.",
          en: "A long call to understand what you want to build, why, and for whom. We send an honest plan back.",
          ja: "何を、なぜ、誰のために作りたいかを理解するためのじっくりとした通話。正直な計画をお返しします。"
        }
      },
      {
        n: "02",
        title: { es: "Dibujamos", en: "We sketch", ja: "描く" },
        body: {
          es: "Prototipos clicables antes de tocar una línea de código. Aquí es donde más rápido se itera y donde menos se pierde.",
          en: "Clickable prototypes before we touch a line of code. This is where you iterate fastest and lose least.",
          ja: "コードに触れる前のクリック可能なプロトタイプ。最速で繰り返し、最も損失が少ない段階です。"
        }
      },
      {
        n: "03",
        title: { es: "Construimos", en: "We build", ja: "作る" },
        body: {
          es: "Sprints semanales con entregas reales. Ves el producto crecer en tiempo real, sin cajas negras.",
          en: "Weekly sprints with real deliveries. You see the product grow in real time, no black boxes.",
          ja: "実際の納品を伴う週次スプリント。ブラックボックスなしで、リアルタイムにプロダクトが育っていきます。"
        }
      },
      {
        n: "04",
        title: { es: "Cuidamos", en: "We tend", ja: "育てる" },
        body: {
          es: "Tras lanzar, seguimos contigo. Mantenimiento, métricas, SEO, mejoras. Un producto vivo necesita jardinería.",
          en: "After launch, we stay. Maintenance, metrics, SEO, improvements. A living product needs gardening.",
          ja: "ローンチ後も伴走します。保守、計測、SEO、改善。生きているプロダクトには手入れが必要です。"
        }
      }
    ]
  },

  testimonials: {
    label: { es: "Lo que dicen", en: "What they say", ja: "お客様の声" },
    items: [
      {
        quote: {
          es: "Entendieron el proyecto mejor que nosotros mismos. El resultado tiene la cara de nuestra marca, no la de una plantilla.",
          en: "They understood the project better than we did. The result has our brand's face, not a template's.",
          ja: "私たち以上にプロジェクトを理解してくれました。テンプレートではなく、私たちのブランドの顔をした成果物です。"
        },
        name: "Ana M.",
        role: { es: "Fundadora · Studio independiente", en: "Founder · Independent studio", ja: "創業者 · 独立スタジオ" }
      },
      {
        quote: {
          es: "Tiempo de respuesta de horas, código limpio y un proceso que se siente como una conversación, no como una factura.",
          en: "Hours response time, clean code, and a process that feels like a conversation, not an invoice.",
          ja: "数時間で返信、きれいなコード、請求書ではなく会話のように感じられるプロセス。"
        },
        name: "Marco D.",
        role: { es: "CTO · SaaS B2B", en: "CTO · B2B SaaS", ja: "CTO · B2B SaaS" }
      },
      {
        quote: {
          es: "Migraron una app legacy de hace 8 años sin perder un solo usuario. Y el SEO subió.",
          en: "Migrated an 8-year-old legacy app without losing a single user. SEO actually went up.",
          ja: "8年もののレガシーアプリを、ユーザーを一人も失わずに移行。SEOはむしろ上がりました。"
        },
        name: "Pablo R.",
        role: { es: "Product lead · E-commerce", en: "Product lead · E-commerce", ja: "プロダクトリード · Eコマース" }
      }
    ]
  },

  about: {
    label: { es: "Nosotros", en: "About", ja: "私たち" },
    title: {
      es: "Un estudio pequeño que prefiere hacer pocas cosas bien.",
      en: "A small studio that prefers to do a few things well.",
      ja: "少数のことを丁寧にやる、小さなスタジオ。"
    },
    body: {
      es: "Somos un equipo reducido de gente que diseña y programa. Trabajamos con pocos clientes a la vez para poder meternos a fondo en cada proyecto. No subcontratamos. No usamos plantillas. No tenemos vendedores.",
      en: "We're a small team of people who design and code. We work with a few clients at a time so we can go deep on each one. We don't subcontract. We don't use templates. We don't have salespeople.",
      ja: "デザインとコードを書く少人数のチームです。各プロジェクトに深く入り込めるよう、同時に対応するクライアントを絞っています。外注なし、テンプレートなし、営業もいません。"
    },
    stats: [
      { n: "12+", label: { es: "Proyectos enviados", en: "Projects shipped", ja: "出荷プロジェクト" } },
      { n: "100%", label: { es: "Código a medida", en: "Custom code", ja: "カスタムコード" } },
      { n: "3", label: { es: "Idiomas que hablamos", en: "Languages we speak", ja: "話せる言語" } },
      { n: "0", label: { es: "Plantillas usadas", en: "Templates used", ja: "使ったテンプレート" } }
    ],
    teamLabel: {
      es: "El equipo",
      en: "The team",
      ja: "チーム"
    },
    teamSub: {
      es: "Pequeño a propósito. Cada persona toca el código, el diseño y al cliente.",
      en: "Small on purpose. Every person touches the code, the design, and the client.",
      ja: "意図して少人数。全員がコード、デザイン、クライアントに直接関わります。"
    },
    team: [
      {
        initials: "J",
        name: "Jesé Romero Arbelo",
        photoSerious: "/team/01-serious.jpg",
        photoFun: "/team/01-fun.jpg",
        photoFunOffsetY: -100,
        objectPositionSerious: "50% 50%",
        objectPositionFun: "50% 50%",
        role: {
          es: "Fundador · Swiss-stack developer",
          en: "Founder · Swiss-stack developer",
          ja: "創業者 · スイス・スタック開発者"
        },
        bio: {
          es: "Como una navaja suiza, pero con compilador: arquitectura, frontend, backend, DevOps y lo que haga falta. Fuera del editor toco el piano, juego con la gastronomía científica y leo física como otros leen novelas.",
          en: "Like a Swiss army knife with a compiler: architecture, frontend, backend, DevOps, and whatever the job needs. Off-keyboard he plays the piano, tinkers with scientific gastronomy and reads physics the way others read novels.",
          ja: "コンパイラ付きのスイスアーミーナイフのような存在。設計、フロント、バック、DevOps、必要なら何でも。仕事の外ではピアノを弾き、分子料理をいじり、物理を小説のように読みます。"
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
          "SEO"
        ]
      },
      {
        initials: "A",
        name: "Adrián Mujica González",
        photoSerious: "/team/02-serious.jpg",
        photoFun: "/team/02-fun.jpg",
        objectPositionSerious: "72% 35%",
        objectPositionFun: "55% 22%",
        role: {
          es: "Fundador · Arquitecto",
          en: "Founder · Architect",
          ja: "創業者 · アーキテクト"
        },
        bio: {
          es: "Diseña la arquitectura y se mete hasta la base de datos sin perder el sentido del ritmo. Es quien escucha la idea del cliente con el oído de músico — buscando la melodía detrás del brief — y la devuelve con una vuelta original que nadie había visto. Fuera del editor compone canciones y comparte casa con dos perros que tienen opinión sobre todo.",
          en: "Designs the architecture and dives all the way down to the database without losing his sense of rhythm. He's the one who listens to the client's idea like a musician — hunting the melody behind the brief — and hands it back with an original twist no one else had spotted. Off-keyboard he writes songs and shares a house with two dogs who have opinions on everything.",
          ja: "アーキテクチャを設計し、データベースの奥までリズム感を失わずに潜っていく人。クライアントの話を音楽家の耳で聴き — ブリーフの裏側にあるメロディーを探し — 誰も気づかなかったオリジナルなひねりを返します。仕事の外では曲を書き、何にでも意見のある犬2匹と暮らしています。"
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
          "Spring Boot"
        ]
      },
      {
        initials: "S",
        name: "Samuel Romero Arbelo",
        photoSerious: "/team/03-serious.jpg",
        photoFun: "/team/03-fun.jpg",
        objectPositionSerious: "75% 35%",
        objectPositionFun: "52% 22%",
        role: {
          es: "Full-stack · Aire fresco del estudio",
          en: "Full-stack · The studio's fresh air",
          ja: "フルスタック · スタジオの新しい風"
        },
        bio: {
          es: "Trastea con ordenadores desde crío y con anime desde antes incluso. Aparece con una idea que nadie había puesto sobre la mesa y de repente el proyecto respira distinto. Se deja la piel en cada feature y mantiene viva la curiosidad por enredarse con cualquier herramienta nueva.",
          en: "Tinkering with computers since he was a kid, and with anime since even earlier. Shows up with an idea no one had put on the table and suddenly the project breathes differently. Throws himself into every feature and keeps a wide-open curiosity for whatever tool is new.",
          ja: "子供の頃からコンピュータをいじり、それより前からアニメを見続けてきました。誰もテーブルに出していなかったアイデアを持ち込んで、プロジェクトの空気を一変させる存在。どんな機能にも全力で、新しい道具にはいつでも飛び込む好奇心を持っています。"
        },
        skills: [
          "HTML",
          "CSS",
          "JavaScript",
          "React",
          "Next.js",
          "Tailwind",
          "WordPress",
          "PHP",
          "MySQL",
          "Git"
        ]
      }
    ]
  },

  contact: {
    label: { es: "Contacto", en: "Contact", ja: "お問い合わせ" },
    title: {
      es: "¿Empezamos algo?",
      en: "Shall we start something?",
      ja: "何か始めませんか？"
    },
    body: {
      es: "Cuéntanos en dos líneas qué tienes en mente. Respondemos en menos de 24h con preguntas, ideas o un plan.",
      en: "Tell us in two lines what you have in mind. We reply within 24h with questions, ideas, or a plan.",
      ja: "考えていることを2行でお聞かせください。24時間以内に質問・アイデア・計画でお返事します。"
    },
    fields: {
      name: { es: "Tu nombre", en: "Your name", ja: "お名前" },
      email: { es: "Tu email", en: "Your email", ja: "メールアドレス" },
      budget: { es: "Presupuesto aproximado", en: "Rough budget", ja: "おおよその予算" },
      message: { es: "Cuéntanos la idea", en: "Tell us the idea", ja: "アイデアをどうぞ" },
      send: { es: "Enviar →", en: "Send it →", ja: "送信 →" }
    },
    budgets: {
      es: ["< 1.000€", "1.000 – 5.000€", "5.000 – 15.000€", "15.000€ +", "Aún no lo sé"],
      en: ["< €1,000", "€1,000 – 5,000", "€5,000 – 15,000", "€15,000 +", "Not sure yet"],
      ja: ["1,000€未満", "1,000〜5,000€", "5,000〜15,000€", "15,000€以上", "まだ未定"]
    },
    or: { es: "o escríbenos a", en: "or email us at", ja: "またはメールで" }
  },

  footer: {
    rights: {
      es: "© 2026 Kimox Studio · Hecho a mano en España",
      en: "© 2026 Kimox Studio · Handcrafted in Spain",
      ja: "© 2026 Kimox Studio · スペインで手作り"
    },
    backToTop: { es: "Volver arriba ↑", en: "Back to top ↑", ja: "トップへ ↑" }
  }
};
