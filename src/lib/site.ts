/**
 * Site-wide identity for SEO and machine-readable output: metadata,
 * sitemap, robots, JSON-LD, llms.txt and the MCP server all read from here.
 *
 * SITE_URL defaults to the live domain; set NEXT_PUBLIC_SITE_URL to
 * override it (e.g. for a staging deploy) so canonicals point at the right host.
 */
import { CONTACT, OFFICES, SOCIAL_LINKS } from "@/lib/contact";
import { INDUSTRIES } from "@/lib/clients";
import { FOUNDERS } from "@/lib/founders";
import { SOLUTIONS, solutionPath } from "@/lib/solutions";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://watwagroup.com").replace(/\/$/, "");

export const SITE_NAME = "Watwa Group";
export const SITE_TAGLINE = "We Are All About Water";

export const SITE_DESCRIPTION =
  "Watwa Engineers designs, builds and maintains water and wastewater treatment plants (ETP, STP, RO, DM, ZLD) for industry, hospitals and campuses across North India. Trusted by JK Cement. Head office in Bareilly, Uttar Pradesh.";

export type SitePage = {
  path: string;
  title: string;
  description: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

export const INDEXED_PAGES: SitePage[] = [
  { path: "/", title: "Home", description: SITE_DESCRIPTION, priority: 1, changeFrequency: "monthly" },
  {
    path: "/about",
    title: "About & Founders",
    description: "Watwa's story, founders Shashi Kant Vishwakarma and Kuldeep, and how the company works.",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/solutions",
    title: "Solutions",
    description: "Water treatment, wastewater treatment, water recycling, zero liquid discharge, and components.",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  ...SOLUTIONS.map((s) => ({
    path: solutionPath(s.slug),
    title: s.title,
    description: s.summary,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
  {
    path: "/clients",
    title: "Clients",
    description: "JK Cement and the hospitals, institutions and industries running Watwa plants.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/contact",
    title: "Contact",
    description: "WhatsApp, phone, email and the Watwa offices in Bareilly, Noida, Mathura, Dehradun, Jhansi, Gwalior and Jodhpur.",
    priority: 0.8,
    changeFrequency: "yearly",
  },
];

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

const ORG_ID = `${SITE_URL}/#organization`;
const personId = (slug: string) => `${SITE_URL}/about#${slug}`;

/** Organization + WebSite + founders, rendered once in the root layout. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": ORG_ID,
        name: SITE_NAME,
        legalName: CONTACT.legalName,
        alternateName: ["Watwa Engineers", "Watwa"],
        slogan: SITE_TAGLINE,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        logo: `${SITE_URL}/images/brand/watwa-logo.png`,
        image: `${SITE_URL}/opengraph-image`,
        email: CONTACT.email,
        telephone: CONTACT.phones[1],
        foundingDate: CONTACT.founded,
        identifier: { "@type": "PropertyValue", propertyID: "CIN", value: CONTACT.cin },
        founder: FOUNDERS.map((f) => ({ "@id": personId(f.slug) })),
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT.headOffice.street,
          addressLocality: CONTACT.headOffice.city,
          addressRegion: CONTACT.headOffice.region,
          postalCode: CONTACT.headOffice.postalCode,
          addressCountry: "IN",
        },
        location: OFFICES.map((o) => ({ "@type": "Place", name: `Watwa ${o.city} (${o.kind})`, address: o.address })),
        areaServed: ["Uttar Pradesh", "Uttarakhand", "Madhya Pradesh", "Rajasthan", "Delhi NCR", "India"],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: CONTACT.phones[1],
            email: CONTACT.email,
            url: CONTACT.whatsapp,
            availableLanguage: ["English", "Hindi"],
          },
        ],
        sameAs: Object.values(SOCIAL_LINKS),
        knowsAbout: [...SOLUTIONS.map((s) => s.title), "Water audits", "Operation and maintenance of treatment plants"],
        audience: { "@type": "BusinessAudience", audienceType: INDUSTRIES.join(", ") },
      },
      ...FOUNDERS.map((f) => ({
        "@type": "Person",
        "@id": personId(f.slug),
        name: f.name,
        jobTitle: f.role,
        description: f.bio,
        worksFor: { "@id": ORG_ID },
        ...(f.photo && { image: `${SITE_URL}${f.photo}` }),
      })),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en-IN",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/** ItemList of solutions for /solutions and the home page. */
export function solutionsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} solutions`,
    itemListElement: SOLUTIONS.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        "@id": `${absoluteUrl(solutionPath(s.slug))}#service`,
        url: absoluteUrl(solutionPath(s.slug)),
        name: s.title,
        description: s.summary,
        provider: { "@id": ORG_ID },
        areaServed: "IN",
      },
    })),
  };
}

/** Service + BreadcrumbList for a solution page. */
export function solutionJsonLd(slug: string) {
  const s = SOLUTIONS.find((x) => x.slug === slug)!;
  const url = absoluteUrl(solutionPath(slug));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        url,
        name: s.title,
        serviceType: s.title,
        description: s.summary,
        image: `${SITE_URL}${s.image}`,
        provider: { "@id": ORG_ID },
        areaServed: "IN",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Solutions", item: absoluteUrl("/solutions") },
          { "@type": "ListItem", position: 3, name: s.title, item: url },
        ],
      },
    ],
  };
}
