"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATEGORIES, SOLUTIONS, solutionPath } from "@/lib/solutions";

gsap.registerPlugin(ScrollTrigger);

const COVER: Record<string, string> = {
  "water-treatment": "/images/solutions/ro-plant.jpg",
  "wastewater-treatment": "/images/solutions/etp.jpg",
  "water-recycle": "/images/solutions/uf-system.jpg",
  "zero-liquid-discharge": "/images/solutions/zld.jpg",
  components: "/images/solutions/uf-membrane.jpg",
};

/**
 * The water journey as a horizontal rail: on desktop the section pins and
 * scroll drives the panels sideways, with each panel's image counter-moving
 * for depth. On touch screens and with reduced motion it is a plain
 * swipeable row.
 */
export function SolutionsRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const distance = () => t.scrollWidth - window.innerWidth;
      const tween = gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      t.querySelectorAll<HTMLElement>("[data-rail-img]").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -12 },
          {
            xPercent: 12,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} aria-labelledby="solutions-title" className="relative overflow-hidden py-24 lg:flex lg:h-screen lg:items-center lg:py-0">
      <div ref={track} className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 md:px-8 lg:snap-none lg:overflow-visible lg:pb-0 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        <div className="flex w-[85vw] shrink-0 snap-start flex-col justify-center sm:w-[28rem] lg:w-[34rem] lg:pr-10">
          <p className="eyebrow">What we build</p>
          <h2 id="solutions-title" className="mt-6 font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.03em]">
            From raw water to <span className="font-serif font-normal italic text-accent">zero discharge.</span>
          </h2>
          <p className="mt-6 text-lg text-muted">
            Fifteen solutions across the whole water cycle, each designed around your water report and flow, not a
            catalogue model.
          </p>
          <Link href="/solutions" className="mt-8 inline-flex items-center gap-2 font-semibold text-accent hover:text-fg">
            See every solution →
          </Link>
        </div>

        {CATEGORIES.map((c, i) => {
          const items = SOLUTIONS.filter((s) => s.category === c.id);
          return (
            <article key={c.id} className="group relative flex h-[34rem] w-[85vw] shrink-0 snap-start flex-col overflow-hidden rounded-[2rem] border border-fg/10 bg-canvas-2 sm:w-[26rem] lg:h-[70vh] lg:w-[30rem]">
              <div className="relative h-1/2 overflow-hidden">
                <Image data-rail-img src={COVER[c.id]} alt="" fill sizes="(min-width: 1024px) 30rem, 85vw" className="scale-125 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas-2 via-transparent to-transparent" />
                <span className="absolute top-5 left-5 rounded-full bg-canvas/75 px-3 py-1 font-mono text-xs tracking-[0.2em] text-accent backdrop-blur">0{i + 1} / 0{CATEGORIES.length}</span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-3xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-muted">{c.tagline}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {items.map((s) => (
                    <li key={s.slug}>
                      <Link href={solutionPath(s.slug)} className="inline-block rounded-full border border-fg/10 px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent">
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
        <div aria-hidden="true" className="hidden w-[10vw] shrink-0 lg:block" />
      </div>
    </section>
  );
}
