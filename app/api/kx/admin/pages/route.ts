import { adminHandlers } from "../handlers";

export async function GET(req: Request): Promise<Response> {
  return adminHandlers.listPages(req);
}

export const runtime = "nodejs";
