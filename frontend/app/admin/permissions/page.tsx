import { ModulePage } from "@/components/admin/module-page";

export const metadata = {
  title: "Permissions"
};

export default function PermissionsPage() {
  return (
    <ModulePage
      title="Permission Management"
      description="Review granular permissions used by the API and admin dashboard."
      columns={["Permission", "Module", "Guard", "Status"]}
      rows={[
        ["users.manage", "Users", "web", "Active"],
        ["projects.manage", "Projects", "web", "Active"],
        ["settings.manage", "Settings", "web", "Active"]
      ]}
    />
  );
}
