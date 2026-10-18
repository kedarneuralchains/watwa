import { Button } from "@/components/ui/Button";
import { FounderPortrait } from "@/components/ui/FounderPortrait";
import { TiltCard } from "@/components/ui/TiltCard";
import { FOUNDERS } from "@/lib/founders";

/**
 * The founders, given the space the client asked for: in this market people
 * know Watwa by its founders' faces, so the home page leads with them.
 */
export function FoundersSection() {
  return (
    <section aria-labelledby="founders-title" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden="true" className="caustics absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow" data-reveal>
              The faces behind Watwa
            </p>
            <h2 id="founders-title" className="mt-6 font-display text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.98] font-semibold tracking-[-0.03em]" data-split>
              People in this industry know us <span className="font-serif font-normal italic text-accent">by face.</span> That’s how we like it.
            </h2>
          </div>
          <p className="text-lg text-muted md:col-span-5" data-reveal data-reveal-delay="0.2">
            Watwa isn’t a call centre or a brochure. When you call, a founder answers. When we commission, a founder is
            on site. That is the reputation our clients come back for.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-2 md:gap-14">
          {FOUNDERS.map((f, i) => (
            <article key={f.slug} className={i === 1 ? "md:mt-28" : ""} data-reveal data-reveal-delay={String(i * 0.15)}>
              <TiltCard className="group overflow-hidden rounded-[2rem] border border-fg/10 shadow-[0_40px_100px_-40px_rgb(11_132_165/0.35)]" max={7}>
                <div className="relative aspect-[4/5]">
                  <FounderPortrait founder={f} sizes="(min-width: 768px) 45vw, 100vw" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-canvas via-canvas/70 to-transparent p-8 pt-32 [transform:translateZ(40px)]">
                    <p className="eyebrow">{f.role}</p>
                    <h3 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">{f.name}</h3>
                  </div>
                </div>
              </TiltCard>
              <blockquote className="mt-8 border-l-2 border-ember pl-6">
                <p className="font-serif text-2xl leading-snug text-fg italic md:text-3xl">“{f.quote}”</p>
              </blockquote>
              <p className="mt-5 text-muted">{f.bio}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-center" data-reveal>
          <Button href="/about" variant="ghost">
            Read the Watwa story
          </Button>
        </div>
      </div>
    </section>
  );
}
