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
import { IconLink, IconButton, NavLink } from "./nav-link";
import { MobileMenu } from "./mobile-menu";
import { SearchModal } from "./search-modal";
import { SolutionsMenu } from "./solutions-menu";

export function SiteHeader() {
  const pathname = usePathname();
  const { isAuthenticated, isAdmin } = useAuth();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  /** Tucked = bar slid off-screen on a downward scroll, Antigravity-style. */
  const [tucked, setTucked] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  /** Blocks the write-back until the stored value has been read (see below). */
  const [hydrated, setHydrated] = useState(false);

  /**
   * Route-based primary navigation. Landing-page anchors (#features, #pricing,
   * #faq…) stay reachable from the footer and search; the bar itself is site
   * information architecture, so active state works on every route, not only
   * on the home page.
   */
  const mainNav = useMemo(
    () => [
      { label: t("nav_services"), href: "/services" },
      { label: t("nav_portfolio"), href: "/portfolio" },
      { label: t("nav_about"), href: "/about" },
      { label: t("nav_blog"), href: "/blog" },
      { label: t("nav_contact"), href: "/contact" }
    ],
    [t]
  );

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("rvs-theme") as "light" | "dark" | null;
    const preferredTheme =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    setTheme(preferredTheme);
    document.documentElement.classList.toggle("dark", preferredTheme === "dark");
    setHydrated(true);
  }, []);

  // This effect also runs on mount with the initial "light" state, so writing
  // before the stored value has been read would overwrite it with "light".
  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("rvs-theme", theme);
  }, [theme, hydrated]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      if (window.scrollY < 80) setTucked(false);
    };
    const onWheel = (event: WheelEvent) => {
      const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
      if (Math.abs(delta) < 4) return;
      // Driven by wheel intent rather than scroll position, so an anchor jump
      // or a programmatic scroll never hides the bar out from under the user.
      setTucked(window.scrollY > 120 && delta > 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header
        onFocus={() => setTucked(false)}
        className={cn(
          "font-display fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,transform,backdrop-filter] duration-300 ease-in-out",
          scrolled
            ? "backdrop-blur-md border-slate-200/80 bg-white/85 shadow-[0_1px_3px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-[#0A0A0A]/85"
            : "border-transparent bg-transparent",
          tucked && "-translate-y-full"
        )}
      >
        <div className="section-shell flex h-16 items-center justify-between gap-3">
          <BrandLogo href="/" size="md" textClassName="hidden max-w-[210px] truncate xl:block text-sm" />

          <nav className="hidden h-full shrink-0 items-center lg:flex" aria-label="Main navigation">
            <SolutionsMenu active={isActive("/services")} />
            {mainNav.slice(1).map((item) => (
              <NavLink key={item.href} item={item} active={isActive(item.href)} />
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-0.5 lg:flex xl:gap-1.5">
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
              <IconLink label={t("nav_admin")} href="/admin">
                <LayoutDashboard className="h-4 w-4" />
              </IconLink>
            ) : (
              <IconLink label={t("nav_portal")} href="/login">
                <LogIn className="h-4 w-4" />
              </IconLink>
            )}

            <Button
              asChild
              size="sm"
              className="ml-1 h-10 shrink-0 rounded bg-navy-600 px-3.5 text-sm text-white shadow-[0_12px_30px_-12px_rgba(20,104,240,0.7)] hover:bg-navy-700 xl:px-4 dark:bg-navy-500 dark:hover:bg-navy-400"
            >
              <Link href="/contact">
                {t("nav_consultation")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <IconButton
            label="Open navigation"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </IconButton>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        nav={mainNav}
        theme={theme}
        setTheme={setTheme}
        t={t}
        isAdmin={Boolean(isAuthenticated && isAdmin)}
        onSearch={() => {
          setMobileOpen(false);
          setSearchOpen(true);
        }}
      />
    </>
  );
}
