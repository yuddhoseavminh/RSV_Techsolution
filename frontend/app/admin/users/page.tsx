import { ModulePage } from "@/components/admin/module-page";

export const metadata = {
  title: "Users"
};

export default function UsersPage() {
  return (
    <ModulePage
      title="User Management"
      description="Manage client, manager, and admin accounts with roles and permissions."
      columns={["Name", "Email", "Role", "Status"]}
      rows={[
        ["KT Admin", "admin@ktsolution.local", "Admin", "Active"],
        ["Demo Client", "client@example.com", "Client", "Active"],
        ["Project Manager", "pm@ktsolution.local", "Manager", "Active"]
      ]}
    />
  );
}
