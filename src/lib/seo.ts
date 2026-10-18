import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

/** The generated card from app/opengraph-image.tsx, resolved against metadataBase. */
export const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE_NAME}: ${SITE_TAGLINE}` };

/**
 * Per-page metadata with a canonical URL and complete Open Graph / Twitter
 * blocks. Next replaces (rather than merges) a parent's `openGraph` when a
 * page sets its own, so pages go through this helper instead of writing
 * partial objects.
 */
export function pageMetadata({
  path,
  title,
  description,
  absoluteTitle = false,
}: {
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { siteName: SITE_NAME, locale: "en_IN", url: path, title: fullTitle, description, images: [OG_IMAGE], type: "website" },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE.url] },
  };
}
