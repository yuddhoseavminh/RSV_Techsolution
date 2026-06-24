import { ModulePage } from "@/components/admin/module-page";

export const metadata = {
  title: "Portfolio"
};

export default function PortfolioAdminPage() {
  return (
    <ModulePage
      title="Portfolio Management"
      description="Manage showcase projects, images, client information, technologies, and publication status."
      columns={["Project", "Category", "Client", "Status"]}
      rows={[
        ["Retail POS Suite", "POS", "Acme Retail", "Published"],
        ["Field Service Mobile App", "Mobile App", "ServiceLink", "Draft"],
        ["Construction CRM", "Website", "BuildPro", "Published"]
      ]}
    />
  );
}
