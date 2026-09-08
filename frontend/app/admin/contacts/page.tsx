import { AdminResourcePage } from "@/components/admin/admin-resource-page";

export const metadata = {
  title: "Contacts"
};

export default function ContactsAdminPage() {
  return <AdminResourcePage resourceKey="contacts" />;
}
