import { config as kx } from "@/kx/config";

// `@kimoxstudio/admin`'s API client posts the username/password JSON straight to
// `/api/kx/auth` — there's no separate `/login` path. We forward the
// request into the `login` method that `createCredentialsAuthProvider`
// exposes; everything else (rate limit, set-cookie, etc.) is handled
// inside the provider.
//
// `AuthProvider` is the framework-wide interface and does not expose
// `login`/`logout`; we narrow the runtime object to its concrete
// `CredentialsAuthProvider` shape through a typed cast.
const authWithLogin = kx.auth as unknown as {
  login: (req: Request) => Promise<Response>;
};

export async function POST(req: Request): Promise<Response> {
  return authWithLogin.login(req);
}

export const runtime = "nodejs";
