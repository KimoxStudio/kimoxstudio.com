import { notFound } from "next/navigation";
import { BASE_URL, localeUrl } from "@/lib/urls";

// Metadata + locale guard shared by the Spanish-only service pages. They
// target Spanish local searches, so /en/<path> and /ja/<path> are 404s and
// the page declares no hreflang alternates.

export function serviceMetadata(path: string, title: string, description: string) {
  return async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    if (locale !== "es") return {};
    const url = localeUrl("es", path);
    const image = { url: `${BASE_URL}/opengraph-image`, width: 1200, height: 630, alt: title };
    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: { title, description, url, siteName: "Kimox Studio", locale: "es_ES", type: "website", images: [image] },
      twitter: { card: "summary_large_image", title, description, images: [image.url] },
    };
  };
}

export async function requireSpanish(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  if (locale !== "es") notFound();
}
