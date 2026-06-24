import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type MetricCardProps = {
  label: string;
  value: string;
  trend: string;
  icon: LucideIcon;
};

export function MetricCard({ label, value, trend, icon: Icon }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-500">{label}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
            <Icon className="h-4 w-4" />
          </span>
        </div>
        <p className="text-3xl font-bold text-slate-950">{value}</p>
        <p className="mt-2 text-sm text-emerald-600">{trend}</p>
      </CardContent>
    </Card>
  );
}
