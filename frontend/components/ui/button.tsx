import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border border-transparent rounded-lg text-sm font-[450] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-offset-[#0A0A0A]",
  {
    variants: {
      variant: {
        default: "bg-navy-600 text-white shadow-lg shadow-navy-600/25 hover:bg-navy-700",
        secondary: "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200",
        outline: "border border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10",
        ghost: "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-7",
        /* Hero call-to-action: Antigravity's pill metrics — 17.5/25.38 type with
           10px × 24px padding and a 1px border land on a 47.4px tall pill. */
        cta:
          "rounded-full px-6 py-2.5 text-[17.5px] leading-[25.38px] tracking-[0.18px] " +
          "max-[1024px]:text-[15px] max-[1024px]:leading-[22px] max-[1024px]:tracking-[0.16px]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
