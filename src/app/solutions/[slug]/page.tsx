import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/sections/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
import { solutionJsonLd } from "@/lib/site";
import { CATEGORIES, SOLUTIONS, getSolution, solutionPath } from "@/lib/solutions";

export const dynamicParams = false;

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getSolution((await params).slug);
  if (!s) return {};
  return pageMetadata({ path: solutionPath(s.slug), title: s.title, description: s.summary });
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getSolution((await params).slug);
  if (!s) notFound();
  const category = CATEGORIES.find((c) => c.id === s.category)!;
  const related = SOLUTIONS.filter((x) => x.category === s.category && x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={solutionJsonLd(s.slug)} />
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-48">
        <div aria-hidden="true" className="caustics absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:items-center md:px-8">
          <div className="md:col-span-7">
            <nav aria-label="Breadcrumb" className="font-mono text-xs tracking-[0.15em] text-muted uppercase" data-reveal>
              <Link href="/solutions" className="hover:text-accent">
                Solutions
              </Link>{" "}
              /{" "}
              <Link href={`/solutions#${category.id}`} className="hover:text-accent">
                {category.title}
              </Link>
            </nav>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,6.5vw,5.6rem)] leading-[0.95] font-semibold tracking-[-0.035em]" data-split>
              {s.title}
            </h1>
            <p className="mt-8 max-w-xl text-xl text-muted" data-reveal data-reveal-delay="0.2">
              {s.summary}
            </p>
            <div className="mt-10 flex flex-wrap gap-4" data-reveal data-reveal-delay="0.3">
              <Button href={`${CONTACT.whatsapp}?text=${encodeURIComponent(`Hello Watwa, I'd like a quote for: ${s.title}`)}`}>Get a quote</Button>
              <Button href="/contact" variant="ghost">
                Visit an office
              </Button>
            </div>
          </div>
          <div className="md:col-span-5" data-reveal data-reveal-delay="0.2">
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-fg/10">
              <div data-parallax="0.12" className="absolute -inset-y-[15%] inset-x-0">
                <Image src={s.image} alt={`${s.title} by Watwa`} fill priority sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:px-8">
          <div className="space-y-6 text-lg text-muted md:col-span-7">
            {s.body.map((p) => (
              <p key={p} data-reveal>
                {p}
              </p>
            ))}
          </div>
          <aside className="md:col-span-5" data-reveal>
            <div className="rounded-[2rem] glass p-8">
              <h2 className="eyebrow">{s.highlights.heading}</h2>
              <ul className="mt-6 space-y-4">
                {s.highlights.points.map((p) => (
                  <li key={p} className="flex gap-3 text-fg">
                    <svg viewBox="0 0 10 11" aria-hidden="true" className="mt-1.5 h-3 w-3 shrink-0 fill-accent">
                      <polygon points="5,0 10,2.75 10,8.25 5,11 0,8.25 0,2.75" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {s.specs && (
          <div className="mx-auto mt-16 max-w-7xl px-5 md:px-8" data-reveal>
            <div className="overflow-x-auto rounded-[1.5rem] border border-fg/10">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <caption className="p-5 text-left font-display text-xl text-fg">{s.specs.caption}</caption>
                <thead className="bg-fg/5 font-mono text-xs tracking-wider text-accent uppercase">
                  <tr>
                    {s.specs.columns.map((c) => (
                      <th key={c} scope="col" className="px-5 py-3 font-medium">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.specs.rows.map((r) => (
                    <tr key={r[0]} className="border-t border-fg/5">
                      {r.map((cell, i) =>
                        i === 0 ? (
                          <th key={i} scope="row" className="px-5 py-3 font-semibold text-fg">
                            {cell}
                          </th>
                        ) : (
                          <td key={i} className="px-5 py-3 text-muted">
                            {cell}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-fg/5 py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <h2 id="related-title" className="font-display text-3xl font-semibold">
              More in {category.title}
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={solutionPath(r.slug)} className="group block rounded-2xl border border-fg/10 p-6 transition-colors hover:border-accent/50">
                    <span className="font-mono text-xs text-accent">{r.short}</span>
                    <span className="mt-2 block font-display text-xl group-hover:text-accent">{r.title}</span>
                    <span className="mt-2 block text-sm text-muted">{r.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="pt-12">
        <CtaSection />
      </div>
    </>
  );
}
