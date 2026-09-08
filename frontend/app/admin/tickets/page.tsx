import { AdminResourcePage } from "@/components/admin/admin-resource-page";

export const metadata = {
  title: "Tickets"
};

export default function TicketsAdminPage() {
  return <AdminResourcePage resourceKey="tickets" />;
}
