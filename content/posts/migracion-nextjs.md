---
slug: "migracion-nextjs"
date: "2026-05-12"
read_time: "8 min"
glyph: "N→"
featured: true
category:
  es: "Desarrollo"
  en: "Development"
  ja: "開発"
title:
  es: "Cómo migramos una app de 8 años a Next.js sin perder un usuario."
  en: "How we migrated an 8-year-old app to Next.js without losing a single user."
  ja: "8年もののアプリをNext.jsにユーザーを失わず移行した方法。"
excerpt:
  es: "Un caso real de migración progresiva: rutas espejo, redirecciones 301 inteligentes y por qué el SEO no solo no bajó, sino que subió un 18%."
  en: "A real progressive migration case: mirror routes, smart 301 redirects, and why SEO didn't just hold — it climbed 18%."
  ja: "実例による段階的移行: ミラールート、スマートな301リダイレクト、そしてSEOが落ちなかっただけでなく18%上昇した理由。"
body:
  es: |
    El punto de partida era un monolito de unos 120.000 LOC: backend en PHP sobre CodeIgniter 2, una capa intermedia en Express que se añadió cuatro años después para servir endpoints JSON, y un frontend con jQuery, Handlebars y bundles que nadie se atrevía a tocar. Ocho años de parches, dos refactors abortados y una documentación que terminaba en 2019. El tráfico orgánico seguía siendo decente y eso era, paradójicamente, el mayor problema: cualquier movimiento en falso costaba sesiones reales.

    Elegimos Next.js por tres razones concretas, no por moda. Primero, queríamos mantener SSR para no comernos un bajón de SEO durante la transición. Segundo, el equipo ya escribía TypeScript en otros proyectos y el ecosistema de React era el menor de los costes de aprendizaje. Tercero, el App Router nos permitía mover rutas una a una sin reescribir la app entera de golpe, que era la condición innegociable del cliente.

    La estrategia se llamó internamente "rutas espejo". Levantamos la app de Next.js en el mismo dominio detrás de un reverse proxy en Nginx, con reglas que decidían ruta por ruta si la petición iba al monolito antiguo o al nuevo. Así pudimos liberar secciones pequeñas (primero el blog, luego el listado de productos, después el checkout) sin tocar el resto. Durante meses convivieron las dos aplicaciones en producción, compartiendo sesión vía cookies firmadas y un endpoint común de autenticación.

    1. Auditoría con Screaming Frog: rastreamos 47.000 URLs y las agrupamos en unos 180 clusters por URL canónica.
    2. Mapa de 301: cada cluster antiguo apuntaba a una sola URL nueva, evitando cadenas de redirecciones. Lo gestionamos en un CSV versionado y un middleware que lo cargaba al arrancar.
    3. Sitemap fusionado: generamos un sitemap.xml único que combinaba rutas viejas (las que aún no habíamos migrado) y nuevas, y lo enviamos a Search Console antes de cada release.

    Las imágenes fueron un capítulo aparte. Servíamos casi 400 GB desde un bucket S3 sin CDN delante. Movimos todo a un CDN con transformaciones on-the-fly, reescribimos los `<img>` para usar `next/image` con tamaños responsive y aspect-ratio explícito, y de paso eliminamos unos 12.000 archivos huérfanos. El LCP medio bajó de 4,1 s a 1,3 s.

    El SEO subió un 18% en los seis meses posteriores al corte final, y no fue magia. Fueron Core Web Vitals decentes por primera vez, datos estructurados (Article, Product, BreadcrumbList) que el monolito nunca había tenido, y URLs limpias sin parámetros heredados. Google premió lo obvio.

    Fuimos tres personas durante cuatro meses: dos en frontend y migración de rutas, una en infraestructura y proxy. Lo que haríamos distinto la próxima vez: empezar por el sitemap y los 301 antes de escribir una sola línea de Next.js, y montar tests de regresión visuales desde el día uno. Nos ahorrarían dos semanas largas de retoques al final.
  en: |
    The starting point was a monolith of roughly 120,000 LOC: a PHP backend on CodeIgniter 2, a middle Express layer added four years later to serve JSON endpoints, and a frontend held together with jQuery, Handlebars and bundles nobody dared touch. Eight years of patches, two aborted refactors and documentation that trailed off somewhere in 2019. Organic traffic was still decent, and that was, paradoxically, the bigger problem: every wrong move would cost real sessions.

    We chose Next.js for three concrete reasons, not because it was fashionable. First, we wanted to keep SSR so we wouldn't take an SEO hit during the transition. Second, the team already wrote TypeScript on other projects and React's ecosystem was the smallest learning cost on the table. Third, the App Router let us move routes one at a time without rewriting the whole app in a single push, which was the client's non-negotiable.

    We called the strategy "mirror routes" internally. We stood up the Next.js app on the same domain behind an Nginx reverse proxy, with rules that decided per route whether a request hit the old monolith or the new one. That let us release small sections (the blog first, then the product list, then checkout) without touching anything else. For months the two apps lived together in production, sharing sessions via signed cookies and a shared auth endpoint.

    1. Audit with Screaming Frog: we crawled 47,000 URLs and grouped them into about 180 clusters by canonical URL.
    2. 301 map: each old cluster pointed to a single new URL, avoiding redirect chains. We kept it in a versioned CSV and a middleware that loaded it at boot.
    3. Merged sitemap: we generated one sitemap.xml combining old routes (those not yet migrated) and new ones, and submitted it to Search Console before every release.

    Images were their own chapter. We were serving almost 400 GB straight from an S3 bucket with no CDN in front. We moved everything to a CDN with on-the-fly transformations, rewrote `<img>` tags to use `next/image` with responsive sizes and explicit aspect ratios, and dropped roughly 12,000 orphan files along the way. Average LCP went from 4.1 s to 1.3 s.

    SEO climbed 18% in the six months after the final cutover, and it wasn't magic. It was decent Core Web Vitals for the first time, structured data (Article, Product, BreadcrumbList) the monolith never had, and clean URLs without inherited query parameters. Google rewarded the obvious.

    We were three people across four months: two on frontend and route migration, one on infrastructure and proxy. What we'd do differently next time: start with the sitemap and the 301s before writing a single line of Next.js, and set up visual regression tests from day one. That would have saved us two long weeks of polish at the end.
  ja: |
    出発点はおよそ12万行のモノリスでした。CodeIgniter 2上のPHPバックエンド、4年後にJSONエンドポイント用に追加されたExpressの中間層、そしてjQueryとHandlebarsと誰も触りたがらないバンドルで支えられたフロントエンド。8年分のパッチ、中断された2回のリファクタ、そして2019年のどこかで途切れたドキュメント。それでもオーガニックトラフィックはまだそれなりに健全で、それが逆に最大の問題でした。一手間違えれば実際のセッションが失われ、収益も同時に落ちます。私たちが受け取ったのは、動いてはいるが触ると壊れる、典型的なレガシーでした。

    Next.jsを選んだ理由は流行ではなく、具体的に三つあります。第一に、移行中にSEOを落とさないためSSRを維持したかった。第二に、チームは他のプロジェクトで既にTypeScriptを書いており、Reactのエコシステムは机上にあった選択肢の中で学習コストが最小でした。第三に、App Routerならルートを一つずつ移行でき、アプリ全体を一度に書き直す必要がない。これがクライアントの譲れない条件であり、私たちが守りきった約束でもあります。

    社内ではこの戦略を「ミラールート」と呼びました。Nginxのリバースプロキシの背後、同一ドメイン上にNext.jsアプリを立ち上げ、リクエストごとに旧モノリスへ送るか新アプリへ送るかを判定するルールを設定しました。これで小さなセクション(まずブログ、次に商品一覧、最後にチェックアウト)を他に触れずに順番にリリースできました。数か月のあいだ、二つのアプリは署名付きクッキーと共通の認証エンドポイントを通じてセッションを共有しながら本番に共存していました。ユーザーには切り替えが見えず、それが目的でした。

    1. Screaming Frogによる監査: 47,000のURLをクロールし、正規URLごとに約180のクラスタへグループ化しました。
    2. 301マップ: 旧クラスタはそれぞれ単一の新URLに向け、リダイレクトチェーンを避けました。バージョン管理されたCSVと、起動時にそれを読み込むミドルウェアで運用しました。
    3. サイトマップの統合: 未移行の旧ルートと新ルートを統合した単一のsitemap.xmlを生成し、各リリース前にSearch Consoleへ送信しました。

    画像はそれだけで別の章でした。CDNを挟まずS3バケットから直接、約400GBを配信していました。すべてをオンザフライ変換に対応したCDNへ移し、`<img>`タグを`next/image`に書き換えてレスポンシブサイズと明示的なアスペクト比を指定し、ついでに約12,000の孤立ファイルを削除しました。平均LCPは4.1秒から1.3秒に下がり、これだけでもユーザー体験は別物になりました。

    最終切り替え後の6か月でSEOは18%上昇しましたが、魔法ではありません。初めてまともになったCore Web Vitals、モノリスには一度もなかった構造化データ(Article、Product、BreadcrumbList)、継承された不要なクエリパラメータのないクリーンなURL。Googleは当たり前のことに報いただけです。私たちは新機能ではなく、長年放置されてきた基礎を整えました。

    体制は3人で4か月。フロントエンドとルート移行に2人、インフラとプロキシに1人。次に同じことをやるなら、Next.jsを一行も書く前にサイトマップと301マップから着手し、初日からビジュアル回帰テストを用意します。終盤の調整に費やした長い2週間が省けたはずで、それが今回いちばん高くついた教訓です。
---
