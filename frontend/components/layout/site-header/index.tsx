"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, LayoutDashboard, LogIn, Menu, Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { BrandLogo } from "@/components/ui/brand-logo";
import { useAuth } from "@/components/auth/auth-provider";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { IconButton, NavLink } from "./nav-link";
import { MobileMenu } from "./mobile-menu";
import { SearchModal } from "./search-modal";
import { SolutionsMenu } from "./solutions-menu";

export function SiteHeader() {
  const pathname = usePathname();
  const { isAuthenticated, isAdmin } = useAuth();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const isHome = pathname === "/";

  const sectionNav = useMemo(
    () => [
      { label: t("nav_home"), href: "#home" },
      { label: t("nav_features"), href: "#features" },
      { label: t("nav_services"), href: "#services" },
      { label: t("nav_portfolio"), href: "#portfolio" },
      { label: t("nav_pricing"), href: "#pricing" },
      { label: t("nav_faq"), href: "#faq" },
      { label: t("nav_contact"), href: "#contact" }
    ],
    [t]
  );

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("rvs-theme") as "light" | "dark" | null;
    const preferredTheme =
      storedTheme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
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
  }, [isHome, sectionNav]);

  const resolvedNav = useMemo(
    () => sectionNav.map((item) => ({ ...item, href: isHome ? item.href : `/${item.href}` })),
    [isHome, sectionNav]
  );

  return (
    <>
      <header
        className={cn(
          "font-display fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-300",
          scrolled
            ? "border-slate-200 bg-white/85 shadow-[0_1px_3px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-[#0A0A0A]/85"
            : "border-transparent bg-white/85 dark:bg-[#0A0A0A]/60"
        )}
      >
        <div className="section-shell flex h-[76px] items-center justify-between gap-3">
          <BrandLogo href="/" size="md" textClassName="hidden 2xl:block text-sm" />

          <nav className="hidden items-center gap-0.5 xl:gap-1.5 lg:flex shrink-0" aria-label="Main navigation">
            {resolvedNav.slice(0, 3).map((item) => (
              <NavLink key={item.href} item={item} active={isHome && active === item.href} />
            ))}
            <SolutionsMenu isHome={isHome} />
            {resolvedNav.slice(3).map((item) => (
              <NavLink key={item.href} item={item} active={isHome && active === item.href} />
            ))}
          </nav>

          <div className="hidden items-center gap-1.5 xl:gap-2 lg:flex shrink-0">
            <IconButton label={t("nav_search")} onClick={() => setSearchOpen(true)}>
              <Search className="h-4 w-4" />
            </IconButton>
            <LanguageSwitcher variant="dropdown" size="sm" />
            <IconButton
              label={t("theme_toggle")}
              onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </IconButton>
            {isAuthenticated && isAdmin ? (
              <Button
                asChild
                size="sm"
                className="shrink-0 whitespace-nowrap rounded-lg bg-navy-600 hover:bg-navy-700 text-white shadow-xs px-2.5 xl:px-3 text-xs xl:text-sm dark:bg-navy-500 dark:hover:bg-navy-400"
              >
                <Link href="/admin">
                  <LayoutDashboard className="h-4 w-4" />
                  {t("nav_admin")}
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="shrink-0 whitespace-nowrap rounded-lg px-2.5 xl:px-3.5 text-xs xl:text-sm"
              >
                <Link href="/login">
                  <LogIn className="h-4 w-4" />
                  {t("nav_portal")}
                </Link>
              </Button>
            )}
            <Button
              asChild
              size="sm"
              className="shrink-0 whitespace-nowrap rounded-lg px-2.5 xl:px-3 text-xs xl:text-sm"
            >
              <Link href="/contact">
                {t("nav_consultation")}
                <ArrowRight className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
              </Link>
            </Button>
          </div>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white/70 text-slate-900 text-sm backdrop-blur dark:border-white/10 dark:bg-white/8 dark:text-white lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        nav={resolvedNav}
        theme={theme}
        setTheme={setTheme}
        t={t}
        isAdmin={Boolean(isAuthenticated && isAdmin)}
      />
    </>
  );
}
