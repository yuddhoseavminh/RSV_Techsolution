"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared geometry for a full-height nav item (link or dropdown trigger). */
export const navItemStyles =
  "relative inline-flex h-full shrink-0 items-center whitespace-nowrap px-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy-400/60 after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:origin-center after:rounded-full after:bg-navy-600 after:transition-transform after:duration-300 after:scale-x-0 after:content-[''] xl:px-3 xl:text-base dark:after:bg-navy-400";

export const navItemActive = "font-semibold text-navy-700 after:scale-x-100 dark:text-white";
export const navItemIdle = "text-slate-600 hover:text-navy-700 dark:text-slate-300 dark:hover:text-white";

/** Borderless 40×40 utility hit area, shared by <button> and <Link>. */
export const iconStyles =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy-400/60 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-navy-300";

/**
 * Full-height nav item: the navy rule sits on the header's own bottom border
 * and scales in from the centre, so the active item reads as a tab rather than
 * a filled pill (which looked heavy at eight items).
 */
export function NavLink({ item, active }: { item: { label: string; href: string }; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(navItemStyles, active ? navItemActive : navItemIdle, "gap-1")}
    >
      {item.label}
    </Link>
  );
}

export function IconButton({
  label,
  onClick,
  className,
  children
}: {
  label: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className={cn(iconStyles, className)}>
      {children}
    </button>
  );
}

export function IconLink({ label, href, children }: { label: string; href: string; children: ReactNode }) {
  return (
    <Link href={href} aria-label={label} className={iconStyles}>
      {children}
    </Link>
  );
}
