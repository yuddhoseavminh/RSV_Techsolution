import { AdminResourcePage } from "@/components/admin/admin-resource-page";

export const metadata = {
  title: "Invoices"
};

export default function InvoicesAdminPage() {
  return <AdminResourcePage resourceKey="invoices" />;
}
