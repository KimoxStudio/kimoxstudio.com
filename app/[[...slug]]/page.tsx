import "../landing.css";
import { renderPageFromContent } from "@kx/nextjs";
import { notFound } from "next/navigation";
import { config as kx } from "@/kx/config";

// Optional catch-all ([[...slug]]) — serves every migrated PageDocument,
// including "/" (index.json). Explicit routes (islands: /blog, /studio,
// /api/*, /opengraph-image, and the kx admin at /admin) still win.
// landing.css was previously imported by the deleted app/page.jsx; it moves
// here so the migrated landing keeps its styling (class-scoped; only loaded
// on catch-all-served routes — islands keep their own stylesheets).
interface RouteParams {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function buildRoute(slug: string[] | undefined): string {
  if (!slug || slug.length === 0) return "/";
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
