"use client";

import Link from "next/link";
import { ArrowRight, LogIn, LogOut, LayoutDashboard, Shield } from "lucide-react";
import { navigation, siteConfig } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export function SiteHeader() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/86 backdrop-blur-xl">
      <div className="section-shell flex h-[72px] items-center justify-between gap-6 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="KT Solution home">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-slate text-sm font-bold text-white shadow-sm">
            KT
          </span>
          <span className="text-base font-bold text-slate-950">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-brand-blue">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm" className="gap-2 border-slate-200">
                <Link href={isAdmin ? "/admin" : "/portal/dashboard"}>
                  {isAdmin ? (
                    <>
                      <Shield className="h-3.5 w-3.5 text-blue-600" />
                      <span>Admin Console</span>
                    </>
                  ) : (
                    <>
                      <LayoutDashboard className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Portal ({user.name.split(" ")[0]})</span>
                    </>
                  )}
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logout()}
                className="text-slate-500 hover:text-rose-600"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">
                <LogIn className="h-4 w-4" />
                Sign in
              </Link>
            </Button>
          )}

          <Button asChild size="sm">
            <Link href="/contact">
              Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
