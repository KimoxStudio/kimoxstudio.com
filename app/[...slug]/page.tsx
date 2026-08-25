import "../landing.css";
import { renderPageFromContent } from "@kimoxstudio/nextjs";
import { notFound } from "next/navigation";
import { publicContentConfig as kx } from "@/kx/config";

// Required catch-all ([...slug], NOT optional) — serves any migrated
// PageDocument other than "/". "/" itself moved to a real static route
// (app/page.tsx) in the kimox-fw removal's Phase 1: Next.js treats an
// *optional* catch-all ([[...slug]]) as colliding with an explicit "/"
// route ("cannot define a route with the same specificity") and refuses to
// build, so this folder was renamed from [[...slug]] to [...slug] — a
// required catch-all never matches "/", removing the collision. There is
// currently no other page under content/pages/, so this route has nothing
// left to serve; it stays in place for admin/preview and any future
// non-root PageDocument. Explicit routes (islands: /blog, /api/*,
// /opengraph-image, and the kx admin at /admin) still win.
// landing.css was previously imported by the deleted app/page.jsx; it moves
// here so the migrated landing keeps its styling (class-scoped; only loaded
// on catch-all-served routes — islands keep their own stylesheets).
// Uses `publicContentConfig` (not `config`) so a GitHub outage/bad
// credential falls back to the bundled on-disk content instead of a 500 —
// see the doc comment on `publicContentConfig` in kx/config.ts. Admin routes
// must keep importing `config` and fail loudly instead.
interface RouteParams {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function buildRoute(slug: string[]): string {
  if (slug.length === 0) return "/";
  return `/${slug.join("/")}`;
}

export default async function CatchAllPage({ params, searchParams }: RouteParams) {
  const { slug } = await params;
  // The admin preview iframe appends ?kx-preview; forward it so the renderer
  // instruments nodes (needed for the visual editor's hover / select / scroll),
  // including the read-only production preview which has no variation cookie.
  const preview = "kx-preview" in (await searchParams);
  const result = await renderPageFromContent(kx, { route: buildRoute(slug), preview });
  if (!result.node) notFound();
  return result.node;
}
