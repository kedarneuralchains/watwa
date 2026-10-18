import Image from "next/image";
import Link from "next/link";
import { TiltCard } from "@/components/ui/TiltCard";
import { FEATURED_BRANDS, INSTALLATIONS } from "@/lib/clients";

/**
 * Big brands first, shown large; then the long tail of installations as a
 * marquee. When the client confirms more national brands, adding them to
 * FEATURED_BRANDS grows the grid automatically.
 */
export function BrandsSection() {
  const names = [...new Set(INSTALLATIONS.map((i) => i.client))];
  return (
    <section aria-labelledby="brands-title" className="relative border-y border-fg/5 bg-canvas-2 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="eyebrow" data-reveal>
          Trusted by
        </p>
        <h2 id="brands-title" className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-[1] font-semibold tracking-[-0.03em]" data-split>
          Names India builds on <span className="font-serif font-normal italic text-ember">run on Watwa.</span>
        </h2>

        <div className={`mt-16 grid gap-6 ${FEATURED_BRANDS.length > 1 ? "md:grid-cols-2" : ""}`}>
          {FEATURED_BRANDS.map((b) => (
            <div key={b.name} data-reveal>
              <TiltCard className="group overflow-hidden rounded-[2rem] glass" max={5}>
                <div className="relative grid gap-10 p-8 md:grid-cols-[1.4fr_1fr] md:items-center md:p-14">
                  <div aria-hidden="true" className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-ember/20 blur-3xl" />
                  <div className="[transform:translateZ(50px)]">
                    <span className="inline-flex items-center gap-2 rounded-full border border-ember/40 px-3 py-1 font-mono text-[0.65rem] tracking-[0.2em] text-ember uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-ember" /> Featured client
                    </span>
                    {b.logo ? (
                      <Image src={b.logo} alt={b.name} width={480} height={160} className="mt-8 h-24 w-auto object-contain md:h-32" />
                    ) : (
                      <p className="mt-8 font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.85] font-extrabold tracking-[-0.045em] text-fg">
                        {b.name}
                      </p>
                    )}
                  </div>
                  <div className="relative [transform:translateZ(30px)]">
                    <p className="eyebrow text-muted">Sector</p>
                    <p className="mt-2 font-display text-2xl">{b.sector}</p>
                    <p className="mt-6 text-muted">{b.note}</p>
                    <Link href="/clients" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-fg">
                      All clients and installations →
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-20 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <p className="sr-only">Other clients include: {names.join(", ")}.</p>
        <div aria-hidden="true" className="marquee gap-4" style={{ "--marquee-duration": "70s" } as React.CSSProperties}>
          {[...names, ...names].map((n, i) => (
            <span key={i} className="flex shrink-0 items-center gap-4 font-display text-2xl whitespace-nowrap text-fg/35 md:text-4xl">
              {n}
              <svg viewBox="0 0 10 11" className="h-3 w-3 fill-teal">
                <polygon points="5,0 10,2.75 10,8.25 5,11 0,8.25 0,2.75" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
