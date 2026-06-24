import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type DataTableProps = {
  columns: string[];
  rows: string[][];
};

export function DataTable({ columns, rows }: DataTableProps) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-5 py-4 font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.map((row) => (
              <tr key={row.join("-")} className="bg-white">
                {row.map((cell, index) => (
                  <td key={`${cell}-${index}`} className="px-5 py-4 text-slate-700">
                    {index === row.length - 1 ? <Badge className="bg-slate-50 text-slate-700">{cell}</Badge> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
