import Image from "next/image";
import type { Founder } from "@/lib/founders";

/**
 * Founder portrait. Until the client sends photos, it renders a branded
 * monogram card at the same size, so the layout is final either way: drop the
 * file in /public/images/founders and set `photo` in src/lib/founders.ts.
 */
export function FounderPortrait({ founder, priority = false, sizes }: { founder: Founder; priority?: boolean; sizes: string }) {
  if (founder.photo) {
    return (
      <Image
        src={founder.photo}
        alt={`${founder.name}, ${founder.role} of Watwa`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    );
  }
  return (
    <div role="img" aria-label={`${founder.name}, ${founder.role} of Watwa (portrait coming soon)`} className="absolute inset-0 bg-gradient-to-br from-canvas-3 via-canvas-2 to-canvas">
      <div className="caustics absolute inset-0" />
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-[0.14]">
        <defs>
          <pattern id={`hex-${founder.slug}`} width="28" height="48.5" patternUnits="userSpaceOnUse" patternTransform="scale(1.4)">
            <path d="M14 0 28 8.1v16.2L14 32.3 0 24.3V8.1zM14 32.3v16.2" fill="none" stroke="#0b84a5" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#hex-${founder.slug})`} />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-display text-[9rem] font-bold tracking-tighter text-fg/10 md:text-[12rem]">
        {founder.initials}
      </span>
    </div>
  );
}
