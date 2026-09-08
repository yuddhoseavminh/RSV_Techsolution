import { AdminResourcePage } from "@/components/admin/admin-resource-page";

export const metadata = {
  title: "Blog"
};

export default function BlogAdminPage() {
  return <AdminResourcePage resourceKey="blog" />;
}
