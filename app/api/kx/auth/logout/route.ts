import { config as kx } from "@/kx/config";

// Convenience logout endpoint. The admin doesn't currently call it, but
// it is useful for E2E tests and for users who want a manual "log out"
// affordance — issuing it just expires the session cookie.
//
// Same `AuthProvider` → `CredentialsAuthProvider` narrowing trick as the
// login route uses: the base interface doesn't promise a `logout`
// method but `createCredentialsAuthProvider` always provides one.
const authWithLogout = kx.auth as unknown as { logout: () => Response };

export function POST(): Response {
  return authWithLogout.logout();
}

export const runtime = "nodejs";
