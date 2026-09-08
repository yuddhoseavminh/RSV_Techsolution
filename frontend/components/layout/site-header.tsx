"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Languages, LogIn, Menu, Moon, Search, Sparkles, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

const sectionNav = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState("EN");
  const isHome = pathname === "/";

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("rvs-theme") as "light" | "dark" | null;
    const preferredTheme = storedTheme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preferredTheme);
    document.documentElement.classList.toggle("dark", preferredTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("rvs-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const sections = sectionNav
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const resolvedNav = useMemo(
    () => sectionNav.map((item) => ({ ...item, href: isHome ? item.href : `/${item.href}` })),
    [isHome]
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-slate-200/80 bg-white/82 shadow-[0_16px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/78"
            : "border-transparent bg-white/18 backdrop-blur-md dark:bg-slate-950/18"
        )}
      >
        <div className="section-shell flex h-[76px] items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="RVS Trust Solutions Cambodia home">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#8B5CF6] text-[11px] font-black text-white shadow-[0_14px_34px_rgba(37,99,235,0.26)]">
              RVS
            </span>
            <span className="truncate font-display text-base font-black tracking-normal text-slate-950 dark:text-white">
              {siteConfig.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {resolvedNav.slice(0, 3).map((item) => (
              <NavLink key={item.href} item={item} active={isHome && active === item.href} />
            ))}
            <div className="group relative">
              <button type="button" className="inline-flex h-10 items-center gap-1 rounded-lg px-3 text-sm font-bold text-slate-600 transition hover:bg-white/70 hover:text-[#2563EB] dark:text-slate-300 dark:hover:bg-white/10">
                Solutions
                <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100">
                <div className="grid grid-cols-2 gap-3 rounded-lg border border-slate-200 bg-white/94 p-4 shadow-[0_28px_90px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/94">
                  {services.slice(0, 4).map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link key={service.slug} href={isHome ? "#services" : "/#services"} className="rounded-lg p-3 transition hover:bg-slate-50 dark:hover:bg-white/8">
                        <div className="mb-3 grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-[#2563EB] dark:bg-white/10 dark:text-cyan-300">
                          <Icon className="h-4 w-4" />
                        </div>
                        <p className="text-sm font-bold text-slate-950 dark:text-white">{service.title}</p>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{service.description}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            {resolvedNav.slice(3).map((item) => (
              <NavLink key={item.href} item={item} active={isHome && active === item.href} />
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <IconButton label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-4 w-4" />
            </IconButton>
            <IconButton label="Toggle language" onClick={() => setLanguage((current) => (current === "EN" ? "KH" : "EN"))}>
              <Languages className="h-4 w-4" />
              <span className="text-xs font-black">{language}</span>
            </IconButton>
            <IconButton label="Toggle theme" onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </IconButton>
            <Button asChild variant="ghost" size="sm" className="rounded-lg">
              <Link href="/login">
                <LogIn className="h-4 w-4" />
                Portal
              </Link>
            </Button>
            <Button asChild size="sm" className="rounded-lg">
              <Link href="/contact">
                Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white/70 text-slate-900 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/8 dark:text-white lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} nav={resolvedNav} theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} />
    </>
  );
}

function NavLink({ item, active }: { item: { label: string; href: string }; active: boolean }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "rounded-lg px-3 py-2 text-sm font-bold transition",
        active
          ? "bg-[#2563EB] text-white shadow-[0_12px_30px_rgba(37,99,235,0.22)]"
          : "text-slate-600 hover:bg-white/70 hover:text-[#2563EB] dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-cyan-200"
      )}
    >
      {item.label}
    </Link>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 min-w-10 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white/70 px-3 text-slate-700 shadow-sm backdrop-blur transition hover:border-blue-200 hover:text-[#2563EB] dark:border-white/10 dark:bg-white/8 dark:text-slate-200 dark:hover:text-cyan-200"
      aria-label={label}
    >
      {children}
    </button>
  );
}

function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const results = [
    { label: "Web Development", href: "/#services" },
    { label: "ERP System", href: "/#services" },
    { label: "Portfolio", href: "/#portfolio" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Contact", href: "/#contact" }
  ];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[90] bg-slate-950/65 p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="mx-auto mt-24 max-w-2xl overflow-hidden rounded-lg border border-white/10 bg-white shadow-[0_30px_120px_rgba(0,0,0,0.26)] dark:bg-slate-950" initial={{ opacity: 0, scale: 0.94, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 18 }} onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 dark:border-white/10">
              <Search className="h-5 w-5 text-[#2563EB]" />
              <input autoFocus placeholder="Search RVS Trust Solutions" className="h-10 min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-950 outline-none placeholder:text-slate-400 dark:text-white" />
              <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white" aria-label="Close search">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-2 p-4">
              {results.map((result) => (
                <Link key={result.label} href={result.href} onClick={onClose} className="flex items-center justify-between rounded-lg p-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-[#2563EB] dark:text-slate-200 dark:hover:bg-white/8">
                  {result.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function MobileMenu({
  open,
  onClose,
  nav,
  theme,
  setTheme,
  language,
  setLanguage
}: {
  open: boolean;
  onClose: () => void;
  nav: { label: string; href: string }[];
  theme: "light" | "dark";
  setTheme: (value: "light" | "dark") => void;
  language: string;
  setLanguage: (value: string) => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[90] bg-slate-950/60 backdrop-blur-md lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="ml-auto flex h-full w-[min(420px,calc(100%-28px))] flex-col bg-white p-5 shadow-[0_30px_120px_rgba(0,0,0,0.3)] dark:bg-slate-950" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 260, damping: 30 }} onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#8B5CF6] text-[11px] font-black text-white">RVS</span>
                <span className="font-display font-black text-slate-950 dark:text-white">{siteConfig.name}</span>
              </div>
              <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-700 dark:border-white/10 dark:text-white" aria-label="Close navigation">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-8 grid gap-2">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} onClick={onClose} className="rounded-lg px-4 py-3 text-base font-bold text-slate-700 transition hover:bg-slate-50 hover:text-[#2563EB] dark:text-slate-200 dark:hover:bg-white/8">
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto grid gap-3">
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 font-bold text-slate-700 dark:border-white/10 dark:text-white">
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  Theme
                </button>
                <button type="button" onClick={() => setLanguage(language === "EN" ? "KH" : "EN")} className="flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 font-bold text-slate-700 dark:border-white/10 dark:text-white">
                  <Languages className="h-4 w-4" />
                  {language}
                </button>
              </div>
              <Button asChild className="rounded-lg">
                <Link href="/contact" onClick={onClose}>
                  <Sparkles className="h-4 w-4" />
                  Consultation
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
