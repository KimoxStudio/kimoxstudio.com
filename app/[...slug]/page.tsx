import { renderPageFromContent } from "@kx/nextjs";
import { notFound } from "next/navigation";
import { config as kx } from "@/kx/config";

// Required catch-all ([...slug]) for now — it coexists with the root
// app/page.jsx (which still renders the original landing). In the content
// phase, app/page.jsx is deleted and this directory is renamed to the
// optional catch-all [[...slug]] so it also serves "/" from a PageDocument.
interface RouteParams {
  params: Promise<{ slug?: string[] }>;
}

function buildRoute(slug: string[] | undefined): string {
  if (!slug || slug.length === 0) return "/";
  return `/${slug.join("/")}`;
}

export default async function CatchAllPage({ params }: RouteParams) {
  const { slug } = await params;
  const result = await renderPageFromContent(kx, { route: buildRoute(slug) });
  if (!result.node) notFound();
  return result.node;
}
