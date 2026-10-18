/**
 * The Watwa hexagon mark, redrawn as SVG from the original logo so it stays
 * crisp on dark backgrounds. The same W outline drives the 3D hero.
 */

/** W outline in the mark's 100 × 112 viewBox, shared with the 3D scene. */
export const W_POINTS: [number, number][] = [
  [14.8, 33.5],
  [28.9, 33.5],
  [34.8, 63],
  [42.8, 33.5],
  [57, 33.5],
  [65.2, 63],
  [70.9, 33.5],
  [85.2, 33.5],
  [73.8, 85.7],
  [59.1, 85.7],
  [50, 52.9],
  [40.9, 85.7],
  [26, 85.7],
];

const HEX = "50,1 99,29 99,83 50,111 1,83 1,29";

export function LogoMark({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 112" className={className} aria-hidden="true">
      <polygon points={HEX} fill="#ffffff" />
      <polygon points="50,1 99,29 99,83 50,111" fill="#e6eaec" />
      {/* Thin outline as on the original logo, so the white hexagon holds its edge on light backgrounds. */}
      <polygon points={HEX} fill="none" stroke="#0b2532" strokeOpacity="0.45" strokeWidth="1.5" />
      <polygon points={W_POINTS.map((p) => p.join(",")).join(" ")} fill="#0b84a5" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-[0.32em] text-fg">WATWA</span>
        <span className="mt-1 font-mono text-[0.6rem] tracking-[0.2em] text-accent uppercase">We are all about water</span>
      </span>
    </span>
  );
}
