import { adminHandlers } from "../../handlers";

export async function DELETE(
  req: Request,
  ctx: { params: Promise<{ name: string }> },
): Promise<Response> {
  const params = await ctx.params;
  return adminHandlers.deleteVariation(req, { name: params.name });
}

export const runtime = "nodejs";
