import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import { navigation, siteConfig } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/86 backdrop-blur-xl">
      <div className="section-shell flex h-[72px] items-center justify-between gap-6 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="KT Solution home">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-slate text-sm font-bold text-white">
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
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">
              <LogIn className="h-4 w-4" />
              Portal
            </Link>
          </Button>
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
