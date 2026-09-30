import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-navy-200 bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700",
        "dark:border-navy-400/25 dark:bg-navy-400/10 dark:text-navy-300",
        className
      )}
      {...props}
    />
  );
}
