import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  asLink?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  asLink,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 cursor-pointer";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-dark active:scale-[0.97] shadow-sm hover:shadow-md",
    secondary:
      "bg-white text-primary border-2 border-primary hover:bg-primary-50 active:scale-[0.97]",
  };

  const sizes = {
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (asLink) {
    return (
      <a href={asLink} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
