import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-navy-600 focus:ring-2 focus:ring-navy-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-navy-400/25",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
