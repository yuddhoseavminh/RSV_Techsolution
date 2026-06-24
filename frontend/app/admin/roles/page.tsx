import { ModulePage } from "@/components/admin/module-page";

export const metadata = {
  title: "Roles"
};

export default function RolesPage() {
  return (
    <ModulePage
      title="Role Management"
      description="Define admin, manager, and client roles with permission assignments."
      columns={["Role", "Guard", "Permissions", "Status"]}
      rows={[
        ["Admin", "web", "All permissions", "Active"],
        ["Manager", "web", "Operations permissions", "Active"],
        ["Client", "web", "Portal access", "Active"]
      ]}
    />
  );
}
