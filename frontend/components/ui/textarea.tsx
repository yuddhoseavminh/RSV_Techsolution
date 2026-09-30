import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-32 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-950 outline-none transition focus:border-navy-600 focus:ring-2 focus:ring-navy-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-navy-400/25",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
