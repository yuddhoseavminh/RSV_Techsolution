/**
 * Default brand mark.
 *
 * Rendered wherever no uploaded logo is available yet (`settings.company.logo`)
 * — a navy rounded square carrying the RVS monogram. The glyph lives in an SVG
 * so it scales with the `h-* w-*` callers size it with; `app/icon.svg` mirrors
 * the same design for the favicon slot.
 */

type RvsMarkProps = {
  className?: string;
  title?: string;
};

export function RvsMark({ className = "", title = "RVS Techsolution" }: RvsMarkProps) {
  return (
    <span
      role="img"
      aria-label={title}
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[0.28em] bg-gradient-to-br from-navy-700 to-navy-500 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] ${className}`}
    >
      <svg viewBox="0 0 48 48" aria-hidden="true" className="h-full w-full">
        <text
          x="24"
          y="25.5"
          textAnchor="middle"
          dominantBaseline="central"
          className="font-display font-bold"
          fontSize="16.5"
          letterSpacing="-0.8"
        >
          RVS
        </text>
      </svg>
    </span>
  );
}
