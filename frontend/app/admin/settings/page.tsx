import { ModulePage } from "@/components/admin/module-page";

export const metadata = {
  title: "Settings"
};

export default function SettingsAdminPage() {
  return (
    <ModulePage
      title="Settings"
      description="Manage company profile, email configuration, SEO defaults, and social media links."
      columns={["Group", "Key", "Value", "Status"]}
      rows={[
        ["Company", "Name", "KT Solution", "Active"],
        ["SEO", "Title", "Smart Digital Solutions", "Active"],
        ["Social", "LinkedIn", "Configured", "Active"]
      ]}
    />
  );
}
