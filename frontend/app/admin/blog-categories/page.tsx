import { AdminResourcePage } from "@/components/admin/admin-resource-page";

export const metadata = {
  title: "Blog Categories"
};

export default function BlogCategoriesAdminPage() {
  return <AdminResourcePage resourceKey="blog-categories" />;
}
