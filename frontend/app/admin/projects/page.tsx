import { AdminResourcePage } from "@/components/admin/admin-resource-page";

export const metadata = {
  title: "Projects"
};

export default function ProjectsPage() {
  return <AdminResourcePage resourceKey="projects" />;
}
