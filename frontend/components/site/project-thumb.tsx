"use client";

import Image from "next/image";

/**
 * Decorative project preview.
 *
 * No screenshots ship with the data, so each card gets a deterministic
 * gradient derived from its title plus a small fake app window — enough to
 * read as "a product" at card size while staying crisp on any density. Same
 * seed always produces the same hue, so a project keeps its colour across
 * the home band and the portfolio grid. Hues are pinned to the blue–indigo
 * band the navy brand sits in, so the grid never turns into a colour riot;
 * an uploaded `thumbnail_url` wins over the synthetic art when present.
 */

/** FNV-1a-ish string hash folded into the 200–265° blue–indigo band. */
function hueOf(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return 200 + (hash % 66);
}

/** Two layouts keep the grid from feeling copy-pasted. */
function layoutOf(seed: string): "rail" | "tiles" {
  let sum = 0;
  for (let i = 0; i < seed.length; i += 1) sum += seed.charCodeAt(i);
  return sum % 3 === 0 ? "tiles" : "rail";
}

type ProjectThumbProps = {
  seed: string;
  /** Uploaded screenshot, when the CMS has one — overrides the synthetic art. */
  src?: string | null;
  /** Extra classes for the aspect wrapper. */
  className?: string;
};

export function ProjectThumb({ seed, src, className = "" }: ProjectThumbProps) {
  const hue = hueOf(seed);
  const tiles = layoutOf(seed) === "tiles";

  return (
    <div
      aria-hidden="true"
      className={`relative aspect-[16/10] w-full overflow-hidden border-b border-slate-200 dark:border-white/10 ${className}`}
    >
      {src ? (
        <Image src={src} alt="" fill unoptimized className="object-cover" />
      ) : (
        <>
          <div
            className="absolute inset-0 dark:brightness-[0.38] dark:saturate-[0.8]"
            style={{
              background: `linear-gradient(135deg, hsl(${hue} 58% 91%), hsl(${(hue + 25) % 360} 64% 84%))`
            }}
          />
          <div
            className="absolute inset-0 opacity-20 dark:opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(currentColor 0.75px, transparent 0.75px)",
              backgroundSize: "14px 14px",
              color: `hsl(${hue} 45% 55%)`
            }}
          />

          {/* Fake app window, floating up from the bottom edge; lifts when the
              surrounding card (`group`) is hovered. */}
          <div className="absolute inset-x-[9%] -bottom-px top-[15%] overflow-hidden rounded-t-lg bg-white shadow-[0_16px_36px_-18px_rgba(15,23,42,0.5)] transition-transform duration-300 ease-out group-hover:-translate-y-1 dark:bg-[#0F1117]">
        <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-3 py-2 dark:border-white/10 dark:bg-white/[0.06]">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-white/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-white/25" />
          <span
            className="ml-2 h-2 w-16 rounded-full opacity-60"
            style={{ background: `hsl(${hue} 60% 78%)` }}
          />
        </div>

        <div className="flex h-[calc(100%-1.75rem)]">
          {tiles ? (
            <div className="grid w-full grid-cols-3 gap-2 p-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="rounded-md bg-slate-100 dark:bg-white/[0.08]"
                  style={i === 1 ? { background: `hsl(${hue} 70% 88%)` } : undefined}
                />
              ))}
            </div>
          ) : (
            <>
              <div className="hidden w-[26%] shrink-0 flex-col gap-2 border-r border-slate-200 p-3 sm:flex dark:border-white/10">
                <span
                  className="h-4 w-3/4 rounded"
                  style={{ background: `hsl(${hue} 70% 86%)` }}
                />
                <span className="h-2.5 w-full rounded bg-slate-200 dark:bg-white/10" />
                <span className="h-2.5 w-5/6 rounded bg-slate-200 dark:bg-white/10" />
                <span className="h-2.5 w-2/3 rounded bg-slate-200 dark:bg-white/10" />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-3">
                <span className="h-3 w-1/2 rounded bg-slate-200 dark:bg-white/10" />
                <span className="h-2.5 w-5/6 rounded bg-slate-100 dark:bg-white/[0.07]" />
                <span className="h-2.5 w-3/4 rounded bg-slate-100 dark:bg-white/[0.07]" />
                <span className="mt-auto h-6 w-full rounded-md bg-slate-100 dark:bg-white/[0.07]" />
              </div>
            </>
          )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
