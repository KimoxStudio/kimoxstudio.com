import "server-only";
import { createAdminRouteHandlers } from "@kimoxstudio/admin/server";
import { config as kx } from "@/kx/config";

/**
 * Shared admin handler set. Each `route.ts` below picks the methods it
 * needs off this singleton so we only call `createAdminRouteHandlers`
 * once per process.
 */
export const adminHandlers = createAdminRouteHandlers(kx);
