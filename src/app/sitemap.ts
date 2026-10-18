import type { MetadataRoute } from "next";
import { INDEXED_PAGES, absoluteUrl } from "@/lib/site";

/** /sitemap.xml — every indexed page, including one per solution. */
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXED_PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
