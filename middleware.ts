import { createKxMiddleware } from "@kimoxstudio/nextjs/middleware";
import { config as kxConfig } from "@/kx/config";

// Next 16 note: the `middleware.ts` convention is deprecated in favor of
// `proxy.ts` (still works, just warns). The kx handler only reads/clears the
// variation cookie and sets an x-kx-variation header, so it is a no-op for the
// island routes (/blog) it also matches.
const handler = createKxMiddleware({
  cookieName: kxConfig.cookies.name,
  secrets: kxConfig.cookies.secrets,
  variationBranchPrefix: kxConfig.content.variationBranchPrefix,
});

export default handler;

export const config = {
  // Skip Next internals, the webhook route (raw bytes), and any path with a
  // file extension (static assets).
  matcher: ["/((?!_next|api/kx/webhook|.*\\.).*)"],
};

// Node runtime: @kimoxstudio/nextjs/middleware verifies the cookie with sync node crypto.
export const runtime = "nodejs";
