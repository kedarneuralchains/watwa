import Image from "next/image";

/**
 * "Keemat samjho paani ki!" — the line from the back of Watwa's printed catalogue, given a full-bleed moment.
 * Uses data-reveal, not data-split: SplitText's line mask clips the tall ी matra, turning की into को.
 */
export function KeematSection() {
  return (
    <section aria-labelledby="keemat-title" className="relative isolate overflow-hidden py-36 md:py-52">
      <div className="absolute inset-0 -z-10">
        <div data-parallax="0.18" className="absolute -inset-y-[20%] inset-x-0">
          <Image src="/images/brand/keemat-poster.jpg" alt="" fill sizes="100vw" className="object-cover object-right opacity-30 grayscale" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/85 to-canvas/40" />
      </div>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 id="keemat-title" lang="hi" className="font-hindi text-[clamp(3.5rem,11vw,10rem)] leading-[1.15] text-fg" data-reveal>
          कीमत समझो <span className="text-accent">पानी</span> की!
        </h2>
        <p className="mt-8 max-w-xl text-xl text-muted" data-reveal>
          <span className="font-serif text-2xl text-fg italic">Understand the value of water.</span> Every plant we
          build returns water to work, so less is drawn from the ground and nothing harmful goes back into it.
        </p>
      </div>
    </section>
  );
}
