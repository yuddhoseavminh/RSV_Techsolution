/**
 * Neutral logo slot.
 *
 * Rendered wherever no uploaded logo is available yet — the brand image is
 * meant to come from settings (`logoUrl`), so this only holds the space with a
 * flat outlined box and a generic image glyph. Square by design: callers size
 * it with `h-* w-*`.
 */

type LogoPlaceholderProps = {
  className?: string;
  title?: string;
};

export function LogoPlaceholder({
  className = "",
  title = "Logo placeholder"
}: LogoPlaceholderProps) {
  return (
    <span
      role="img"
      aria-label={title}
      className={`inline-flex shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-100 text-slate-400 dark:border-white/15 dark:bg-white/[0.06] dark:text-white/35 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-1/2 w-1/2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2.5" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
    </span>
  );
}
