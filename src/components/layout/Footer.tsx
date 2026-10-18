import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { NAV } from "@/lib/nav";
import { CATALOGUE_PDF, CONTACT, OFFICES, SOCIAL_LINKS } from "@/lib/contact";
import { SOLUTIONS, solutionPath } from "@/lib/solutions";

const FOOTER_SOLUTIONS = ["effluent-treatment-plants", "sewage-treatment-plants", "reverse-osmosis-plants", "zero-liquid-discharge", "green-sewage-treatment-plant", "dm-water-filtration-plants"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-fg/5 bg-canvas-2">
      <div aria-hidden="true" className="caustics absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-10 md:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-muted">
              {CONTACT.legalName}. Water and wastewater treatment plants, designed, built and maintained from Bareilly
              for North India.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="rounded-full glass px-4 py-2 capitalize text-muted hover:text-accent">
                  {name === "x" ? "X / Twitter" : name}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="eyebrow">Company</h2>
            <ul className="mt-5 space-y-3 text-muted">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-fg">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={CATALOGUE_PDF} className="hover:text-fg">
                  Catalogue (PDF)
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="eyebrow">Solutions</h2>
            <ul className="mt-5 space-y-3 text-muted">
              {FOOTER_SOLUTIONS.map((slug) => {
                const s = SOLUTIONS.find((x) => x.slug === slug)!;
                return (
                  <li key={slug}>
                    <Link href={solutionPath(slug)} className="hover:text-fg">
                      {s.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="eyebrow">Reach us</h2>
            <ul className="mt-5 space-y-3 text-muted">
              {CONTACT.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-fg">
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-fg">
                  {CONTACT.email}
                </a>
              </li>
              <li className="text-sm">{OFFICES.map((o) => o.city).join(" · ")}</li>
            </ul>
          </div>
        </div>

        <p aria-hidden="true" className="mt-20 select-none text-center font-display text-[18vw] leading-none font-bold tracking-tight text-fg/[0.035] md:text-[15vw]">
          WATWA
        </p>

        <div className="mt-6 flex flex-col justify-between gap-4 border-t border-fg/5 pt-6 text-xs text-muted/70 md:flex-row">
          <p>
            © {new Date().getFullYear()} {CONTACT.legalName}. CIN {CONTACT.cin}.
          </p>
          <p>
            For AI assistants: <a href="/llms.txt" className="underline hover:text-accent">llms.txt</a> ·{" "}
            <a href="/.well-known/mcp/server-card.json" className="underline hover:text-accent">MCP server</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
