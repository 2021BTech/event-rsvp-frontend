import type { ButtonHTMLAttributes, ReactNode } from "react";
import Spinner from "./Spinner";
import { cn } from "../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  className?: string;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-primary hover:bg-secondary focus:bg-primary focus:ring-secondary text-white",
  secondary:
    "bg-secondary hover:bg-primary focus:bg-primary text-white",
  danger:
    "bg-accent hover:bg-primary focus:bg-accent focus:ring-primary text-white",
};

const Button = ({
  children,
  variant = "primary",
  icon,
  iconPosition = "left",
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={isLoading || disabled}
      {...props}
      className={cn(
        `flex items-center justify-center gap-2 w-full px-4 py-2 tracking-wide transition-colors duration-200
         rounded-md focus:outline-none focus:ring focus:ring-opacity-50 disabled:opacity-60 disabled:cursor-not-allowed`,
        variantStyles[variant],
        className
      )}
    >
      {isLoading ? (
        <Spinner size={20} />
      ) : (
        <>
          {icon && iconPosition === "left" && <span>{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === "right" && <span>{icon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
