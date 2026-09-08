import { AdminShell } from "@/components/admin/admin-shell";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata = {
  title: "Admin Dashboard | KT Solution"
};

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <AdminDashboard />
    </AdminShell>
  );
}
