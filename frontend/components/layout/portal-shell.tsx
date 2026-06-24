import Link from "next/link";
import { Bell, CreditCard, FolderKanban, LayoutDashboard, LifeBuoy, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

const portalNav = [
  { label: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/portal/projects", icon: FolderKanban },
  { label: "Invoices", href: "/portal/invoices", icon: CreditCard },
  { label: "Tickets", href: "/portal/tickets", icon: LifeBuoy },
  { label: "Profile", href: "/portal/profile", icon: UserRound }
];

export function PortalShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="section-shell flex h-[72px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-slate text-sm font-bold text-white">
              KT
            </span>
            <span className="font-bold text-slate-950">Client Portal</span>
          </Link>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
            Notifications
          </Button>
        </div>
      </header>
      <div className="section-shell grid gap-6 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-3 shadow-soft">
          <nav className="grid gap-1">
            {portalNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-brand-blue"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
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
