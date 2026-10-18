/**
 * /robots.txt — open to search engines and to AI crawlers alike, so Watwa can
 * be found and cited by AI assistants. Named AI agents are listed explicitly
 * to make the intent unambiguous. llms.txt and the MCP endpoint are the
 * machine-friendly entry points (see src/app/llms.txt and src/app/mcp).
 *
 * A route handler rather than robots.ts because Next's robots metadata has
 * no field for Content-Signal (contentsignals.org), which states how the
 * content may be used: search indexing, AI answers (ai-input), AI training.
 */
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

const CONTENT_SIGNAL = "Content-Signal: search=yes, ai-input=yes, ai-train=yes";

const ROBOTS_TXT = [
  "User-Agent: *",
  CONTENT_SIGNAL,
  "Allow: /",
  "Disallow: /mcp",
  "",
  ...AI_CRAWLERS.map((ua) => `User-Agent: ${ua}`),
  CONTENT_SIGNAL,
  "Allow: /",
  "Disallow: /mcp",
  "",
  `Host: ${SITE_URL}`,
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  "",
].join("\n");

export function GET() {
  return new Response(ROBOTS_TXT, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
