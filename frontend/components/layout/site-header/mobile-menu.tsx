"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, Moon, Search, Sparkles, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/ui/brand-logo";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import type { Translations } from "@/lib/language-context";

type NavItem = { label: string; href: string };

export function MobileMenu({
  open,
  onClose,
  nav,
  theme,
  setTheme,
  t,
  isAdmin,
  onSearch
}: {
  open: boolean;
  onClose: () => void;
  nav: NavItem[];
  theme: "light" | "dark";
  setTheme: (value: "light" | "dark") => void;
  t: (key: keyof Translations, fallback?: string) => string;
  isAdmin?: boolean;
  onSearch?: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] bg-slate-950/60 backdrop-blur-md lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="ml-auto flex h-full w-[min(420px,calc(100%-28px))] flex-col bg-white p-5 shadow-[0_30px_120px_rgba(0,0,0,0.3)] dark:bg-slate-950"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <BrandLogo href="/" size="md" onClick={onClose} />
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-lg border-slate-200 text-slate-700 dark:border-white/10 dark:text-white"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-8 grid gap-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="rounded-lg px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-navy-400 dark:text-slate-200 dark:hover:bg-white/8"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto grid gap-3">
              <div className="grid gap-2">
                <button
                  type="button"
                  onClick={onSearch}
                  className="flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-navy-400 dark:border-white/10 dark:text-white dark:hover:bg-white/8"
                >
                  <Search className="h-4 w-4" />
                  {t("nav_search")}
                </button>
                <button
                  type="button"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex h-11 items-center justify-center gap-2 rounded-lg border-slate-200 font-semibold text-slate-700 dark:border-white/10 dark:text-white"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {t("theme_toggle")}
                </button>
                <div className="flex items-center justify-center">
                  <LanguageSwitcher variant="segmented" className="w-full justify-center" />
                </div>
              </div>
              {isAdmin && (
                <Button asChild className="rounded bg-navy-600 hover:bg-navy-700 text-white dark:bg-navy-500 dark:hover:bg-navy-400">
                  <Link href="/admin" onClick={onClose}>
                    <LayoutDashboard className="h-4 w-4" />
                    {t("nav_admin")} Console
                  </Link>
                </Button>
              )}
              <Button asChild className="rounded">
                <Link href="/contact" onClick={onClose}>
                  <Sparkles className="h-4 w-4" />
                  {t("nav_consultation")}
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
