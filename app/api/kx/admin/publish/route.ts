import { adminHandlers } from "../handlers";

export async function POST(req: Request): Promise<Response> {
  return adminHandlers.publish(req);
}

export const runtime = "nodejs";
