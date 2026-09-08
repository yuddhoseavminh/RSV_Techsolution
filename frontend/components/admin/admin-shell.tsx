"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  ExternalLink,
  Globe,
  Languages,
  LogOut,
  Search,
  Settings,
  ShieldAlert,
  Loader2,
  ShieldCheck,
  Menu,
  X,
  Mail
} from "lucide-react";
import type { ReactNode } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { useLanguage } from "@/lib/language-context";
import { adminModules } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/ui/brand-logo";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

const adminModuleTitlesKhmer: Record<string, string> = {
  Dashboard: "ផ្ទាំងគ្រប់គ្រង",
  Users: "អ្នកប្រើប្រាស់",
  Roles: "តួនាទី",
  Permissions: "សិទ្ធិអនុញ្ញាត",
  Clients: "អតិថិជន",
  Projects: "គម្រោងការងារ",
  "Service Categories": "ប្រភេទទំនិញ/សេវា",
  Services: "សេវាកម្ម",
  Technologies: "បច្ចេកវិទ្យា",
  Portfolio: "ស្នាដៃការងារ",
  "Blog Categories": "ប្រភេទអត្ថបទ",
  Blog: "អត្ថបទប្លុក",
  Tags: "ស្លាក Tags",
  Contacts: "សំណើទំនាក់ទំនង",
  Tickets: "សំបុត្រជំនួយ",
  Invoices: "វិក្កយបត្រ",
  Settings: "ការកំណត់"
};

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated, isAdmin, logout } = useAuth();
  const { language, toggleLanguage, isKhmer } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push("/login?redirect=/admin");
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [userMenuOpen]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const isModuleActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/admin") {
      return pathname === "/admin" || pathname === "/admin_page";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
          <p className="text-sm font-medium text-slate-600">Loading Admin Console...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
        <div className="max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-lg">
          <ShieldAlert className="mx-auto h-12 w-12 text-rose-500" />
          <h2 className="mt-3 text-lg font-bold text-slate-900">Administrator Access Required</h2>
          <p className="mt-2 text-sm text-slate-600">
            You must be signed in with an administrator account to view and manage this console.
          </p>
          <Button asChild className="mt-4 w-full">
            <Link href="/login?redirect=/admin">Sign in with Admin Account</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-[72px] shrink-0 items-center gap-3 border-b border-slate-200 px-6">
          <BrandLogo href="/admin" subText="Admin Console" size="md" />
        </div>
        <nav className="flex-1 overflow-y-auto space-y-1 p-4 scrollbar-thin scrollbar-thumb-slate-200">
          {adminModules.map((module) => {
            const Icon = module.icon;
            const active = isModuleActive(module.href);
            const title = isKhmer && adminModuleTitlesKhmer[module.title] ? adminModuleTitlesKhmer[module.title] : module.title;
            return (
              <Link
                key={module.href}
                href={module.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-blue-50 text-blue-700 font-semibold shadow-xs"
                    : "font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${active ? "text-blue-600" : "text-slate-400"}`} />
                <span>{title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 flex w-72 flex-col bg-white shadow-2xl">
            <div className="flex h-[72px] items-center justify-between border-b border-slate-200 px-6">
              <BrandLogo
                href="/admin"
                subText="Admin Console"
                size="md"
                onClick={() => setMobileMenuOpen(false)}
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto space-y-1 p-4">
              {adminModules.map((module) => {
                const Icon = module.icon;
                const active = isModuleActive(module.href);
                const title = isKhmer && adminModuleTitlesKhmer[module.title] ? adminModuleTitlesKhmer[module.title] : module.title;
                return (
                  <Link
                    key={module.href}
                    href={module.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                      active
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${active ? "text-blue-600" : "text-slate-400"}`} />
                    <span>{title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <label className="relative hidden w-full max-w-sm md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="h-10 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                placeholder={isKhmer ? "ស្វែងរកក្នុងប្រព័ន្ធ..." : "Search management system"}
              />
            </label>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Professional Language Switcher */}
            <LanguageSwitcher variant="dropdown" size="sm" />

            <Button asChild variant="outline" size="sm" className="inline-flex gap-1.5 border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-blue-50" title="View Live Website (CMS)">
              <Link href="/" target="_blank">
                <Globe className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-semibold">{isKhmer ? "វេបសាយ" : "Web"}</span>
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Bell className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <Link href="/admin/settings">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>

            {/* User Profile Dropdown */}
            <div className="relative pl-2 border-l border-slate-200" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2.5 rounded-lg p-1.5 transition hover:bg-slate-100 focus:outline-hidden"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm ring-2 ring-blue-100">
                  {user.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()
                    : "AD"}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-semibold text-slate-900 leading-tight">{user.name}</p>
                  <p className="text-[11px] text-blue-600 font-medium leading-tight capitalize">
                    {(user.roles ?? []).join(", ") || "Admin"}
                  </p>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180 text-blue-600" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu below User Profile */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* User details header inside dropdown */}
                  <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      {isKhmer ? "បានចូលគណនីជា" : "Signed in as"}
                    </p>
                    <p className="text-sm font-bold text-slate-900 leading-snug mt-0.5">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    <span className="mt-1.5 inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                      {(user.roles ?? []).join(", ") || "Administrator"}
                    </span>
                  </div>

                  {/* Navigation Links inside dropdown */}
                  <div className="space-y-0.5">
                    <Link
                      href="/admin/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                    >
                      <Settings className="h-4 w-4 text-slate-400" />
                      <span>{isKhmer ? "ការកំណត់ក្រុមហ៊ុន និងប្រព័ន្ធ" : "Company & System Settings"}</span>
                    </Link>
                    <Link
                      href="/"
                      target="_blank"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                    >
                      <Globe className="h-4 w-4 text-slate-400" />
                      <span>{isKhmer ? "មើលគេហទំព័រផ្សាយផ្ទាល់ (CMS)" : "View Live Website (CMS)"}</span>
                    </Link>
                  </div>

                  {/* Divider */}
                  <div className="my-1 border-t border-slate-100" />

                  {/* Logout Button inside dropdown */}
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      void handleLogout();
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 hover:text-rose-700"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{isKhmer ? "ចាកចេញ" : "Sign out"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
