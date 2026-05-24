---
slug: "diseno-api-rest"
date: "2026-04-14"
read_time: "9 min"
glyph: "API"
featured: false
category:
  es: "Desarrollo"
  en: "Development"
  ja: "開発"
title:
  es: "Diseñar una API REST que no odies en 6 meses."
  en: "Designing a REST API you won't hate in 6 months."
  ja: "6ヶ月後に後悔しないREST APIの設計。"
excerpt:
  es: "Versionado, paginación, errores legibles, idempotencia. Los aburridos detalles que separan una API de juguete de una API de producción."
  en: "Versioning, pagination, readable errors, idempotency. The boring details that separate a toy API from a production one."
  ja: "バージョニング、ページネーション、読めるエラー、冪等性。おもちゃと本番品を分ける退屈な詳細。"
body:
    es: |
        Las APIs no se rompen de golpe, se degradan. Empiezan limpias, con tres endpoints y un esquema que cabe en una servilleta, y seis meses después arrastran campos que nadie recuerda haber añadido, códigos de estado que mienten, paginación inconsistente entre recursos y un changelog que nadie mantiene. Diseñar una API que no odiemos en seis meses no es cuestión de elegancia, es cuestión de tomar decisiones aburridas al principio y sostenerlas con disciplina.

        **Versionado explícito desde el día uno.** Tenemos dos opciones serias: versión en la ruta (`/v1/orders`) o versión en el header `Accept` (`application/vnd.kimox.v1+json`). La ruta gana en claridad operativa, es visible en logs, en métricas, en cualquier traza de Sentry, y los clientes la entienden sin documentación. El header gana cuando el contrato cambia para el mismo recurso según el consumidor, típicamente en plataformas con múltiples SDKs oficiales y un ciclo de vida largo. Para el 95% de los casos, `/v1` en la ruta es la respuesta correcta. Lo importante no es cuál, es comprometerse antes de tener un solo cliente en producción.

        **Paginación: cursor por defecto, offset solo cuando hace falta.** El offset es cómodo para listados administrativos pequeños, pero falla con datasets grandes, escrituras concurrentes y cualquier orden que no sea estrictamente estable. El cursor opaco basado en un campo monotónico (timestamp más id) es resistente a inserciones, soporta navegación infinita en feeds y no obliga a contar registros. Página por defecto de 25, máximo 100, y un `next_cursor` explícito en la respuesta. Nunca devolvemos el total cuando es caro calcularlo; preferimos un `has_more` honesto.

        **Errores que no mienten.** Adoptamos RFC 7807 (`application/problem+json`) con `type`, `title`, `status`, `detail` y un `instance` correlacionable con nuestros logs. Un 422 es un 422, un 409 es un 409, un 404 no es nunca un 200 con `{"error": "not found"}`. Devolver 200 con un cuerpo de error es la decisión que destruye más clientes: rompe retries, rompe circuit breakers, rompe métricas de éxito. Los códigos HTTP existen, los usamos. Para errores de validación incluimos un array `errors` con `pointer` JSON Pointer al campo afectado.

        **Idempotencia para todo POST que muta dinero o estado externo.** Aceptamos `Idempotency-Key` como header obligatorio en creación de pagos, envíos de email transaccional, llamadas a sistemas externos. Guardamos la respuesta original durante 24 horas indexada por esa clave y la devolvemos tal cual ante reintentos. Esto no es opcional para webhooks entrantes: la red falla, los proveedores reintentan, y sin idempotencia cobramos dos veces. La clave la genera el cliente, normalmente un UUIDv4 por intento lógico.

        **Nombres y recursos sin barroquismo.** Sustantivos en plural (`/invoices`, `/customers`), nunca verbos en la ruta. Anidamiento máximo dos niveles: `/customers/{id}/invoices` está bien, `/customers/{id}/invoices/{id}/lines/{id}/taxes` no lo está. Cuando algo no encaja en CRUD, lo modelamos como subrecurso (`/orders/{id}/cancellation` con POST) en vez de inventar `/cancelOrder`. Filtros, ordenación y búsqueda van en query string, no en la ruta: `?status=paid&sort=-created_at`.

        **Evolución aditiva y nada más.** Añadir campos opcionales y endpoints nuevos no rompe a nadie. Renombrar, eliminar o cambiar el tipo de un campo sí. Cuando necesitamos cambiar, aplicamos expand-then-contract: añadimos el campo nuevo, migramos clientes, y solo después retiramos el viejo, con un header `Deprecation: true` y `Sunset` con fecha ISO. Las ventanas de deprecación nunca son inferiores a seis meses para clientes externos.

        La documentación es código. Un OpenAPI generado a partir de los handlers, ejemplos ejecutables, y un changelog versionado en el mismo repositorio. Si la documentación vive en otro sitio, miente.
    en: |
        APIs do not break suddenly, they degrade. They start clean, with three endpoints and a schema that fits on a napkin, and six months later they drag fields nobody remembers adding, status codes that lie, inconsistent pagination across resources and a changelog nobody maintains. Designing an API we will not hate in six months is not about elegance, it is about making boring decisions early and sticking to them.

        **Explicit versioning from day one.** We have two serious options: version in the path (`/v1/orders`) or version in the `Accept` header (`application/vnd.kimox.v1+json`). The path wins on operational clarity, it is visible in logs, in metrics, in any Sentry trace, and clients understand it without documentation. The header wins when the contract changes for the same resource depending on the consumer, typically on platforms with multiple official SDKs and a long lifecycle. For 95% of cases, `/v1` in the path is the right answer. What matters is not which, but committing before a single client ships to production.

        **Pagination: cursor by default, offset only when needed.** Offset is comfortable for small admin listings, but it breaks with large datasets, concurrent writes, and any ordering that is not strictly stable. An opaque cursor based on a monotonic field (timestamp plus id) is resistant to inserts, supports infinite feeds and does not force counting records. Default page size of 25, maximum 100, and an explicit `next_cursor` in the response. We never return a total when it is expensive to compute; we prefer an honest `has_more`.

        **Errors that do not lie.** We adopt RFC 7807 (`application/problem+json`) with `type`, `title`, `status`, `detail`, and an `instance` correlatable with our logs. A 422 is a 422, a 409 is a 409, a 404 is never a 200 with `{"error": "not found"}`. Returning 200 with an error body is the decision that destroys the most clients: it breaks retries, it breaks circuit breakers, it breaks success metrics. HTTP codes exist, we use them. For validation errors we include an `errors` array with a JSON Pointer to the offending field.

        **Idempotency for every POST that mutates money or external state.** We accept `Idempotency-Key` as a mandatory header on payment creation, transactional email sends, calls to external systems. We store the original response for 24 hours indexed by that key and return it verbatim on retries. This is not optional for inbound webhooks: networks fail, providers retry, and without idempotency we charge twice. The key is generated by the client, typically a UUIDv4 per logical attempt.

        **Names and resources without baroque flourishes.** Plural nouns (`/invoices`, `/customers`), never verbs in the path. Maximum nesting depth of two: `/customers/{id}/invoices` is fine, `/customers/{id}/invoices/{id}/lines/{id}/taxes` is not. When something does not fit CRUD, we model it as a subresource (`/orders/{id}/cancellation` with POST) instead of inventing `/cancelOrder`. Filters, sorting and search go in the query string, never in the path: `?status=paid&sort=-created_at`.

        **Additive evolution and nothing else.** Adding optional fields and new endpoints breaks no one. Renaming, removing or changing the type of a field does. When we need to change, we apply expand-then-contract: we add the new field, migrate clients, and only then retire the old one, with a `Deprecation: true` header and `Sunset` with an ISO date. Deprecation windows are never shorter than six months for external clients.

        Documentation is code. An OpenAPI spec generated from the handlers, executable examples, and a changelog versioned in the same repository. If the documentation lives somewhere else, it lies.
    ja: |
        APIは突然壊れるのではなく、徐々に劣化する。最初は綺麗で、エンドポイントが三つ、スキーマがナプキン一枚に収まる規模で始まる。六ヶ月後には、誰が追加したか覚えていないフィールド、嘘をつくステータスコード、リソースごとに一貫しないページネーション、誰も維持しない変更履歴を抱えている。六ヶ月後に憎まないAPIを設計するのは、優雅さの問題ではなく、最初に退屈な決定を下し、規律をもって守り続ける問題だ。

        **初日からの明示的なバージョニング。** 真剣な選択肢は二つある。パスにバージョンを含める方式（`/v1/orders`）か、`Accept`ヘッダに含める方式（`application/vnd.kimox.v1+json`）だ。パスは運用上の明瞭さで勝つ。ログ、メトリクス、Sentryのトレースに可視で、クライアントもドキュメントなしで理解する。ヘッダはコンシューマに応じて同じリソースの契約が変わる場合、典型的には複数の公式SDKと長いライフサイクルを持つプラットフォームで勝つ。九五パーセントのケースでは、パスの`/v1`が正解だ。重要なのはどちらかではなく、最初のクライアントが本番に出る前にコミットすることだ。

        **ページネーション、デフォルトはカーソル、オフセットは必要なときだけ。** オフセットは小さな管理画面のリストには楽だが、大規模データセット、並行書き込み、厳密に安定でない順序では破綻する。単調なフィールド（タイムスタンプとid）に基づく不透明なカーソルは、挿入に強く、無限フィードに対応し、レコードを数える必要がない。デフォルトのページサイズは25、最大100、レスポンスに明示的な`next_cursor`を含める。総件数の計算が高価な場合は返さず、正直な`has_more`を選ぶ。

        **嘘をつかないエラー。** RFC 7807（`application/problem+json`）を採用し、`type`、`title`、`status`、`detail`、ログと相関可能な`instance`を含める。422は422、409は409、404は決して`{"error": "not found"}`を伴う200ではない。エラー本体を200で返す判断こそ、最も多くのクライアントを壊す。リトライを壊し、サーキットブレーカを壊し、成功率メトリクスを壊す。HTTPコードは存在する、私たちはそれを使う。バリデーションエラーには、対象フィールドへのJSON Pointerを持つ`errors`配列を含める。

        **金銭や外部状態を変えるすべてのPOSTに冪等性。** 決済作成、トランザクショナルメール送信、外部システム呼び出しでは`Idempotency-Key`を必須ヘッダとして受け入れる。元のレスポンスをそのキーで24時間索引付けして保存し、リトライ時にそのまま返す。これは受信Webhookでは選択肢ではない。ネットワークは落ち、プロバイダはリトライし、冪等性がなければ二重課金が起きる。キーはクライアントが生成し、通常は論理試行ごとのUUIDv4だ。

        **バロックな装飾なしの命名とリソース。** 名詞の複数形（`/invoices`、`/customers`）、パスに動詞は決して置かない。ネストの最大深度は二つまで。`/customers/{id}/invoices`は良い、`/customers/{id}/invoices/{id}/lines/{id}/taxes`は良くない。CRUDに収まらない場合は、`/cancelOrder`を発明する代わりに、POSTで`/orders/{id}/cancellation`のようにサブリソースとしてモデル化する。フィルタ、ソート、検索はクエリ文字列に置く、パスには置かない。`?status=paid&sort=-created_at`のように。

        **加法的な進化だけ。** オプションフィールドと新しいエンドポイントの追加は誰も壊さない。フィールドの改名、削除、型変更は壊す。変更が必要なときはexpand-then-contractを適用する。新しいフィールドを追加し、クライアントを移行させ、その後に古い方を`Deprecation: true`ヘッダと`Sunset`のISO日付付きで廃止する。外部クライアントに対する非推奨期間は六ヶ月を下回らない。

        ドキュメントはコードだ。ハンドラから生成されたOpenAPI、実行可能な例、同じリポジトリにバージョン管理された変更履歴。ドキュメントが別の場所に住んでいるなら、それは嘘をついている。
---
