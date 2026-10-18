/**
 * Markdown versions of the site's pages, served when an agent asks for
 * `Accept: text/markdown` (next.config.ts rewrites those requests to
 * src/app/md). Built from the same data the pages render, like llms.txt.
 */
import { contactDetails, llmsTxt } from "@/lib/ai/knowledge";
import { FEATURED_BRANDS, INSTALLATIONS } from "@/lib/clients";
import { FOUNDERS } from "@/lib/founders";
import { CATEGORIES, SOLUTIONS, getSolution, solutionPath, type Solution } from "@/lib/solutions";
import { INDEXED_PAGES, SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/site";

export const markdownPaths = (): string[] => INDEXED_PAGES.map((p) => p.path);

function contactSection(): string[] {
  const c = contactDetails();
  return [
    "## Contact",
    "",
    `- WhatsApp (preferred): ${c.whatsappChat}`,
    `- Phone: ${c.phones.join(", ")}`,
    `- Email: ${c.email}`,
    "",
    ...c.offices.map((o) => `- **${o.city}** (${o.kind}): ${o.address}${o.phones ? `. Tel ${o.phones.join(", ")}` : ""}`),
    "",
    c.note,
  ];
}

function solutionMarkdown(s: Solution): string[] {
  return [
    `# ${s.title}`,
    "",
    `> ${s.summary}`,
    "",
    `Category: ${CATEGORIES.find((c) => c.id === s.category)!.title}.`,
    "",
    ...s.body.flatMap((p) => [p, ""]),
    `## ${s.highlights.heading}`,
    "",
    ...s.highlights.points.map((p) => `- ${p}`),
    "",
    ...(s.specs
      ? [
          `## ${s.specs.caption}`,
          "",
          `| ${s.specs.columns.join(" | ")} |`,
          `| ${s.specs.columns.map(() => "---").join(" | ")} |`,
          ...s.specs.rows.map((r) => `| ${r.join(" | ")} |`),
          "",
        ]
      : []),
    ...contactSection(),
  ];
}

/** The Markdown for one page path, or undefined when the path has none. */
export function pageMarkdown(path: string): string | undefined {
  const lines = pageLines(path);
  return lines && `${lines.join("\n").trimEnd()}\n`;
}

function pageLines(path: string): string[] | undefined {
  if (path === "/") return [llmsTxt()];

  if (path === "/about") {
    return [
      `# About ${SITE_NAME}`,
      "",
      `> ${SITE_DESCRIPTION}`,
      "",
      "## Founders",
      "",
      ...FOUNDERS.flatMap((f) => [`### ${f.name}, ${f.role}`, "", f.bio, "", `> ${f.quote}`, ""]),
      ...contactSection(),
    ];
  }

  if (path === "/solutions") {
    return [
      `# Solutions | ${SITE_NAME}`,
      "",
      ...CATEGORIES.flatMap((c) => [
        `## ${c.title}`,
        "",
        c.tagline,
        "",
        ...SOLUTIONS.filter((s) => s.category === c.id).map(
          (s) => `- [${s.title}](${absoluteUrl(solutionPath(s.slug))}): ${s.summary}`,
        ),
        "",
      ]),
      ...contactSection(),
    ];
  }

  if (path.startsWith("/solutions/")) {
    const s = getSolution(path.slice("/solutions/".length));
    return s && solutionMarkdown(s);
  }

  if (path === "/clients") {
    return [
      `# Clients | ${SITE_NAME}`,
      "",
      "## Featured",
      "",
      ...FEATURED_BRANDS.map((b) => `- **${b.name}** (${b.sector}): ${b.note}`),
      "",
      "## Installation references",
      "",
      "| Client | Location | Plant | Capacity (KLD) |",
      "| --- | --- | --- | --- |",
      ...INSTALLATIONS.map((i) => `| ${i.client} | ${i.location} | ${i.plant} | ${i.capacityKld} |`),
    ];
  }

  if (path === "/contact") return [`# Contact ${SITE_NAME}`, "", ...contactSection().slice(2)];

  return undefined;
}
