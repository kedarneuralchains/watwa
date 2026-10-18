/**
 * Markdown versions of the pages. Not linked anywhere: next.config.ts
 * rewrites a page request here when it sends `Accept: text/markdown`, so
 * agents get Markdown at the page's own URL and browsers get HTML.
 */
import { markdownPaths, pageMarkdown } from "@/lib/ai/markdown";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return markdownPaths().map((path) => ({ path: path === "/" ? [] : path.slice(1).split("/") }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path: segments } = await params;
  const path = `/${(segments ?? []).join("/")}`;
  const body = pageMarkdown(path);
  if (!body) return new Response("Not found\n", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      Vary: "Accept",
      Link: `<${absoluteUrl(path)}>; rel="canonical"`,
    },
  });
}
