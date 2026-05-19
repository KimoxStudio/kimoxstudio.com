---
slug: "wordpress-headless"
date: "2026-02-22"
read_time: "11 min"
glyph: "↗"
featured: false
category:
  es: "Migraciones"
  en: "Migrations"
  ja: "移行"
title:
  es: "WordPress → headless: la migración paso a paso con menos drama."
  en: "WordPress → headless: the step-by-step migration with least drama."
  ja: "WordPress → ヘッドレス: 最もドラマの少ない段階的移行手順。"
excerpt:
  es: "Una receta completa para sacar contenido de WordPress sin romperlo: exportación, mapeo de URLs, imágenes, y un periodo en paralelo."
  en: "A full recipe for getting content out of WordPress without breaking it: export, URL mapping, images, and a parallel period."
  ja: "WordPressからコンテンツを壊さず取り出す完全レシピ: エクスポート、URLマッピング、画像、並行運用期間。"
body:
  es: |
    Los equipos llegan a esta decisión por tres razones que se repiten: el editor de WordPress va lento incluso en servidores decentes, el panel está saturado de plugins que nadie recuerda haber instalado, y las Core Web Vitals no mejoran por mucho que se cambie de tema. Migrar a una arquitectura headless no es una bala de plata, pero sí devuelve control sobre el rendimiento, la seguridad y el flujo editorial. Lo que sigue es la receta que aplicamos cuando un cliente nos pide salir de WordPress sin perder posiciones en buscadores ni meses de trabajo de redacción.

    1) Auditoría. Antes de tocar nada, inventariamos todo: tipos de contenido (posts, páginas, custom post types), campos personalizados (ACF, Meta Box), taxonomías, shortcodes generados por plugins, número total de entradas y el reparto por autor. Si hay 12.000 posts y la mitad usa un shortcode de un plugin descontinuado, eso condiciona el plan. Documentamos cada uno en una hoja con su recuento y su destino en el nuevo sistema.

    2) Elegir stack. Para sitios con redacción frecuente y varios autores recomendamos Next.js con un CMS headless tipo Sanity o Contentful. Para blogs técnicos con uno o dos editores, Markdown estático más Decap CMS es más barato, más rápido y se versiona en Git. La regla práctica: si los editores no son técnicos y publican a diario, paga el CMS; si son devs o publican semanalmente, basta con MD.

    3) Exportación. Usamos la WP REST API para extraer JSON limpio o WXR cuando hay que conservar metadatos. Los puntos de dolor habituales son tres: los IDs de adjuntos en el contenido, los shortcodes de oEmbed que sólo WordPress resuelve, y el JSON de bloques Gutenberg que viene mezclado con HTML. Escribimos un transformador que normaliza todo a Markdown o al esquema del CMS de destino.

    4) Mapa de URLs. Listamos cada URL pública del sitio actual, decidimos cuál es la canónica en el nuevo, y preparamos el plan de redirecciones 301. Sin este paso se pierde tráfico orgánico durante meses. El mapa va a un CSV con tres columnas: origen, destino y código de respuesta esperado.

    5) Medios. Las imágenes pueden quedarse en wp-content/uploads detrás de una redirección, o moverse a S3 o Cloudflare R2 reescribiendo los srcset. Si el sitio supera unos cientos de megas, mejor mover y servir desde CDN: la mejora en LCP suele ser inmediata.

    6) Periodo en paralelo. Levantamos el nuevo sitio en staging.dominio.com con robots.txt en noindex, damos acceso a los editores y dejamos que prueben durante dos o tres semanas. Es el momento de cazar bugs sin presión.

    7) Cutover. Cambiamos el DNS en una franja de bajo tráfico, validamos el sitemap nuevo en Search Console y solicitamos reindexación. Las primeras 48 horas vigilamos rastreo y errores 404 con detalle.

    8) Formación editorial. Hacemos una sesión grabada con el nuevo CMS, documentamos el flujo en un README dentro del repo o en Notion y dejamos contactos claros para soporte.

    Lo que no migramos: hilos de comentarios de hace diez años, páginas de categorías vacías y enlaces de afiliados rotos. Es la mejor oportunidad para tirar lo que no aporta.

  en: |
    Teams reach this decision for three recurring reasons: the WordPress editor feels slow even on decent hosting, the admin is buried under plugins nobody remembers installing, and Core Web Vitals refuse to improve no matter how many themes are tried. Moving to a headless architecture is not a silver bullet, but it returns control over performance, security, and the editorial flow. What follows is the recipe we apply when a client asks us to leave WordPress without losing search rankings or months of editorial work.

    1) Audit. Before touching anything, we inventory everything: content types (posts, pages, custom post types), custom fields (ACF, Meta Box), taxonomies, plugin-generated shortcodes, total post count, and the split per author. If there are 12,000 posts and half use a shortcode from a discontinued plugin, that shapes the plan. We document each item in a sheet with its count and its destination in the new system.

    2) Pick the stack. For sites with frequent publishing and several authors we recommend Next.js with a headless CMS such as Sanity or Contentful. For technical blogs with one or two editors, static Markdown plus Decap CMS is cheaper, faster, and versioned in Git. The rule of thumb: if editors are non-technical and publish daily, pay for the CMS; if they are developers or publish weekly, plain MD is enough.

    3) Export. We use the WP REST API to pull clean JSON, or WXR when metadata must be preserved. The usual pain points are three: attachment IDs embedded in content, oEmbed shortcodes that only WordPress resolves, and Gutenberg block JSON mixed with raw HTML. We write a transformer that normalises everything to Markdown or to the target CMS schema.

    4) URL map. We list every public URL of the current site, decide which one is canonical in the new site, and prepare the 301 plan. Skipping this step means losing organic traffic for months. The map lives in a CSV with three columns: source, destination, expected status code.

    5) Media. Images can stay in wp-content/uploads behind a redirect, or move to S3 or Cloudflare R2 with rewritten srcsets. If the site exceeds a few hundred megabytes, moving to a CDN is the right call: the LCP improvement is usually immediate.

    6) Parallel period. We bring the new site up at staging.domain.com with robots.txt set to noindex, give editors access, and let them test for two or three weeks. This is the time to hunt bugs without pressure.

    7) Cutover. We flip DNS during a low-traffic window, validate the new sitemap in Search Console, and request reindexing. For the first 48 hours we watch crawl stats and 404 errors closely.

    8) Editor training. We run a recorded session with the new CMS, document the flow in a README inside the repo or in Notion, and leave clear contacts for support.

    What we do not migrate: comment threads from ten years ago, empty category pages, and broken affiliate links. A migration is the best opportunity to throw out what no longer earns its place.

  ja: |
    チームがこの決断に至る理由は三つに集約されます。まともなホスティングでもWordPressのエディタが遅い、誰がインストールしたか分からないプラグインで管理画面が膨れ上がっている、テーマを変えてもCore Web Vitalsが改善しない。ヘッドレス構成への移行は万能薬ではありませんが、パフォーマンス、セキュリティ、編集フローのコントロールを取り戻せます。以下は、検索順位や数ヶ月分の編集作業を失わずにWordPressから離れたいというクライアントに対して、私たちが適用しているレシピです。早すぎる最適化や全面書き換えの誘惑を避け、段階的に進めることが重要です。

    1) 監査。何も触る前に全てを棚卸しします。コンテンツタイプ(投稿、固定ページ、カスタム投稿タイプ)、カスタムフィールド(ACF、Meta Box)、タクソノミー、プラグイン由来のショートコード、総投稿数、著者別の内訳をすべて確認します。1万2千件の投稿のうち半分が廃止されたプラグインのショートコードを使っているなら、計画はそれに左右されます。各項目を件数と新システムでの行き先と一緒にスプレッドシートに記録し、関係者全員で共有します。この棚卸しが移行の地図になります。

    2) スタック選定。頻繁に更新し著者が複数いるサイトには、Next.jsとSanityやContentfulのようなヘッドレスCMSを推奨します。編集者が一人か二人の技術ブログなら、静的MarkdownとDecap CMSの方が安く、速く、Gitでバージョン管理できます。経験則として、編集者が非技術者で毎日公開するならCMSに投資し、開発者か週次更新ならMDで十分です。レンダリングはNext.jsのISRかAstroの静的書き出しが定番で、サイトの更新頻度で選びます。

    3) エクスポート。クリーンなJSONを得るためにWP REST APIを使い、メタデータを保持する必要があればWXRを使います。よく出る痛点は三つあります。本文に埋め込まれた添付ファイルID、WordPressだけが解決するoEmbedショートコード、生HTMLと混在するGutenbergブロックのJSON。これらをMarkdownや移行先のCMSスキーマに正規化するトランスフォーマーをNodeで書き、テストデータで動作確認してから全件に流します。

    4) URLマップ。現行サイトの公開URLをすべて列挙し、新サイトでの正規URLを決め、301リダイレクト計画を作ります。ここを飛ばすと数ヶ月分のオーガニックトラフィックを失います。マップは元、先、想定ステータスコードの三列のCSVで管理し、CDNやNext.jsのリダイレクト設定に流し込めるようにしておきます。古いカテゴリやタグのページも忘れずに含めます。

    5) メディア。画像はwp-content/uploadsにリダイレクト経由で残すか、S3やCloudflare R2に移してsrcsetを書き換えます。数百MBを超えるサイトはCDNへの移行が正解で、LCPの改善はほぼ即時に現れます。next/imageやastro:assetsで再最適化する場合は、AVIFとWebPの両方を用意し、古いブラウザにはJPEGをフォールバックします。

    6) 並行運用期間。staging.domain.comに新サイトを立てrobots.txtでnoindex指定、編集者にアクセス権を渡し、二、三週間テストしてもらいます。プレッシャーなくバグを潰せる貴重な時間です。プレビュー機能、画像アップロード、下書き保存、公開ワークフローを実際の記事で試し、フィードバックを集めて反映します。

    7) カットオーバー。低トラフィックの時間帯にDNSを切り替え、新しいサイトマップをSearch Consoleで検証し、再インデックスを依頼します。最初の48時間はクロール統計と404エラーを注意深く監視し、漏れたリダイレクトを即座に追加します。古いドメインのキャッシュTTLは事前に短くしておくと切り替えがスムーズです。

    8) 編集者トレーニング。新CMSのセッションを録画し、リポジトリ内のREADMEかNotionにフローを文書化し、サポート連絡先を明示します。最初の二週間は質問が集中するので、専用のチャットチャンネルを開けておくと安心です。

    移行しないもの。10年前のコメントスレッド、空のカテゴリページ、壊れたアフィリエイトリンク、誰も読んでいない古いお知らせ。移行は、もはや席を占める価値のないものを捨てる最良の機会です。残すか捨てるかの判断基準はシンプルで、過去12ヶ月で訪問があり、現在のサービス内容と矛盾しないものだけを連れて行きます。
---
