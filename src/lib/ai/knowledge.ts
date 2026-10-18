/**
 * Machine-readable view of the site's content, shared by /llms.txt, the
 * Markdown page versions and the MCP server at /mcp. Everything here is
 * derived from the same data files the pages render, so AI answers cannot
 * drift from what the site says.
 */
import { FEATURED_BRANDS, INDUSTRIES, INSTALLATIONS } from "@/lib/clients";
import { CATALOGUE_PDF, CONTACT, OFFICES, SOCIAL_LINKS } from "@/lib/contact";
import { FOUNDERS } from "@/lib/founders";
import { CATEGORIES, FIELD_SERVICES, SOLUTIONS, solutionPath } from "@/lib/solutions";
import { INDEXED_PAGES, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL, absoluteUrl } from "@/lib/site";

export const MCP_PATH = "/mcp";

export function companyOverview() {
  return {
    name: SITE_NAME,
    legalName: CONTACT.legalName,
    tagline: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    positioning:
      "Watwa is 100% focused on water and wastewater. It designs, manufactures, installs, commissions and maintains treatment plants that are compact, energy efficient, reliable and simple to operate, and it supplies the components and chemicals that keep them running.",
    founders: FOUNDERS.map(({ name, role }) => ({ name, role, profile: absoluteUrl("/about") })),
    featuredClients: FEATURED_BRANDS.map(({ name, sector }) => ({ name, sector })),
    industriesServed: [...INDUSTRIES],
    fieldServices: FIELD_SERVICES,
    headOffice: CONTACT.location,
    offices: OFFICES.map(({ city, kind }) => `${city} (${kind})`),
    registration: { cin: CONTACT.cin, incorporated: CONTACT.founded },
    website: SITE_URL,
    catalogue: `${SITE_URL}${CATALOGUE_PDF}`,
    social: SOCIAL_LINKS,
  };
}

export function contactDetails() {
  return {
    preferredChannel: "WhatsApp",
    whatsappChat: CONTACT.whatsappChat,
    phones: CONTACT.phones,
    email: CONTACT.email,
    offices: OFFICES,
    contactPage: absoluteUrl("/contact"),
    note: "WhatsApp or a call is the fastest way to discuss a plant, a site visit or a quote. Share the water report or effluent characteristics and the daily flow (KLD) if you have them.",
  };
}

export function solutionsList() {
  return SOLUTIONS.map(({ slug, title, short, category, summary, body, highlights }) => ({
    slug,
    title,
    abbreviation: short,
    category: CATEGORIES.find((c) => c.id === category)!.title,
    summary,
    description: body.join(" "),
    highlights: highlights.points,
    url: absoluteUrl(solutionPath(slug)),
  }));
}

export function clientsList() {
  return {
    featured: FEATURED_BRANDS.map(({ name, sector, note }) => ({ name, sector, note })),
    installations: INSTALLATIONS,
  };
}

/** /llms.txt, following the llmstxt.org layout. */
export function llmsTxt(): string {
  const o = companyOverview();
  const c = contactDetails();
  const lines = [
    `# ${SITE_NAME} (${CONTACT.legalName})`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    o.positioning,
    "",
    `Founders: ${FOUNDERS.map((f) => `${f.name} (${f.role})`).join("; ")}.`,
    "",
    `Featured clients: ${FEATURED_BRANDS.map((b) => b.name).join(", ")}, plus hospitals, institutions (e.g. MNIT Prayagraj), resorts, builders and textile units across North India.`,
    "",
    `Industries served: ${INDUSTRIES.join(", ")}.`,
    "",
    "## Pages",
    "",
    ...INDEXED_PAGES.filter((p) => !p.path.startsWith("/solutions/")).map(
      (p) => `- [${p.title}](${absoluteUrl(p.path)}): ${p.description}`,
    ),
    "",
    "## Solutions",
    "",
    ...CATEGORIES.flatMap((cat) => [
      `### ${cat.title}`,
      "",
      ...SOLUTIONS.filter((s) => s.category === cat.id).map(
        (s) => `- [${s.title}](${absoluteUrl(solutionPath(s.slug))}): ${s.summary}`,
      ),
      "",
    ]),
    `Field services: ${FIELD_SERVICES.join(", ")}.`,
    "",
    "## Contact",
    "",
    `- WhatsApp (preferred): ${c.whatsappChat}`,
    `- Phone: ${c.phones.join(", ")}`,
    `- Email: ${c.email}`,
    `- Offices: ${OFFICES.map((x) => `${x.city} (${x.kind})`).join(", ")}`,
    "",
    "## For AI agents",
    "",
    `- MCP server (Streamable HTTP, no auth, read-only): ${SITE_URL}${MCP_PATH}`,
    "  Tools: get_company_overview, get_founders, list_solutions, get_solution, list_clients, get_contact.",
    `- MCP server card: ${SITE_URL}/.well-known/mcp/server-card.json`,
    `- API catalog (RFC 9727): ${SITE_URL}/.well-known/api-catalog`,
    "- Every page is also available as Markdown: request its URL with `Accept: text/markdown`.",
    `- Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
    "## Optional",
    "",
    `- [Product catalogue (PDF)](${o.catalogue})`,
    ...Object.entries(SOCIAL_LINKS).map(([name, url]) => `- [${name}](${url})`),
    "",
  ];
  return lines.join("\n");
}
