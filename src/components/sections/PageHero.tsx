import { LogoMark } from "@/components/ui/Logo";

/** Inner-page header: eyebrow, split-reveal title, lead, and a slowly drifting hex mark for depth. */
export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: React.ReactNode; lead?: string }) {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 md:pt-52 md:pb-28">
      <div aria-hidden="true" className="caustics absolute inset-0 opacity-60" />
      <div aria-hidden="true" data-parallax="0.3" className="absolute -top-10 -right-24 opacity-[0.06] md:right-10">
        <LogoMark className="h-[28rem] w-auto" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <p className="eyebrow" data-reveal>
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] font-semibold tracking-[-0.035em]" data-split>
          {title}
        </h1>
        {lead && (
          <p className="mt-8 max-w-2xl text-lg text-muted md:text-xl" data-reveal data-reveal-delay="0.2">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
