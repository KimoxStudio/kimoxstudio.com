import { adminHandlers } from "../handlers";

// Wrapper form (not `export const GET = adminHandlers.listVariations`): Next 16
// route typegen requires the exported handler's own signature to be a valid
// RouteContext shape, so we re-export through a plain async function.
export async function GET(req: Request): Promise<Response> {
  return adminHandlers.listVariations(req);
}
export async function POST(req: Request): Promise<Response> {
  return adminHandlers.createVariation(req);
}

export const runtime = "nodejs";
