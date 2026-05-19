---
slug: "seo-tecnico-saas"
date: "2026-04-28"
read_time: "5 min"
glyph: "SEO"
featured: false
category:
  es: "SEO"
  en: "SEO"
  ja: "SEO"
title:
  es: "SEO técnico para SaaS: 12 cosas que ningún plugin te va a hacer."
  en: "Technical SEO for SaaS: 12 things no plugin is going to do for you."
  ja: "SaaS向けテクニカルSEO: プラグインではできない12のこと。"
excerpt:
  es: "El SEO no es marketing pegado al final. Es arquitectura. Aquí van las decisiones que tomamos antes de la primera línea de código."
  en: "SEO isn't marketing bolted on at the end. It's architecture. Here are the decisions we make before line one of code."
  ja: "SEOは後付けのマーケティングではなく、アーキテクチャです。最初の1行を書く前の判断を紹介します。"
body:
  es: |
    El SEO técnico de un SaaS no se arregla instalando un plugin la semana antes del lanzamiento. Se decide en la pizarra, cuando todavía estamos discutiendo si una ruta es pública o vive detrás del login. Nosotros tratamos el SEO como una capa de arquitectura: si la base está torcida, ninguna meta-description te va a salvar. Aquí van las doce cosas que revisamos antes, durante y después de escribir la primera línea de código.

    Indexabilidad y rastreo:

    1. Elegimos la estrategia de renderizado caso por caso: SSR para páginas que cambian con el usuario, SSG para landings y contenido estático, ISR cuando hay un volumen que invalida regenerar todo en cada deploy.
    2. Tratamos los parámetros de query como ciudadanos de segunda: canonical tag apuntando a la URL limpia siempre que `?utm`, `?ref` o filtros de tabla no cambien el contenido real.
    3. Separamos lo que no debe rastrearse de lo que no debe indexarse: `robots.txt` para ahorrar presupuesto de rastreo en `/api`, `/admin` o assets, y `noindex` en headers HTTP para páginas que sí queremos que Google visite pero no muestre.
    4. Convertimos los 404 huérfanos con tráfico real en 410 cuando la URL no va a volver, y en 301 cuando hay un equivalente claro; dejar 404 indefinidos es regalar señal negativa.

    Rendimiento y arquitectura de contenido:

    5. Medimos Web Vitals con RUM real (CrUX, no PageSpeed en laboratorio): LCP, INP y CLS sobre usuarios de verdad, no sobre un emulador de Lighthouse corriendo en un servidor de Mountain View.
    6. Construimos la jerarquía de URLs como un árbol de información: `/producto/feature` y `/docs/concepto/api` son contratos con el rastreador, no slugs aleatorios.
    7. Diseñamos el enlazado interno antes que el contenido: páginas pilar, clusters temáticos y un máximo de tres clics desde home a cualquier hoja relevante.
    8. Generamos `sitemap.xml` con `lastmod` real desde la fuente de datos, no con la fecha del último deploy; Google lo usa para priorizar el re-rastreo.

    Datos estructurados y multilingüe:

    9. Añadimos JSON-LD desde el primer commit: `SoftwareApplication` para el producto, `Organization` para la marca, `FAQPage` en los docs de soporte y `BreadcrumbList` en cada ruta anidada.
    10. Para multi-locale usamos `hreflang` con `x-default`, URLs por idioma (no banderas con JavaScript) y nos aseguramos de que la versión `en` enlaza a la `es` y viceversa, sin huérfanas.

    Monitorización:

    11. Analizamos los logs del servidor con GoAccess o Botify para ver qué visita Googlebot de verdad: no nos fiamos solo de Search Console, que llega tarde y agregado.
    12. Montamos alertas sobre cambios bruscos en clicks, impresiones y CWV por plantilla, no por URL: una regresión en el layout de blog se detecta antes si miramos el agregado del template.

    Nada de esto requiere un plugin. Requiere decidir en frío, dejarlo documentado y revisarlo cada trimestre como revisamos la seguridad o las dependencias. El SEO técnico es la parte aburrida que separa un SaaS que crece orgánicamente de uno que depende para siempre del ads spend. Lo construimos como construimos el resto: como infraestructura.
  en: |
    Technical SEO for a SaaS doesn't get fixed by installing a plugin the week before launch. It gets decided on the whiteboard, while we're still arguing whether a route is public or lives behind auth. We treat SEO as an architectural layer: if the foundation is crooked, no meta-description will save you. Here are the twelve things we review before, during, and after the first line of code.

    Indexability and crawl:

    1. We pick the rendering strategy case by case: SSR for pages that change per user, SSG for landings and static content, ISR when the volume makes full regeneration on every deploy a waste.
    2. We treat query parameters as second-class citizens: canonical tag pointing to the clean URL whenever `?utm`, `?ref` or table filters don't actually change the content.
    3. We separate what should not be crawled from what should not be indexed: `robots.txt` to save crawl budget on `/api`, `/admin` or assets, and `noindex` via HTTP headers for pages we want Google to visit but not display.
    4. We turn orphan 404s with real traffic into 410s when the URL is gone for good, and 301s when a clear equivalent exists; leaving indefinite 404s is gifting negative signal.

    Performance and content architecture:

    5. We measure Web Vitals with real RUM (CrUX, not lab PageSpeed): LCP, INP and CLS on actual users, not on a Lighthouse emulator running on a Mountain View server.
    6. We design URL hierarchies as information trees: `/product/feature` and `/docs/concept/api` are contracts with the crawler, not random slugs.
    7. We plan internal linking before writing content: pillar pages, topical clusters, and a maximum of three clicks from home to any relevant leaf.
    8. We generate `sitemap.xml` with real `lastmod` pulled from the data source, not from the last deploy timestamp; Google uses it to prioritize re-crawling.

    Structured data and multilingual:

    9. We add JSON-LD from the first commit: `SoftwareApplication` for the product, `Organization` for the brand, `FAQPage` in support docs and `BreadcrumbList` on every nested route.
    10. For multi-locale we use `hreflang` with `x-default`, URLs per language (not flags toggled by JavaScript), and we make sure the `en` version links to `es` and vice versa, with no orphans.

    Monitoring:

    11. We analyze server logs with GoAccess or Botify to see what Googlebot actually visits: we don't rely solely on Search Console, which arrives late and aggregated.
    12. We set alerts on sudden changes in clicks, impressions and CWV per template, not per URL: a regression in the blog layout is caught faster by watching the template aggregate.

    None of this requires a plugin. It requires deciding in cold blood, documenting it, and reviewing it every quarter the same way we review security or dependencies. Technical SEO is the boring part that separates a SaaS growing organically from one that depends forever on ad spend. We build it the way we build the rest: as infrastructure.
  ja: |
    SaaSのテクニカルSEOは、ローンチ前週にプラグインを入れて解決するものではありません。ルートを公開にするかログイン配下に置くかを議論している段階、つまりホワイトボードの上で決まります。私たちはSEOをアーキテクチャの一層として扱います。土台が歪んでいれば、どんなmeta descriptionも助けにはなりません。コードの一行目を書く前後で確認している12項目を紹介します。

    インデックス可能性とクロール:

    1. レンダリング戦略はケースバイケースで選びます。ユーザーごとに変わるページはSSR、ランディングと静的コンテンツはSSG、デプロイごとに全再生成するのが無駄な規模ではISRを使います。
    2. クエリパラメータは二級市民として扱います。`?utm`や`?ref`、テーブルのフィルタが実際のコンテンツを変えない場合は、必ずクリーンURLを指すcanonicalタグを置きます。
    3. クロールされたくないものとインデックスされたくないものを分けます。`/api`、`/admin`、アセットなどクロール予算を節約したい場所には`robots.txt`、Googleには訪問させても表示させたくないページにはHTTPヘッダの`noindex`を使います。
    4. 実トラフィックのある孤立404は、URLが戻らないなら410へ、明確な代替があるなら301へ変換します。曖昧な404を放置するのは負のシグナルを贈っているのと同じです。

    パフォーマンスとコンテンツ設計:

    5. Web Vitalsは実RUM、つまりCrUXで測ります。Mountain Viewのサーバ上で動くLighthouseエミュレータではなく、実ユーザのLCP、INP、CLSを見ます。
    6. URL階層は情報の木として設計します。`/product/feature`や`/docs/concept/api`はクローラとの契約であり、ランダムなslugではありません。
    7. 内部リンクはコンテンツより先に設計します。柱ページ、トピッククラスタ、そしてホームから関連リーフまで最大3クリックです。
    8. `sitemap.xml`はデプロイ日時ではなく、データソースから取得した実際の`lastmod`で生成します。Googleはこれを再クロールの優先度判断に使います。

    構造化データと多言語:

    9. 最初のコミットからJSON-LDを入れます。製品には`SoftwareApplication`、ブランドには`Organization`、サポートドキュメントには`FAQPage`、ネストされた全ルートに`BreadcrumbList`を置きます。
    10. 多言語対応では`hreflang`を`x-default`付きで使い、JavaScriptで切り替える国旗ではなく言語ごとのURLを用意し、`en`版が`es`版にリンクし、その逆も成り立つように、孤児を作らないことを徹底します。

    モニタリング:

    11. サーバログをGoAccessやBotifyで分析し、Googlebotが実際に何を訪れているかを確認します。遅れて集計されるSearch Consoleだけに依存しません。
    12. クリック、表示回数、CWVの急変は、URL単位ではなくテンプレート単位でアラートを設定します。ブログレイアウトのリグレッションは、テンプレート集計を見ていれば早く検知できます。

    どれもプラグインを必要としません。必要なのは冷静に判断し、文書化し、セキュリティや依存関係と同じ頻度で四半期ごとに見直すことです。テクニカルSEOは、有機的に伸びるSaaSと、永遠に広告費に依存するSaaSを分ける退屈な部分です。私たちは他のすべてと同じく、これをインフラとして構築します。
---
