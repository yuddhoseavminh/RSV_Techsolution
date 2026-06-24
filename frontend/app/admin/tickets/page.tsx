import { ModulePage } from "@/components/admin/module-page";

export const metadata = {
  title: "Tickets"
};

export default function TicketsAdminPage() {
  return (
    <ModulePage
      title="Ticket Support System"
      description="Manage support tickets, replies, assignment, priorities, and resolution status."
      columns={["Subject", "Client", "Priority", "Status"]}
      rows={[
        ["Need cashier role access", "Acme Retail", "Medium", "Open"],
        ["Invoice payment confirmation", "Metro Supply", "Low", "Waiting"],
        ["Mobile login issue", "ServiceLink", "High", "In Progress"]
      ]}
    />
  );
}
