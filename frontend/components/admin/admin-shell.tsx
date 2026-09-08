"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bell,
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
import { adminModules } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push("/login?redirect=/admin");
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  const handleLogout = async () => {
    await logout();
    router.replace("/admin_page");
  };

  const isModuleActive = (href: string) => {
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
          <Link href="/admin" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-slate text-sm font-bold text-white shadow-sm">
              KT
            </span>
            <div>
              <p className="font-bold text-slate-950 leading-tight">KT Solution</p>
              <p className="text-xs text-blue-600 font-medium leading-tight flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Admin Console
              </p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto space-y-1 p-4 scrollbar-thin scrollbar-thumb-slate-200">
          {adminModules.map((module) => {
            const Icon = module.icon;
            const active = isModuleActive(module.href);
            return (
              <Link
                key={module.href}
                href={module.href}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-blue-50 text-blue-700 font-semibold shadow-xs"
                    : "font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${active ? "text-blue-600" : "text-slate-400"}`} />
                  {module.title}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-md ${
                    active ? "bg-blue-100 text-blue-800 font-medium" : "text-slate-400"
                  }`}
                >
                  {module.count}
                </span>
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
              <Link href="/admin" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-slate text-sm font-bold text-white shadow-sm">
                  KT
                </span>
                <div>
                  <p className="font-bold text-slate-950 leading-tight">KT Solution</p>
                  <p className="text-xs text-blue-600 font-medium leading-tight">Admin Console</p>
                </div>
              </Link>
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
                return (
                  <Link
                    key={module.href}
                    href={module.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
                      active
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${active ? "text-blue-600" : "text-slate-400"}`} />
                      {module.title}
                    </span>
                    <span className="text-xs text-slate-400">{module.count}</span>
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
                placeholder="Search management system"
              />
            </label>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Bell className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <Link href="/admin/settings">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-slate-900 leading-tight">{user.name}</p>
                <p className="text-[11px] text-blue-600 font-medium leading-tight capitalize">
                  {(user.roles ?? []).join(", ")}
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline-block ml-1 text-xs">Sign out</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
