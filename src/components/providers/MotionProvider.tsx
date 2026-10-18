"use client";

/**
 * Lenis smooth scroll wired into the GSAP ticker (same wiring as KNC), plus
 * the site's declarative scroll animations:
 *
 *   [data-reveal]            fade + rise when it enters the viewport
 *                            (data-reveal-delay="0.2" to offset)
 *   [data-split]             headline revealed line by line (SplitText, masked)
 *   [data-parallax="0.2"]    drifts against scroll by that fraction
 *   [data-count="15"]        counts up from 0 (data-count-suffix="+")
 *
 * Everything re-binds on route change and is torn down on unmount.
 * Reduced motion: no Lenis, and content is shown without animation.
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = () => "ontouchstart" in window || window.innerWidth < 1024;

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion() || isTouch()) return;
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (reducedMotion()) {
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        el.textContent = `${el.dataset.count}${el.dataset.countSuffix ?? ""}`;
      });
      return;
    }

    const splits: SplitText[] = [];
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay: Number(el.dataset.revealDelay ?? 0),
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax || 0.15);
        gsap.fromTo(
          el,
          { yPercent: -amount * 100 },
          {
            yPercent: amount * 100,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.countSuffix ?? "";
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(state.v)}${suffix}`;
          },
        });
      });
    });

    // SplitText must wait for fonts, or line breaks are measured wrong.
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
          splits.push(split);
          // The masks clip at the line box, which cuts descenders (y, p) on tight
          // display leading. Pad them out and pull back so spacing is unchanged.
          split.masks.forEach((m) => {
            (m as HTMLElement).style.padding = "0.06em 0 0.16em";
            (m as HTMLElement).style.margin = "-0.06em 0 -0.16em";
          });
          gsap.set(el, { opacity: 1 });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.2,
            stagger: 0.09,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
      });
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, [pathname]);

  return <>{children}</>;
}
