import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { CATALOGUE_PDF, CONTACT, OFFICES } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact Watwa",
  description: "WhatsApp, call or email Watwa Engineers, or visit our offices in Bareilly, Noida, Mathura, Dehradun, Jhansi, Gwalior and Jodhpur.",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Talk to a person, <span className="font-serif font-normal italic text-accent">not a form.</span>
          </>
        }
        lead="WhatsApp is the fastest. Share your water report or effluent details and daily flow (KLD) if you have them, and we'll take it from there."
      />

      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-3 md:px-8">
          <a href={CONTACT.whatsappChat} target="_blank" rel="noopener noreferrer" className="group rounded-[2rem] bg-accent p-8 text-white transition-transform duration-500 ease-water hover:-translate-y-1" data-reveal>
            <span className="font-mono text-xs tracking-[0.2em] uppercase">Preferred</span>
            <span className="mt-6 block font-display text-3xl font-semibold">WhatsApp</span>
            <span className="mt-2 block">{CONTACT.phones[1]} →</span>
          </a>
          <div className="rounded-[2rem] glass p-8" data-reveal data-reveal-delay="0.1">
            <span className="eyebrow">Call</span>
            <ul className="mt-6 space-y-2 font-display text-2xl">
              {CONTACT.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-accent">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] glass p-8" data-reveal data-reveal-delay="0.2">
            <span className="eyebrow">Email</span>
            <a href={`mailto:${CONTACT.email}`} className="mt-6 block font-display text-2xl break-all hover:text-accent">
              {CONTACT.email}
            </a>
            <div className="mt-6">
              <Button href={CATALOGUE_PDF} variant="ghost">
                Catalogue (PDF)
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="offices-title" className="border-t border-fg/5 py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 id="offices-title" className="font-display text-4xl font-semibold tracking-tight md:text-5xl" data-split>
            Offices
          </h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-fg/10 bg-fg/10 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICES.map((o, i) => (
              <li key={o.city} className="bg-canvas p-7" data-reveal data-reveal-delay={String((i % 4) * 0.08)}>
                <span className={`font-mono text-[0.65rem] tracking-[0.2em] uppercase ${o.kind === "Branch" ? "text-muted" : "text-ember"}`}>{o.kind}</span>
                <h3 className="mt-3 font-display text-2xl font-semibold">{o.city}</h3>
                <address className="mt-3 text-sm text-muted not-italic">{o.address}</address>
                {o.phones && (
                  <p className="mt-3 text-sm">
                    {o.phones.map((p) => (
                      <a key={p} href={`tel:+91${p.replace(/\s/g, "")}`} className="mr-3 text-accent hover:text-fg">
                        {p}
                      </a>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
