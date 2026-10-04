import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  label: string;
  value: string;
  trend: string;
  icon: LucideIcon;
};

export function MetricCard({ label, value, trend, icon: Icon }: MetricCardProps) {
  // Determine badge colors based on the metric category
  let badgeClasses = "bg-slate-100 text-slate-600 border-slate-200/60";
  
  if (label.toLowerCase().includes("revenue") || label.toLowerCase().includes("contacts")) {
    badgeClasses = "bg-emerald-50 text-emerald-700 border-emerald-200/50";
  } else if (label.toLowerCase().includes("tickets") && Number(value) > 0) {
    badgeClasses = "bg-rose-50 text-rose-700 border-rose-200/50";
  } else if (label.toLowerCase().includes("tickets")) {
    badgeClasses = "bg-amber-50 text-amber-700 border-amber-200/50";
  } else if (label.toLowerCase().includes("users") || label.toLowerCase().includes("projects")) {
    badgeClasses = "bg-navy-50 text-navy-700 border border-navy-200/50";
  }

  return (
    <div className="border group relative overflow-hidden rounded-xl border-slate-200/50 bg-white/70 p-5 text-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:ring-navy-500/20 hover:shadow-md">
      {/* Decorative Glow Orb */}
      <div className="absolute -right-6 -top-6 h-12 w-12 rounded-full bg-gradient-to-tr from-navy-500/5 to-cyan-500/5 blur-lg transition-all duration-300 group-hover:scale-150 dark:from-navy-400" />
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium tracking-wide text-slate-500">{label}</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 shadow-inner transition-all duration-300 group-hover:bg-gradient--tr group-hover:from-navy-600 group-hover:to-cyan-400 group-hover:text-white group-hover:shadow-md">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      
      <div className="mt-4">
        <p className="text-3xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-black">
          {value}
        </p>
        <div className="mt-3 flex">
          <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badgeClasses}`}>
            {trend}
          </span>
        </div>
      </div>
    </div>
  );
}
