# Resend

- `RESEND_API_KEY`

Doctor asks two things: that the key is accepted, and that **this project's
domain** is one it can see. The studio has more than one Resend account, and
a key for the wrong one sends nothing.

## Key

1. [resend.com/api-keys](https://resend.com/api-keys) → **Create API Key**.
2. Name: `kx — <project>`.
3. Permission: **Full access**. A *Sending access* key can only send, and
   Resend answers every read — domains, delivery status of an email — with
   the same `401` as a wrong key, so doctor could not tell them apart and the
   agent could not read what was delivered.
4. Shown once.

If the app should only ever send, make it a second key with sending access,
declared by the app in its own `kx.env.json` under another name. Do not
downgrade this one.

## `domain`

The sending domain as Resend lists it — `rachafit.com`, not
`mail.rachafit.com` unless that is what was verified.
[resend.com/domains](https://resend.com/domains), or let `kx creds --guide`
list them.

## One key, or one per environment

Resend does not separate environments; a project that wants a production key
of its own — so a revoked development key never stops real mail — says so on
its connection:

```bash
kx connector add resend --per-environment api_key
```

Then `kx creds --guide` asks for both and `kx exec --env production` injects
the second. Without it, one key serves every environment.

## Putting it in

```bash
kx creds --project <project> --guide
kx doctor --project <project>
```

`401 restricted_api_key` → a sending-only key; make a full-access one. The
project check failing while the account check passed → the domain belongs to
another Resend account or is not verified yet.
