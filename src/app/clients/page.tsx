import { BrandsSection } from "@/components/sections/BrandsSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { INSTALLATIONS } from "@/lib/clients";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/clients",
  title: "Clients & Installations",
  description: "JK Cement and the hospitals, institutions, resorts, builders and textile units running Watwa ETPs and STPs across North India.",
});

export default function ClientsPage() {
  const total = INSTALLATIONS.reduce((sum, i) => sum + i.capacityKld, 0);
  return (
    <>
      <PageHero
        eyebrow="Clients"
        title={
          <>
            From national brands to the <span className="font-serif font-normal italic text-accent">hospital next door.</span>
          </>
        }
        lead="Large or small, every plant gets the same engineering, and the same founders on the phone."
      />
      <BrandsSection />

      <section aria-labelledby="installations-title" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 id="installations-title" className="font-display text-4xl font-semibold tracking-tight md:text-5xl" data-split>
              Installation references
            </h2>
            <p className="text-muted" data-reveal>
              {INSTALLATIONS.length} sites listed · <span className="text-fg">{total} KLD</span> treated capacity
            </p>
          </div>
          <div className="mt-10 overflow-x-auto rounded-[1.5rem] border border-fg/10" data-reveal>
            <table className="w-full min-w-[40rem] text-left">
              <thead className="bg-fg/5 font-mono text-xs tracking-wider text-accent uppercase">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium">Client</th>
                  <th scope="col" className="px-6 py-4 font-medium">Location</th>
                  <th scope="col" className="px-6 py-4 font-medium">Plant</th>
                  <th scope="col" className="px-6 py-4 text-right font-medium">Capacity</th>
                </tr>
              </thead>
              <tbody>
                {INSTALLATIONS.map((i) => (
                  <tr key={i.client + i.location} className="border-t border-fg/5 transition-colors hover:bg-fg/[0.03]">
                    <th scope="row" className="px-6 py-4 font-semibold text-fg">{i.client}</th>
                    <td className="px-6 py-4 text-muted">{i.location}</td>
                    <td className="px-6 py-4 text-muted">{i.plant}</td>
                    <td className="px-6 py-4 text-right font-mono text-accent">{i.capacityKld} KLD</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted">KLD = kilolitres per day. STP = sewage treatment; ETP = effluent treatment; MBBR = moving bed bio-reactor; CWT = constructed wetland.</p>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
