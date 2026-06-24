import { ModulePage } from "@/components/admin/module-page";

export const metadata = {
  title: "Projects"
};

export default function ProjectsPage() {
  return (
    <ModulePage
      title="Project Management"
      description="Track project scope, client ownership, progress, status, priorities, and assigned team members."
      columns={["Project", "Client", "Type", "Status"]}
      rows={[
        ["Retail POS Suite", "Acme Retail", "POS", "Active"],
        ["School Operations Portal", "Bright Academy", "ERP", "Delivered"],
        ["Inventory Control", "Metro Supply", "Inventory", "Review"]
      ]}
    />
  );
}
