import type { NextConfig } from "next";

/** Pages with a Markdown version (src/lib/ai/markdown.ts); keep in step with INDEXED_PAGES. */
const MARKDOWN_PAGES = ["/", "/about", "/solutions", "/solutions/:slug", "/clients", "/contact"];

/** RFC 8288 Link header on every page: where agents find the machine-readable entry points. */
const AGENT_LINKS = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(", ");

const nextConfig: NextConfig = {
  async redirects() {
    // Old static-site URLs, so existing links and search results keep working.
    const old: [string, string][] = [
      ["/Default.html", "/"],
      ["/About.html", "/about"],
      ["/contact.html", "/contact"],
      ["/Services/Client-Portfolio.html", "/clients"],
      ["/Services/effluent-treatment-plants.html", "/solutions/effluent-treatment-plants"],
      ["/Services/sewage-treatment-plants.html", "/solutions/sewage-treatment-plants"],
      ["/Services/green-sewage-treatment-plant-w-cwt-system.html", "/solutions/green-sewage-treatment-plant"],
      ["/Services/reverse-osmosis-ro-plants.html", "/solutions/reverse-osmosis-plants"],
      ["/Services/DM-WATER-FILTRATION-PLANTS.html", "/solutions/dm-water-filtration-plants"],
      ["/Services/electro-deionisation-edi-systems.html", "/solutions/edi-systems"],
      ["/Services/water-softeners.html", "/solutions/water-softeners"],
      ["/Services/ultra-filtration-systems.html", "/solutions/ultra-filtration-systems"],
      ["/Services/zero-liquid-discharge-zld.html", "/solutions/zero-liquid-discharge"],
      ["/Services/evaporators.html", "/solutions/evaporators"],
      ["/Services/uf-membranes.html", "/solutions/uf-membranes"],
      ["/Services/high-pressure-pumps.html", "/solutions/high-pressure-pumps"],
      ["/Services/dosing-pump.html", "/solutions/dosing-pumps"],
      ["/Services/water-treatment-chemicals.html", "/solutions/water-treatment-chemicals"],
      ["/Services/testing-instruments.html", "/solutions/testing-instruments"],
      ["/images/Watwa_Catlogue.pdf", "/docs/watwa-catalogue.pdf"],
    ];
    return old.map(([source, destination]) => ({ source, destination, permanent: true }));
  },

  async rewrites() {
    return {
      // Markdown content negotiation: `Accept: text/markdown` on a page URL
      // gets that page as Markdown (src/app/md) instead of HTML.
      beforeFiles: MARKDOWN_PAGES.map((source) => ({
        source,
        has: [{ type: "header" as const, key: "accept", value: ".*text/markdown.*" }],
        destination: source === "/" ? "/md" : `/md${source}`,
      })),
    };
  },

  async headers() {
    return MARKDOWN_PAGES.map((source) => ({
      source,
      headers: [
        { key: "Link", value: AGENT_LINKS },
        { key: "Vary", value: "Accept" },
      ],
    }));
  },
};

export default nextConfig;
