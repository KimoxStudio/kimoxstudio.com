import { adminHandlers } from "../../handlers";

export async function PUT(req: Request): Promise<Response> {
  return adminHandlers.savePage(req);
}

export const runtime = "nodejs";
