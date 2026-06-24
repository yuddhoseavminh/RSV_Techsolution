import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-32 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm text-slate-950 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
