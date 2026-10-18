/**
 * /.well-known/api-catalog (RFC 9727) — a linkset pointing agents at Watwa's
 * one API, the read-only MCP server, with its server card and docs.
 */
import { MCP_PATH } from "@/lib/ai/knowledge";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const catalog = {
  linkset: [
    {
      anchor: `${SITE_URL}${MCP_PATH}`,
      "service-desc": [{ href: `${SITE_URL}/.well-known/mcp/server-card.json`, type: "application/json" }],
      "service-doc": [{ href: `${SITE_URL}/llms.txt`, type: "text/plain" }],
    },
  ],
};

export function GET() {
  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      "Content-Type": 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
      "Cache-Control": "public, max-age=3600",
      Link: `<${SITE_URL}/.well-known/api-catalog>; rel="api-catalog"`,
    },
  });
}
