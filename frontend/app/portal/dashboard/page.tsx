import { CreditCard, FolderKanban, LifeBuoy, TrendingUp } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { MetricCard } from "@/components/admin/metric-card";
import { projects } from "@/lib/data";

export const metadata = {
  title: "Portal Dashboard"
};

export default function PortalDashboardPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">Track active work, invoices, support, and project progress.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active Projects" value="3" trend="2 in development" icon={FolderKanban} />
        <MetricCard label="Open Tickets" value="4" trend="1 waiting reply" icon={LifeBuoy} />
        <MetricCard label="Invoices" value="$3.5k" trend="1 pending" icon={CreditCard} />
        <MetricCard label="Average Progress" value="62%" trend="+8% this week" icon={TrendingUp} />
      </div>
      <DataTable
        columns={["Project", "Category", "Status", "Progress"]}
        rows={projects.slice(0, 4).map((project) => [
          project.title,
          project.category,
          project.status ?? "Active",
          `${project.progress ?? 0}%`
        ])}
      />
    </div>
  );
}
