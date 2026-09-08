"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Bell,
  CreditCard,
  FolderKanban,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  UserRound,
  ShieldAlert,
  Loader2
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/auth-provider";
import { useLanguage } from "@/lib/language-context";
import { BrandLogo } from "@/components/ui/brand-logo";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

const portalNavKeys = [
  { labelEn: "Dashboard", labelKh: "ផ្ទាំងគ្រប់គ្រង", href: "/portal/dashboard", icon: LayoutDashboard },
  { labelEn: "Projects", labelKh: "គម្រោង", href: "/portal/projects", icon: FolderKanban },
  { labelEn: "Invoices", labelKh: "វិក្កយបត្រ", href: "/portal/invoices", icon: CreditCard },
  { labelEn: "Tickets", labelKh: "សំបុត្រជំនួយ", href: "/portal/tickets", icon: LifeBuoy },
  { labelEn: "Profile", labelKh: "ព័ត៌មានគណនី", href: "/portal/profile", icon: UserRound }
];

export function PortalShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const { isKhmer } = useLanguage();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/portal/dashboard");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
          <p className="text-sm font-medium text-slate-600">
            {isKhmer ? "កំពុងផ្ទុកផតថលអតិថិជន..." : "Loading Client Portal..."}
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-lg">
          <ShieldAlert className="mx-auto h-12 w-12 text-amber-500" />
          <h2 className="mt-3 text-lg font-bold text-slate-900">
            {isKhmer ? "តម្រូវឱ្យផ្ទៀងផ្ទាត់គណនី" : "Authentication Required"}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {isKhmer
              ? "សូមចូលគណនីដើម្បីចូលប្រើប្រាស់ផតថលអតិថិជន និងគ្រប់គ្រងគណនីរបស់អ្នក។"
              : "Please sign in to access the client portal and manage your account."}
          </p>
          <Button asChild className="mt-4 w-full">
            <Link href="/login?redirect=/portal/dashboard">
              {isKhmer ? "ចូលប្រព័ន្ធ" : "Go to Sign in"}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "CL";

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="section-shell flex h-[72px] items-center justify-between">
          <BrandLogo
            href="/portal/dashboard"
            subText={user.company || (isKhmer ? "ផតថលអតិថិជន" : "Client Portal")}
            size="md"
          />

          <div className="flex items-center gap-3">
            {/* Professional Language Switcher */}
            <LanguageSwitcher variant="dropdown" size="sm" />

            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Bell className="h-4 w-4" />
              {isKhmer ? "ការជូនដំណឹង" : "Notifications"}
            </Button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-xs font-bold text-emerald-800">
                {initials}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-slate-900 leading-tight">{user.name}</p>
                <p className="text-[11px] text-slate-500 leading-tight">{user.email}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                title={isKhmer ? "ចាកចេញ" : "Sign out"}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline-block ml-1 text-xs">
                  {isKhmer ? "ចាកចេញ" : "Sign out"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="section-shell grid gap-6 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-3 shadow-soft">
          <nav className="grid gap-1">
            {portalNavKeys.map((item) => {
              const Icon = item.icon;
              const label = isKhmer ? item.labelKh : item.labelEn;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-brand-blue"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
