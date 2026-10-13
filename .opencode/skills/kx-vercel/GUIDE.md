# Vercel

- `VERCEL_TOKEN`

## Token

1. [vercel.com/account/tokens](https://vercel.com/account/tokens) → **Create Token**
2. Name: `kx — <project>`
3. **Scope: your own account.** Not the team — a team token has no user and
   every `vercel` command fails with `User not found`.
4. Expiration: `No Expiration`
5. Shown once.

## `scope`

The team slug. `vercel teams list`, or the dashboard URL while you are in the
team: `vercel.com/<scope>`.

In a deployment URL it is last, the project first, a hash between:

```
myapp-a1b2c3d4e-acme-team.vercel.app
```

## `projectName`

The name **on Vercel**, often not the repository's. Dashboard title,
**Settings** → **General** → **Project Name**, or
`vercel project ls --scope <scope>`.

## Putting it in

```bash
kx creds --project <project> --guide
kx doctor --project <project>
```

`User not found` → the token is scoped to a team. `The specified token is not
valid` → wrong token, or whitespace. Project not found → wrong `scope`.
