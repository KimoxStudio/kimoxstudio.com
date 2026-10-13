# Google Search Console

- `GOOGLE_SEARCH_CONSOLE_CREDENTIALS` — a service account key, the whole
  JSON file

Search Console has no API key and no personal token. A program reads it as a
**service account**: a robot user with an email address, which you add to
the property like any colleague. The downloaded key file is its password.

Doctor signs a request with it, which proves the key, and then asks which
properties the account can see, which proves it was added to **this
project's**.

## Key

1. [console.cloud.google.com](https://console.cloud.google.com) → the
   studio's project (any project; this is where the robot lives, not where
   the site does). Create one named `kimox-studio` if there is none.
2. **APIs & Services** → **Library** → **Google Search Console API** →
   **Enable**. Without this every request answers `403`, whatever the key.
3. **IAM & Admin** → **Service Accounts** → **Create service account**.
   Name: `search-console-<project>`. No roles: it needs nothing inside Google
   Cloud.
4. Open it → **Keys** → **Add key** → **Create new key** → **JSON**. The
   file downloads once. Note the `client_email` inside it — that is the
   address you add to the property.

## Add it to the property

[search.google.com/search-console](https://search.google.com/search-console)
→ the property → **Settings** → **Users and permissions** → **Add user** →
the `client_email` → **Restricted**. Restricted reads everything; **Full**
adds the ability to change settings, which nothing here needs.

Only an **Owner** of the property can add users. If the button is not
there, that is why.

## `siteUrl`

Exactly as Search Console names the property: `sc-domain:rachafit.com` for
a Domain property, `https://www.rachafit.com/` with the trailing slash for
a URL-prefix one. `kx creds --guide` lists what the account can see once it
has been added.

## Putting it in

```bash
kx creds --project <project> --guide
kx doctor --project <project>
```

It asks for the **path** to the JSON, not its text, and offers to delete the
file afterwards. The key lands in the vault and nowhere else.

`Google rejected the key` → the key was deleted in the console, or the file
is not a service account key. `not a user of` → the address was not added to
the property, or was added to a different one; the message lists what it
can see. `403 … has not been used in project` → the API is not enabled,
step 2.
