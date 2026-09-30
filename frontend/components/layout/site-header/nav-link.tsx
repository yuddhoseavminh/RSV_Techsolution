"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function NavLink({ item, active }: { item: { label: string; href: string }; active: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "whitespace-nowrap shrink-0 rounded-lg px-2.5 xl:px-3.5 py-1.5 text-sm xl:text-base font-medium xl:font-semibold transition",
        active
          ? "bg-navy-600 text-white shadow-[0_12px_30px_rgba(20,104,240,0.22)]"
          : "text-slate-600 hover:bg-white/70 hover:text-navy-600 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-navy-400"
      )}
    >
      {item.label}
    </Link>
  );
}

export function IconButton({
  label,
  onClick,
  children
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 w-9 xl:h-10 xl:min-w-10 shrink-0 items-center justify-center gap-1 rounded-lg border-slate-200 bg-white/70 text-slate-700 text-sm backdrop-blur transition hover:border-navy-200 hover:text-navy-400 dark:bg-white/8 dark:text-slate-200 dark:hover:text-cyan-200"
      aria-label={label}
    >
      {children}
    </button>
  );
}
