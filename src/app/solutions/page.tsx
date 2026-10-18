import Image from "next/image";
import Link from "next/link";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { TiltCard } from "@/components/ui/TiltCard";
import { pageMetadata } from "@/lib/seo";
import { solutionsJsonLd } from "@/lib/site";
import { CATEGORIES, FIELD_SERVICES, solutionPath, solutionsIn } from "@/lib/solutions";

export const metadata = pageMetadata({
  path: "/solutions",
  title: "Water & Wastewater Treatment Solutions: ETP, STP, RO, DM, ZLD",
  description: "Effluent and sewage treatment plants, RO, DM, EDI, softeners, ultrafiltration, zero liquid discharge, evaporators, and the pumps, membranes and chemicals that run them.",
});

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={solutionsJsonLd()} />
      <PageHero
        eyebrow="Solutions"
        title={
          <>
            The whole water cycle, <span className="font-serif font-normal italic text-accent">under one roof.</span>
          </>
        }
        lead={`Design, fabrication, supply, erection and commissioning, then ${FIELD_SERVICES.join(", ").toLowerCase()}.`}
      />

      {CATEGORIES.map((c, ci) => (
        <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="scroll-mt-24 border-t border-fg/5 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="font-mono text-xs text-accent">0{ci + 1}</span>
                <h2 id={`${c.id}-title`} className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-6xl" data-split>
                  {c.title}
                </h2>
              </div>
              <p className="max-w-md text-muted" data-reveal>
                {c.tagline}
              </p>
            </div>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {solutionsIn(c.id).map((s, i) => (
                <li key={s.slug} data-reveal data-reveal-delay={String((i % 3) * 0.1)}>
                  <TiltCard className="group h-full overflow-hidden rounded-[1.75rem] border border-fg/10 bg-canvas-2" max={8}>
                    <Link href={solutionPath(s.slug)} className="flex h-full flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-water group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-canvas-2/60 via-transparent to-transparent" />
                        <span className="absolute top-4 right-4 rounded-full bg-canvas/70 px-3 py-1 font-mono text-xs text-accent backdrop-blur">{s.short}</span>
                      </div>
                      <div className="flex flex-1 flex-col p-6 [transform:translateZ(30px)]">
                        <h3 className="font-display text-2xl font-semibold tracking-tight group-hover:text-accent">{s.title}</h3>
                        <p className="mt-3 text-muted">{s.summary}</p>
                        <span className="mt-auto pt-6 text-sm font-semibold text-accent">Details →</span>
                      </div>
                    </Link>
                  </TiltCard>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <div className="pt-12">
        <CtaSection />
      </div>
    </>
  );
}
