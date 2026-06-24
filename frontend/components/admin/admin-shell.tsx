import Link from "next/link";
import { Bell, Search, Settings } from "lucide-react";
import type { ReactNode } from "react";
import { adminModules } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-[72px] items-center gap-3 border-b border-slate-200 px-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-slate text-sm font-bold text-white">
            KT
          </span>
          <div>
            <p className="font-bold text-slate-950">KT Solution</p>
            <p className="text-xs text-slate-500">Admin Console</p>
          </div>
        </div>
        <nav className="grid gap-1 p-4">
          {adminModules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.href}
                href={module.href}
                className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-brand-blue"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {module.title}
                </span>
                <span className="text-xs text-slate-400">{module.count}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white/86 px-4 backdrop-blur-xl md:px-8">
          <label className="relative hidden w-full max-w-sm md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="h-10 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
              placeholder="Search management system"
            />
          </label>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="ml-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-brand-blue">
              AD
            </div>
          </div>
        </header>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
