import { createWebhookRouteHandler } from "@kimoxstudio/nextjs";
import { parseWebhookEvent, verifyWebhookSignature } from "@kimoxstudio/git-provider-github";
import { config as kx } from "@/kx/config";

// Wired up against the GitHub-style verifier/parser even though the
// example-app uses the stub git provider — it costs nothing and makes the
// route a 1:1 stand-in for production deployments.
const handler = createWebhookRouteHandler(kx, {
  secret: process.env.KX_GITHUB_WEBHOOK_SECRET ?? "dev-webhook-secret",
  verifySignature: verifyWebhookSignature,
  parseEvent: parseWebhookEvent,
});

export const POST = handler.POST;

export const runtime = "nodejs";
