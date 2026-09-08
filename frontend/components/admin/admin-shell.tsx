"use client";

import Link from "next/link";
import { Bell, LayoutDashboard, LogOut, Search, Settings, Menu, Mail } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { RequireAuth, useAuth } from "@/components/auth/auth-provider";
import { adminModules } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/admin_page");
  };

  const isDashboardActive = pathname === "/admin" || pathname === "/admin_page";

  return (
    <RequireAuth roles={["admin", "manager"]}>
      <div className="min-h-screen bg-[#f3f4f8] font-sans antialiased text-slate-800">
        
        {/* Modern White Sidebar */}
        <aside className="fixed inset-y-0 left-0 hidden w-72 overflow-y-auto border-r border-slate-100 bg-white text-slate-700 lg:block shadow-sm">
          {/* Logo Section */}
          <div className="flex h-[72px] items-center gap-3 border-b border-slate-100 px-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-sm font-extrabold text-white shadow-md shadow-amber-500/20">
              <span className="h-4.5 w-4.5 rounded-full bg-white flex items-center justify-center text-amber-500">
                ▸
              </span>
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900">Dashbord</span>
          </div>

          {/* Navigation Items */}
          <nav className="grid gap-0.5 py-4">
            <Link
              href="/admin_page"
              className={cn(
                "flex items-center gap-3 py-3 px-6 text-sm font-medium transition-all duration-150",
                isDashboardActive
                  ? "border-l-4 border-amber-500 bg-amber-50/30 text-amber-500 font-semibold"
                  : "border-l-4 border-transparent text-slate-600 hover:bg-slate-50 hover:text-amber-500"
              )}
            >
              <LayoutDashboard className="h-4.5 w-4.5 shrink-0" />
              Overview
            </Link>

            {adminModules.map((module) => {
              const Icon = module.icon;
              const isActive = pathname === module.href;

              return (
                <Link
                  key={module.href}
                  href={module.href}
                  className={cn(
                    "flex items-center justify-between py-3 px-6 text-sm font-medium transition-all duration-150",
                    isActive
                      ? "border-l-4 border-amber-500 bg-amber-50/30 text-amber-500 font-semibold"
                      : "border-l-4 border-transparent text-slate-600 hover:bg-slate-50 hover:text-amber-500"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4.5 w-4.5 shrink-0" />
                    {module.title}
                  </span>
                  {module.count && (
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase",
                      isActive 
                        ? "bg-amber-100 text-amber-600" 
                        : "bg-slate-100 text-slate-500"
                    )}>
                      {module.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="lg:pl-72">
          {/* Header */}
          <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-slate-100 bg-white px-4 md:px-8 shadow-sm">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-slate-500 hover:bg-slate-50 lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="hidden h-9 w-9 p-0 text-slate-400 hover:bg-slate-50 lg:flex">
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-4">
              {/* Notification & Message Icons */}
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0 text-slate-500 hover:bg-slate-50 rounded-full">
                  <Bell className="h-5 w-5 text-slate-500" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                </Button>
                <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0 text-slate-500 hover:bg-slate-50 rounded-full">
                  <Mail className="h-5 w-5 text-slate-500" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                </Button>
              </div>

              {/* User Avatar & Logout */}
              <div className="flex items-center gap-3 border-l border-slate-150 pl-4">
                <div className="flex items-center gap-2">
                  {/* Styled circular avatar like template */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700 shadow-inner overflow-hidden border border-slate-100">
                    {(user?.name ?? "AD")
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <span className="hidden text-sm font-semibold text-slate-700 md:inline">
                    {user?.name ?? "Admin"}
                  </span>
                </div>

                <Button asChild variant="ghost" size="sm" className="h-9 w-9 p-0 text-slate-400 hover:bg-slate-50 rounded-full">
                  <Link href="/admin/settings">
                    <Settings className="h-5 w-5 text-slate-500" />
                  </Link>
                </Button>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-9 gap-1.5 px-3 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition" 
                  onClick={() => void handleLogout()}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline text-xs font-semibold">Logout</span>
                </Button>
              </div>
            </div>
          </header>

          {/* Page Body Canvas */}
          <main className="p-4 md:p-8 animate-fadeIn">{children}</main>
        </div>
      </div>
    </RequireAuth>
  );
}
