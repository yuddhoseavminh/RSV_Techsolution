import { AdminResourcePage } from "@/components/admin/admin-resource-page";

export const metadata = {
  title: "Clients"
};

export default function ClientsAdminPage() {
  return <AdminResourcePage resourceKey="clients" />;
}
