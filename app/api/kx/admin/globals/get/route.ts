import { adminHandlers } from "../../handlers";

export async function GET(req: Request): Promise<Response> {
  return adminHandlers.getGlobal(req);
}

export const runtime = "nodejs";
