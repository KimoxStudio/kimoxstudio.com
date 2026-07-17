import { createVariationRouteHandler } from "@kx/nextjs";
import { config as kx } from "@/kx/config";

// `secure: false` keeps the cookie usable over plain HTTP during local
// development — the production deployment should remove this override so
// the cookie keeps its `Secure` attribute. We toggle by NODE_ENV so the
// same code path works in both modes.
const handlers = createVariationRouteHandler(kx, {
  secure: process.env.NODE_ENV === "production",
});

export const POST = handlers.POST;
export const DELETE = handlers.DELETE;

export const runtime = "nodejs";
