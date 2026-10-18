import { Button } from "@/components/ui/Button";
import { CATALOGUE_PDF, CONTACT } from "@/lib/contact";
import { FOUNDERS } from "@/lib/founders";

export function CtaSection() {
  const lead = FOUNDERS.find((f) => f.phone);
  return (
    <section aria-labelledby="cta-title" className="px-5 pb-28 md:px-8 md:pb-36">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-accent via-teal to-[#06506a] px-6 py-20 text-center md:px-16 md:py-28" data-reveal>
        <div aria-hidden="true" className="caustics absolute inset-0 opacity-60 mix-blend-screen" />
        <div className="relative">
          <p className="eyebrow text-white/75">Start with a conversation</p>
          <h2 id="cta-title" className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[1] font-semibold tracking-[-0.03em] text-white">
            Have a plant to build, fix or run?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            Send us your water report or effluent details and daily flow. We’ll come back with a design, not a sales pitch.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href={CONTACT.whatsappChat} variant="light">
              WhatsApp us
            </Button>
            {lead?.phone && (
              <Button href={`tel:${lead.phone.replace(/\s/g, "")}`} variant="ghost">
                Call {lead.shortName}
              </Button>
            )}
            <Button href={CATALOGUE_PDF} variant="ghost">
              Download catalogue
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
