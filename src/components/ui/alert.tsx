import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "flex items-center gap-2 p-3 text-sm rounded-lg border",
  {
    variants: {
      variant: {
        default: "bg-gray-50 text-gray-600 border-gray-200",
        error: "bg-red-50 text-red-600 border-red-200",
        success: "bg-green-50 text-green-600 border-green-200",
        warning: "bg-yellow-50 text-yellow-600 border-yellow-200",
        info: "bg-blue-50 text-blue-600 border-blue-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="flex-1">{children}</span>
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert };
