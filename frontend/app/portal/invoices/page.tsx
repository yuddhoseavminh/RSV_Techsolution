import { DataTable } from "@/components/admin/data-table";

export const metadata = {
  title: "Portal Invoices"
};

export default function PortalInvoicesPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Invoice History</h1>
        <p className="mt-2 text-sm text-slate-600">View issued, paid, overdue, and upcoming invoices.</p>
      </div>
      <DataTable
        columns={["Invoice", "Project", "Due Date", "Status"]}
        rows={[
          ["INV-2026-0001", "Retail POS Suite", "Jul 08, 2026", "Sent"],
          ["INV-2026-0002", "Discovery Workshop", "Jun 18, 2026", "Paid"],
          ["INV-2026-0003", "Support Retainer", "Aug 01, 2026", "Draft"]
        ]}
      />
    </div>
  );
}
