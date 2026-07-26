import { createVariationRouteHandler } from "@kimoxstudio/nextjs";
import { config as kx, secureCookies } from "@/kx/config";

// The preview cookie tracks the session cookie's `Secure` flag (see
// `kx/config.ts`). The two have to agree: with only one of them dropped you
// can log in but never preview a draft, or the reverse — and both failures
// are silent, because the browser discards the cookie without telling the
// page anything went wrong.
//
// This used to key off NODE_ENV, which can't tell a local `next start` (also
// NODE_ENV=production) from the real deployment.
const handlers = createVariationRouteHandler(kx, {
  secure: secureCookies,
});

export const POST = handlers.POST;
export const DELETE = handlers.DELETE;

export const runtime = "nodejs";
