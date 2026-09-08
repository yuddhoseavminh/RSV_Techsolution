import { cn } from "@/lib/utils";

type DataTableProps = {
  columns: string[];
  rows: string[][];
};

export function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/60 bg-white/70 shadow-sm backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50/75 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-6 py-4">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white/50">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-10 text-center text-slate-400">
                  No records found.
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <tr 
                  key={row.join("-") + rowIndex} 
                  className="transition duration-150 hover:bg-slate-50/75"
                >
                  {row.map((cell, index) => {
                    const colName = columns[index]?.toLowerCase() || "";
                    let content: React.ReactNode = cell;

                    if (colName === "status") {
                      const statusVal = String(cell).toLowerCase();
                      let statusClasses = "bg-slate-50 text-slate-700 border-slate-200";

                      if (["active", "paid", "resolved", "published", "success"].includes(statusVal)) {
                        statusClasses = "bg-emerald-50/80 text-emerald-700 border-emerald-200/50 shadow-sm shadow-emerald-500/5";
                      } else if (["planning", "pending", "sent", "draft", "warning"].includes(statusVal)) {
                        statusClasses = "bg-amber-50/80 text-amber-700 border-amber-200/50";
                      } else if (["completed", "closed", "info"].includes(statusVal)) {
                        statusClasses = "bg-blue-50/80 text-blue-700 border-blue-200/50";
                      } else if (["on-hold", "on hold", "overdue", "unpaid", "failed", "danger"].includes(statusVal)) {
                        statusClasses = "bg-cyan-50/80 text-cyan-700 border-cyan-250/50 shadow-sm shadow-cyan-500/5";
                      } else if (["process", "processing"].includes(statusVal)) {
                        statusClasses = "bg-rose-50/80 text-rose-700 border-rose-250/50 shadow-sm shadow-rose-500/5";
                      } else if (["open"].includes(statusVal)) {
                        statusClasses = "bg-purple-50/80 text-purple-700 border-purple-250/50 shadow-sm shadow-purple-500/5";
                      }

                      content = (
                        <span className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize",
                          statusClasses
                        )}>
                          {cell}
                        </span>
                      );
                    } else if (colName === "progress") {
                      const percent = parseInt(cell) || 0;
                      content = (
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100 shadow-inner">
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500 shadow-sm"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="font-semibold text-slate-700">{cell}</span>
                        </div>
                      );
                    } else if (colName === "priority") {
                      const priorityVal = String(cell).toLowerCase();
                      let priorityClasses = "bg-slate-100 text-slate-600 border-slate-200";

                      if (priorityVal === "high" || priorityVal === "critical") {
                        priorityClasses = "bg-red-50/80 text-red-700 border-red-200/50";
                      } else if (priorityVal === "medium" || priorityVal === "normal") {
                        priorityClasses = "bg-amber-50/80 text-amber-700 border-amber-200/50";
                      } else if (priorityVal === "low") {
                        priorityClasses = "bg-slate-50/80 text-slate-500 border-slate-200/50";
                      }

                      content = (
                        <span className={cn(
                          "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold capitalize",
                          priorityClasses
                        )}>
                          {cell}
                        </span>
                      );
                    } else if (["amount", "total", "subtotal"].includes(colName)) {
                      content = <span className="font-semibold text-slate-900">{cell}</span>;
                    } else if (["project", "invoice #", "subject", "name"].includes(colName)) {
                      content = <span className="font-medium text-slate-900">{cell}</span>;
                    }

                    return (
                      <td key={`${cell}-${index}`} className="px-6 py-4 text-slate-600">
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
