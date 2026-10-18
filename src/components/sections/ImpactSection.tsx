import { INDUSTRIES } from "@/lib/clients";
import { OFFICES } from "@/lib/contact";
import { SOLUTIONS } from "@/lib/solutions";

/** Figures are all sourced: offices and solutions are counted from data; the 90% is the W-CWT claim on the current site. */
const STATS = [
  { value: OFFICES.length, suffix: "", label: "Offices and factory across UP, Uttarakhand, MP and Rajasthan" },
  { value: SOLUTIONS.length, suffix: "", label: "Treatment solutions, from softeners to ZLD" },
  { value: INDUSTRIES.length, suffix: "", label: "Industries served, from cement to hospitals" },
  { value: 90, suffix: "%", label: "Less electricity with our Green STP (W-CWT)" },
];

export function ImpactSection() {
  return (
    <section aria-labelledby="impact-title" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 id="impact-title" className="sr-only">
          Watwa in numbers
        </h2>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-fg/10 bg-fg/10 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex flex-col-reverse gap-4 bg-canvas p-7 md:p-10" data-reveal data-reveal-delay={String(i * 0.1)}>
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="font-display text-6xl font-semibold tracking-tight text-gradient md:text-7xl" data-count={s.value} data-count-suffix={s.suffix}>
                {s.value}
                {s.suffix}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-24 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow" data-reveal>
              Industries
            </p>
            <p className="mt-6 font-display text-3xl leading-tight font-semibold tracking-tight md:text-4xl" data-split>
              Wherever water is used, it has to be treated.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:col-span-8">
            {INDUSTRIES.map((name, i) => (
              <li
                key={name}
                className="group relative overflow-hidden rounded-2xl border border-fg/10 p-5 transition-colors duration-500 hover:border-accent/50"
                data-reveal
                data-reveal-delay={String((i % 3) * 0.08)}
              >
                <span aria-hidden="true" className="absolute inset-0 -translate-y-full bg-gradient-to-b from-teal/12 to-transparent transition-transform duration-700 ease-water group-hover:translate-y-0" />
                <span className="relative font-mono text-[0.65rem] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="relative mt-3 block font-display text-lg">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
