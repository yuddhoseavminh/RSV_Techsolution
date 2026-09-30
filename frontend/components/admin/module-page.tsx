import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/data-table";
import { PageHeader } from "@/components/ui/page-header";

type ModulePageProps = {
  title: string;
  description: string;
  columns: string[];
  rows: string[][];
};

export function ModulePage({ title, description, columns, rows }: ModulePageProps) {
  return (
    <div className="grid gap-6">
      <PageHeader
        title={title}
        description={description}
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            New
          </Button>
        }
      />
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}
