import { AdminResourcePage } from "@/components/admin/admin-resource-page";

export const metadata = {
  title: "Users"
};

export default function UsersPage() {
  return <AdminResourcePage resourceKey="users" />;
}
