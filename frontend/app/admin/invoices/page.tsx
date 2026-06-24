import { ModulePage } from "@/components/admin/module-page";

export const metadata = {
  title: "Invoices"
};

export default function InvoicesAdminPage() {
  return (
    <ModulePage
      title="Invoice Management"
      description="Generate invoices, assign projects and clients, track payment status, and review totals."
      columns={["Invoice", "Client", "Total", "Status"]}
      rows={[
        ["INV-2026-0001", "Acme Retail", "$3,500", "Sent"],
        ["INV-2026-0002", "Bright Academy", "$8,200", "Paid"],
        ["INV-2026-0003", "Metro Supply", "$4,900", "Overdue"]
      ]}
    />
  );
}
