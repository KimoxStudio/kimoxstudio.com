---
slug: "postgres-vs-mongo"
date: "2026-02-06"
read_time: "7 min"
glyph: "DB"
featured: false
category:
  es: "Desarrollo"
  en: "Development"
  ja: "開発"
title:
  es: "Postgres antes que Mongo: por qué (casi) siempre."
  en: "Postgres before Mongo: why (almost) always."
  ja: "MongoよりPostgres: ほぼ常にそうする理由。"
excerpt:
  es: "JSONB, arrays, full-text search, generated columns. Postgres es básicamente un Mongo con álgebra relacional. Cuándo elegir cada uno."
  en: "JSONB, arrays, full-text search, generated columns. Postgres is essentially Mongo with relational algebra. When to pick each."
  ja: "JSONB、配列、全文検索、生成カラム。Postgresは実質「関係代数付きMongo」です。使い分けの基準。"
body:
  es: |
    Hemos visto la misma escena demasiadas veces. Un equipo arranca un proyecto, alguien dice "empecemos con Mongo porque todavía no sabemos cómo serán los datos", y dieciocho meses después estamos reescribiendo migraciones a mano, validando tipos en código de aplicación, y descubriendo que tres servicios distintos guardan el mismo cliente con tres formas distintas. El argumento del "schemaless" casi nunca es una ventaja real: es deuda diferida con intereses altos. La forma de los datos siempre existe; lo único que decides es si vive en el motor o en la cabeza de quien escribió el último endpoint.

    Nuestra postura es simple: empezamos con Postgres salvo que tengamos una razón muy concreta para no hacerlo. Y la razón concreta rara vez aparece.

    Postgres tiene JSONB desde hace más de una década, y sus operadores cubren prácticamente todo lo que harías en Mongo. El operador `->` extrae un campo manteniéndolo como JSON, `->>` lo extrae como texto, `@>` pregunta si un documento contiene a otro, y `jsonb_path_exists` evalúa expresiones JSONPath completas. Una tabla típica nuestra mezcla columnas tipadas con una columna `metadata jsonb`: el `id`, el `email`, el `created_at` viven como columnas reales con sus constraints, y todo lo verdaderamente variable, los flags por cliente, la configuración de UI, las preferencias raras, va al JSONB con un índice GIN encima. Tienes lo mejor de ambos mundos sin renunciar a integridad referencial.

    Los arrays nativos son otro recurso infravalorado. Cuando una entidad tiene una lista corta y acotada de etiquetas, roles, o IDs relacionados que casi siempre lees junto con la fila, un `text[]` o `uuid[]` con `unnest` y `ANY` rinde mejor que una tabla de unión y deja el modelo más legible. No siempre, claro: si necesitas atributos sobre la relación, vuelves a la tabla de unión. Pero la regla "todo relación N:M es una tabla nueva" es dogma, no ingeniería.

    El full-text search es donde Postgres se separa de verdad. `tsvector` con diccionarios por idioma, combinado con `pg_trgm` para similitud por trigramas, resuelve búsquedas en español, catalán, francés, alemán o italiano con stemming y tolerancia a errores tipográficos que el índice de texto de Mongo simplemente no alcanza. Para europeos con tildes, eñes y composición germánica, esto no es un detalle: es la diferencia entre una búsqueda usable y una que el cliente abandona.

    Encima ponemos generated columns. Una columna `search tsvector GENERATED ALWAYS AS (to_tsvector('spanish', coalesce(title,'') || ' ' || coalesce(body,''))) STORED` con un GIN encima nos da búsqueda instantánea sin triggers, sin lógica en aplicación, sin oportunidad de que se desincronice.

    Las transacciones multi-documento existen en Mongo desde hace años, pero siguen siendo torpes: requieren replica set, tienen límites de tiempo más agresivos, y la API es incómoda. En Postgres una transacción es una transacción y abarca todo lo que toques. Cuando el dominio tiene invariantes que cruzan entidades, y casi todos los dominios reales los tienen, esto importa.

    La realidad operativa cierra el caso. Point-in-time recovery con WAL, replicación lógica para mover datos entre versiones sin downtime, extensiones maduras, y ORMs como Prisma, Drizzle o SQLAlchemy que llevan años puliéndose. El ecosistema de Mongo es bueno, pero el de Postgres es más profundo y más antiguo.

    CUÁNDO MONGO GANA DE VERDAD. No estamos diciendo que Mongo no sirva. Sirve, y bien, en escenarios concretos: documentos con formas profundamente variables donde cada uno es genuinamente distinto, como el historial de borradores de un CMS donde cada versión puede tener una estructura propia; cargas write-heavy de series temporales con TTL automático donde la simplicidad de inserción importa más que las queries complejas; o cuando el resto de la organización ya corre sobre Mongo y la coherencia operativa pesa más que la elección técnica óptima.

    Los esquemas no son burocracia. Son la forma más barata de documentación que existe. Cada columna con su tipo y su constraint es una frase que no tienes que escribir en un wiki que nadie lee. Empezar sin esquema no te ahorra trabajo; te lo aplaza y te lo cobra con intereses cuando el equipo ya es el doble de grande y nadie recuerda por qué ese campo a veces es string y a veces array.

  en: |
    We have watched the same scene play out too many times. A team kicks off a project, someone says "let's start with Mongo because we don't know yet what the data will look like," and eighteen months later we are hand-writing migrations, validating types in application code, and discovering that three different services store the same customer in three different shapes. The "schemaless" argument is almost never a real advantage: it is deferred debt at a high interest rate. The shape of your data always exists; the only thing you choose is whether it lives in the engine or in the head of whoever wrote the last endpoint.

    Our stance is simple: we start with Postgres unless we have a very specific reason not to. And that specific reason rarely shows up.

    Postgres has had JSONB for over a decade, and its operators cover practically everything you would do in Mongo. The `->` operator extracts a field as JSON, `->>` extracts it as text, `@>` asks whether one document contains another, and `jsonb_path_exists` evaluates full JSONPath expressions. A typical table of ours mixes typed columns with a `metadata jsonb` column: the `id`, the `email`, the `created_at` live as real columns with their constraints, and everything genuinely variable, per-tenant flags, UI configuration, weird preferences, goes into JSONB with a GIN index on top. You get the best of both worlds without giving up referential integrity.

    Native arrays are another underrated feature. When an entity has a short, bounded list of tags, roles, or related IDs that you almost always read along with the row, a `text[]` or `uuid[]` with `unnest` and `ANY` performs better than a join table and keeps the model more readable. Not always, of course: if you need attributes on the relationship itself, you go back to the join table. But the rule "every N:M relationship is a new table" is dogma, not engineering.

    Full-text search is where Postgres really pulls away. `tsvector` with per-language dictionaries, combined with `pg_trgm` for trigram similarity, handles searches in Spanish, Catalan, French, German or Italian with stemming and typo tolerance that Mongo's text index simply does not reach. For Europeans with accents, eñes, and Germanic compounding, this is not a detail: it is the difference between a usable search and one the customer abandons.

    On top of that we add generated columns. A `search tsvector GENERATED ALWAYS AS (to_tsvector('english', coalesce(title,'') || ' ' || coalesce(body,''))) STORED` column with a GIN index gives us instant search with no triggers, no application logic, and no opportunity for drift between the source fields and the index.

    Multi-document transactions have existed in Mongo for years, but they are still awkward: they require a replica set, have more aggressive time limits, and the API is uncomfortable. In Postgres a transaction is a transaction and spans everything you touch. When the domain has invariants that cross entities, and nearly every real domain does, this matters.

    Operational reality closes the case. Point-in-time recovery with WAL, logical replication for moving data between versions without downtime, mature extensions, and ORMs like Prisma, Drizzle or SQLAlchemy that have been polished for years. Mongo's ecosystem is good, but Postgres's is deeper and older.

    WHEN MONGO ACTUALLY WINS. We are not saying Mongo has no place. It works, and works well, in specific scenarios: documents with deeply variable shapes where each one is genuinely different, like a CMS draft history where every version can have its own structure; write-heavy time-series workloads with automatic TTL where insert simplicity matters more than complex queries; or when the rest of the organization already runs on Mongo and operational coherence outweighs the optimal technical choice.

    Schemas are not bureaucracy. They are the cheapest form of documentation that exists. Every column with its type and its constraint is a sentence you do not have to write in a wiki that no one reads. Starting without a schema does not save you work; it postpones it and charges interest when the team is twice as large and no one remembers why that field is sometimes a string and sometimes an array.

  ja: |
    私たちは同じ光景を何度も見てきました。チームがプロジェクトを始め、誰かが「データの形がまだ分からないからMongoで始めよう」と言い、18ヶ月後にはマイグレーションを手書きし、アプリケーションコードで型を検証し、三つの異なるサービスが同じ顧客を三つの異なる形で保存していることに気づきます。「スキーマレス」という主張は、ほぼ常に本当の利点ではありません。それは高い利息のついた繰り延べ債務です。データの形は常に存在します。選べるのはそれがエンジンの中に住むか、最後にエンドポイントを書いた人の頭の中に住むかだけです。

    私たちの立場はシンプルです。非常に具体的な理由がない限り、Postgresから始めます。そしてその具体的な理由はめったに現れません。

    PostgresはJSONBを10年以上前から備えており、その演算子はMongoで行うほぼすべてをカバーします。`->` 演算子はフィールドをJSONとして取り出し、`->>` はテキストとして取り出し、`@>` はあるドキュメントが別のドキュメントを含むかを問い、`jsonb_path_exists` は完全なJSONPath式を評価します。私たちの典型的なテーブルは、型付きのカラムと `metadata jsonb` カラムを混在させます。`id`、`email`、`created_at` は制約付きの実カラムとして存在し、本当に可変なもの、つまりテナント別フラグ、UI設定、変わった設定はGINインデックスを上に乗せたJSONBに入れます。参照整合性を犠牲にせず両方の世界の良いところを得られます。

    ネイティブ配列も過小評価されている機能です。エンティティが短く範囲の決まったタグ、ロール、関連IDのリストを持ち、それらを行と一緒にほぼ常に読む場合、`unnest` と `ANY` を伴う `text[]` や `uuid[]` は結合テーブルより性能が良く、モデルもより読みやすくなります。もちろん常にではありません。関係そのものに属性が必要なら結合テーブルに戻ります。しかし「すべてのN:M関係は新しいテーブル」というルールは教義であって工学ではありません。

    全文検索はPostgresが本当に差を広げる領域です。言語別辞書を持つ `tsvector` と、トライグラム類似度のための `pg_trgm` を組み合わせると、スペイン語、カタルーニャ語、フランス語、ドイツ語、イタリア語の検索を、ステミングと打ち間違いへの耐性とともに処理できます。Mongoのテキストインデックスでは届かない領域です。アクセントや特殊文字、ドイツ語の複合語を扱うヨーロッパ向けでは、これは細部ではなく、使える検索と顧客が諦める検索の違いです。

    その上にgenerated columnsを重ねます。`search tsvector GENERATED ALWAYS AS (to_tsvector('japanese', coalesce(title,'') || ' ' || coalesce(body,''))) STORED` というカラムにGINインデックスを張れば、トリガーもアプリケーションロジックも不要で、ソースフィールドとインデックスがズレる余地のない即時検索が手に入ります。

    マルチドキュメントトランザクションはMongoにも数年前から存在しますが、依然として扱いにくいです。レプリカセットを要求し、より厳しい時間制限を持ち、APIも快適ではありません。Postgresではトランザクションはトランザクションであり、触れるすべてに及びます。ドメインがエンティティをまたぐ不変条件を持つとき、そして現実のドメインのほぼすべてが持つとき、これは効いてきます。

    運用面の現実が決め手になります。WALによるポイントインタイムリカバリ、ダウンタイムなしでバージョン間を移動するための論理レプリケーション、成熟した拡張、そして何年も磨かれてきたPrisma、Drizzle、SQLAlchemyのようなORM。Mongoのエコシステムも良いですが、Postgresのものはより深く、より古いです。

    MONGOが本当に勝つとき。Mongoに居場所がないと言っているわけではありません。具体的なシナリオではうまく機能します。各ドキュメントが本当に異なる、深く可変な形を持つドキュメント、たとえばCMSの下書き履歴で各バージョンが独自の構造を持つ場合。自動TTLを伴う書き込みの多い時系列ワークロードで、複雑なクエリより挿入のシンプルさが重要な場合。あるいは組織の残りがすでにMongoで動いており、運用の一貫性が最適な技術選択を上回る場合です。

    スキーマは官僚主義ではありません。存在する中で最も安価なドキュメントの形式です。型と制約を持つすべてのカラムは、誰も読まないwikiに書かなくて済む一文です。スキーマなしで始めても作業は節約されません。チームが二倍になり、なぜそのフィールドが時には文字列で時には配列なのか誰も覚えていないときに、利息付きで請求が来るだけです。
---
