import * as React from "react";
import { cn } from "@/lib/utils";

export type CalloutTone = "error" | "success" | "warning" | "info";

const tones: Record<CalloutTone, string> = {
  error: "border-red-200 bg-red-50 text-red-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  info: "border-navy-200 bg-navy-50 text-navy-700"
};

type CalloutProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: CalloutTone;
};

export function Callout({ tone = "error", className, children, ...props }: CalloutProps) {
  // Every call site binds nullable state (`{error}`, `{message}`) — render
  // nothing rather than an empty tinted bar when there is no message yet.
  if (!children) return null;

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn("mb-4 rounded-xl border p-3 text-sm", tones[tone], className)}
      {...props}
    >
      {children}
    </div>
  );
}
