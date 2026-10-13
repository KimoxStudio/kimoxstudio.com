# Cloudflare

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Account ID

[dash.cloudflare.com](https://dash.cloudflare.com) → any domain → **Overview**
→ right column, **API** section. Copy button beside it.

## Token

Not the Global API Key — it cannot be scoped or revoked alone.

1. [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
   → **Create Token** → **Create Custom Token**
2. Name: `kx — <project>`. One token per project, matching its 1Password
   item.
3. **Permissions**: `Zone` · `DNS` · **Edit** and `Zone` · `Zone` · **Read**.
   The second is required — without it every command fails with a permissions
   error that does not mention zones.
4. **Zone resources**: **Include** → **Specific zone** → the project's domains.
5. **TTL**: leave unset. No credential here expires.
6. Shown once.

## `zone`

One domain, the **apex**: `example.com`, not `www.example.com`. A zone covers
everything under it.

More than one domain: name the one the check should ask about, usually
production. `cf zones list` prints them.

## Putting it in

```bash
kx creds --project <project> --guide
kx doctor --project <project>
```

`Authentication error` → wrong token, or whitespace. An error naming the zone →
`Zone: Read` missing, or the token is scoped to another domain.
