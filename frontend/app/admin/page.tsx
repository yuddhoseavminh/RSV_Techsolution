import { CreditCard, FolderKanban, Inbox, Ticket, UsersRound } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { MetricCard } from "@/components/admin/metric-card";
import { dashboardRows } from "@/lib/data";

export const metadata = {
  title: "Admin Dashboard"
};

export default function AdminDashboardPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">Overview of users, projects, revenue, tickets, and contact requests.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Total Users" value="1,248" trend="+12 this month" icon={UsersRound} />
        <MetricCard label="Total Projects" value="86" trend="+7 active" icon={FolderKanban} />
        <MetricCard label="Revenue" value="$84k" trend="+18% paid" icon={CreditCard} />
        <MetricCard label="Pending Tickets" value="27" trend="-8 resolved" icon={Ticket} />
        <MetricCard label="New Contacts" value="314" trend="+23 leads" icon={Inbox} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-950">Recent Projects</h2>
          <DataTable columns={["Project", "Client", "Status", "Progress"]} rows={dashboardRows} />
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-950">Revenue Trend</h2>
          <div className="mt-6 flex h-56 items-end gap-3">
            {[42, 56, 38, 72, 64, 88, 78, 94].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-md bg-gradient-to-t from-brand-blue to-brand-cyan" style={{ height: `${height}%` }} />
                <span className="text-xs text-slate-400">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
