import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { FounderPortrait } from "@/components/ui/FounderPortrait";
import { TiltCard } from "@/components/ui/TiltCard";
import { CONTACT } from "@/lib/contact";
import { FOUNDERS } from "@/lib/founders";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/about",
  title: "About Watwa & Our Founders",
  description: "Meet Shashi Kant Vishwakarma and Kuldeep, the founders of Watwa Engineers, and the story of a company 100% focused on water.",
});

/** Rewritten from the current site's About page and catalogue. */
const BELIEFS = [
  {
    title: "100% water",
    text: "We do one thing. Our entire focus is water and wastewater: evaluating the problem, designing the solution, manufacturing the system and commissioning it in the field.",
  },
  {
    title: "Compact, efficient, simple",
    text: "Our plants are designed to take little space, use little energy and be simple to run, because a plant your operators can't run isn't a solution.",
  },
  {
    title: "Partnership",
    text: "We build long-term relationships with customers, engineering firms, suppliers and representatives, and we consider them our most important asset.",
  },
  {
    title: "Responsibility",
    text: "Water pollution and water shortage are two of the most pressing problems we face. We see our role as protecting the environment while running a responsible, profitable business.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About & founders"
        title={
          <>
            A company you know <span className="font-serif font-normal italic text-accent">by its people.</span>
          </>
        }
        lead="Watwa was founded to solve hard water problems: treatment, reuse and wastewater. It grew the old-fashioned way, one plant and one handshake at a time."
      />

      {FOUNDERS.map((f, i) => (
        <section key={f.slug} id={f.slug} aria-labelledby={`${f.slug}-name`} className="relative scroll-mt-24 py-16 md:py-24">
          <div className={`mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:items-center md:px-8 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="md:col-span-6" data-reveal>
              <TiltCard className="overflow-hidden rounded-[2.5rem] border border-fg/10 shadow-[0_50px_120px_-50px_rgb(11_132_165/0.4)]" max={6}>
                <div className="relative aspect-[4/5]">
                  <FounderPortrait founder={f} priority={i === 0} sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
              </TiltCard>
            </div>
            <div className="md:col-span-6 md:px-6">
              <p className="eyebrow" data-reveal>
                {f.role}
              </p>
              <h2 id={`${f.slug}-name`} className="mt-4 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[0.95] font-semibold tracking-[-0.035em]" data-split>
                {f.name}
              </h2>
              <blockquote className="mt-10 border-l-2 border-ember pl-6" data-reveal>
                <p className="font-serif text-3xl leading-snug text-fg italic">“{f.quote}”</p>
              </blockquote>
              <p className="mt-8 text-lg text-muted" data-reveal>
                {f.bio}
              </p>
              {f.phone && (
                <div className="mt-10" data-reveal>
                  <Button href={`tel:${f.phone.replace(/\s/g, "")}`} variant="ghost">
                    Call {f.shortName}: {f.phone}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="beliefs-title" className="relative border-t border-fg/5 bg-canvas-2 py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow" data-reveal>
            What we stand for
          </p>
          <h2 id="beliefs-title" className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1] font-semibold tracking-[-0.03em]" data-split>
            Built with passion, <span className="font-serif font-normal italic text-accent">judged by performance.</span>
          </h2>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {BELIEFS.map((b, i) => (
              <div key={b.title} className="rounded-[2rem] glass p-8 md:p-10" data-reveal data-reveal-delay={String((i % 2) * 0.12)}>
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl font-semibold">{b.title}</h3>
                <p className="mt-3 text-muted">{b.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-16 text-sm text-muted" data-reveal>
            {CONTACT.legalName} · Incorporated {new Date(CONTACT.founded).getFullYear()} · CIN {CONTACT.cin}
          </p>
        </div>
      </section>

      <div className="pt-28 md:pt-36">
        <CtaSection />
      </div>
    </>
  );
}
