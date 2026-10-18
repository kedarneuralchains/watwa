/**
 * /llms.txt — the site summarised for language models (llmstxt.org), built
 * from the same data the pages render. Also points agents at /mcp.
 */
import { llmsTxt } from "@/lib/ai/knowledge";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
