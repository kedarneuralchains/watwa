"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { FEATURED_BRANDS } from "@/lib/clients";
import { FOUNDERS } from "@/lib/founders";

/** WebGL only runs client-side; the static mark below shows while it loads or if WebGL is unavailable. */
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center md:place-items-end md:pr-[12vw]">
      <LogoMark className="h-48 w-auto opacity-30 blur-[1px] md:h-72" />
    </div>
  ),
});

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-end overflow-hidden pt-28 pb-10 md:items-center">
      <div className="absolute inset-0 -z-10">
        <HeroScene />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-canvas via-canvas/70 to-transparent md:via-canvas/40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-canvas to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <p className="eyebrow" data-reveal>
          Watwa Engineers Pvt. Ltd. · Bareilly, India
        </p>
        <h1 id="hero-title" className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,7vw,6.2rem)] leading-[0.92] font-semibold tracking-[-0.035em]" data-split>
          Every drop, <span className="font-serif font-normal italic text-accent">engineered</span> to flow again.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-muted md:text-xl" data-reveal data-reveal-delay="0.3">
          ETP, STP, RO, DM and zero-liquid-discharge plants, designed, built and run by people you can call by
          name.
        </p>
        <div className="mt-8 flex flex-wrap gap-4" data-reveal data-reveal-delay="0.45">
          <Button href="/solutions">Explore solutions</Button>
          <Button href="/about" variant="ghost">
            Meet the founders
          </Button>
        </div>

        <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-[auto_auto_1fr] md:items-center md:gap-10" data-reveal data-reveal-delay="0.6">
          <Link href="/about" className="group flex items-center gap-4">
            <span className="flex -space-x-3">
              {FOUNDERS.map((f) => (
                <span key={f.slug} className="hex-clip grid h-12 w-11 place-items-center bg-gradient-to-br from-teal to-accent font-display text-sm font-semibold text-white ring-2 ring-canvas">
                  {f.initials}
                </span>
              ))}
            </span>
            <span className="text-sm leading-tight">
              <span className="block text-muted">Led by</span>
              <span className="font-semibold text-fg group-hover:text-accent">
                {FOUNDERS.map((f) => f.shortName).join(" & ")}
              </span>
            </span>
          </Link>
          <span className="hidden h-10 w-px bg-fg/10 md:block" />
          <Link href="/clients" className="group flex items-center gap-4">
            <span className="text-sm text-muted">Trusted by</span>
            <span className="font-display text-2xl font-bold tracking-tight text-fg group-hover:text-accent">
              {FEATURED_BRANDS[0].name}
            </span>
          </Link>
        </div>
      </div>

      <div aria-hidden="true" className="absolute right-6 bottom-8 hidden items-center gap-3 font-mono text-[0.65rem] tracking-[0.25em] text-muted uppercase md:flex">
        Scroll
        <span className="relative h-12 w-px overflow-hidden bg-fg/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[drip_2s_ease-in-out_infinite] bg-accent" />
        </span>
      </div>
      <style>{`@keyframes drip{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}
