import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/data-table";

type ModulePageProps = {
  title: string;
  description: string;
  columns: string[];
  rows: string[][];
};

export function ModulePage({ title, description, columns, rows }: ModulePageProps) {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          New
        </Button>
      </div>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}
