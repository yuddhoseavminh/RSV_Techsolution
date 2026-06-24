import { ModulePage } from "@/components/admin/module-page";

export const metadata = {
  title: "Contacts"
};

export default function ContactsAdminPage() {
  return (
    <ModulePage
      title="Contact and Lead Management"
      description="Review incoming contact requests, assign owners, update lead status, and track follow-up activities."
      columns={["Name", "Company", "Service", "Status"]}
      rows={[
        ["Sokha Lim", "Acme Retail", "POS System", "Qualified"],
        ["Malis Chan", "Bright Academy", "School System", "New"],
        ["Dara Chea", "Metro Supply", "Inventory", "Contacted"]
      ]}
    />
  );
}
