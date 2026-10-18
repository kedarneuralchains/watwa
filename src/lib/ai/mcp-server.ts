/**
 * Watwa's public MCP server: read-only tools over the site's own content, so
 * AI assistants and agents can answer questions about Watwa from the source
 * rather than from a scraped page. Served over Streamable HTTP at /mcp
 * (src/app/mcp/route.ts). No auth, no writes, no side effects.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { clientsList, companyOverview, contactDetails, llmsTxt, solutionsList } from "@/lib/ai/knowledge";
import { FOUNDERS } from "@/lib/founders";
import { CATEGORIES, SOLUTIONS, getSolution, solutionPath } from "@/lib/solutions";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

const readOnly = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };

/** Tool results carry JSON both as text (for any client) and structured. */
function json<T extends object>(data: T) {
  const structuredContent = Array.isArray(data) ? { items: data } : data;
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
    structuredContent: structuredContent as Record<string, unknown>,
  };
}

export function createWatwaMcpServer() {
  const server = new McpServer(
    { name: "watwa-group", title: SITE_NAME, version: "1.0.0", websiteUrl: SITE_URL },
    {
      instructions:
        "Read-only information about Watwa Group (Watwa Engineers Pvt. Ltd.), a water and wastewater treatment company headquartered in Bareilly, India. " +
        "Use get_company_overview first for context; list_solutions / get_solution for ETP, STP, RO, DM, EDI, ZLD and components; " +
        "get_founders for the founders; list_clients for references (featured: JK Cement); get_contact when the user wants a quote or site visit (WhatsApp is preferred).",
    },
  );

  server.registerTool(
    "get_company_overview",
    {
      title: "Company overview",
      description: "Who Watwa is: positioning, founders, featured clients, industries served, offices and registration.",
      annotations: readOnly,
    },
    async () => json(companyOverview()),
  );

  server.registerTool(
    "get_founders",
    {
      title: "Founders",
      description: "Watwa's founders with role, bio and a quote.",
      annotations: readOnly,
    },
    async () =>
      json(FOUNDERS.map(({ name, role, bio, quote }) => ({ name, role, bio, quote, profile: absoluteUrl("/about") }))),
  );

  server.registerTool(
    "list_solutions",
    {
      title: "List solutions",
      description:
        "Watwa's plants, systems and components. Optionally filter by category or by a keyword matched against title, abbreviation, summary and description (e.g. 'sewage', 'ZLD', 'pump').",
      inputSchema: {
        category: z
          .enum(CATEGORIES.map((c) => c.title) as [string, ...string[]])
          .optional()
          .describe("One category, e.g. 'Wastewater Treatment'"),
        keyword: z.string().trim().min(1).max(60).optional().describe("Case-insensitive filter"),
      },
      annotations: readOnly,
    },
    async ({ category, keyword }) => {
      const k = keyword?.toLowerCase();
      return json(
        solutionsList().filter(
          (s) =>
            (!category || s.category === category) &&
            (!k || [s.title, s.abbreviation, s.summary, s.description].some((f) => f.toLowerCase().includes(k))),
        ),
      );
    },
  );

  server.registerTool(
    "get_solution",
    {
      title: "Solution details",
      description: "Full description of one solution, including highlights and any specification table.",
      inputSchema: {
        slug: z.enum(SOLUTIONS.map((s) => s.slug) as [string, ...string[]]).describe("Solution slug from list_solutions"),
      },
      annotations: readOnly,
    },
    async ({ slug }) => {
      const s = getSolution(slug)!;
      return json({
        title: s.title,
        category: CATEGORIES.find((c) => c.id === s.category)!.title,
        summary: s.summary,
        description: s.body,
        [s.highlights.heading]: s.highlights.points,
        ...(s.specs && { specifications: s.specs }),
        url: absoluteUrl(solutionPath(s.slug)),
      });
    },
  );

  server.registerTool(
    "list_clients",
    {
      title: "List clients",
      description: "Featured brands (e.g. JK Cement) and the installation reference list with plant type and capacity in KLD.",
      annotations: readOnly,
    },
    async () => json(clientsList()),
  );

  server.registerTool(
    "get_contact",
    {
      title: "Contact Watwa",
      description: "How to reach Watwa: a WhatsApp chat link (preferred), phones, email and all office addresses.",
      annotations: readOnly,
    },
    async () => json(contactDetails()),
  );

  server.registerResource(
    "llms-txt",
    `${SITE_URL}/llms.txt`,
    {
      title: "Watwa overview (llms.txt)",
      description: "The whole site summarised for language models: founders, solutions, clients, contact.",
      mimeType: "text/markdown",
    },
    async (uri) => ({ contents: [{ uri: uri.href, mimeType: "text/markdown", text: llmsTxt() }] }),
  );

  return server;
}
