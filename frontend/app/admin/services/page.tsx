import { ModulePage } from "@/components/admin/module-page";

export const metadata = {
  title: "Services"
};

export default function ServicesAdminPage() {
  return (
    <ModulePage
      title="Service Management"
      description="Manage service categories, public service cards, benefits, and technology tags."
      columns={["Service", "Category", "Featured", "Status"]}
      rows={[
        ["Web Development", "Software Solutions", "Yes", "Active"],
        ["POS System", "Business Systems", "Yes", "Active"],
        ["HR Management System", "Enterprise", "No", "Active"]
      ]}
    />
  );
}
