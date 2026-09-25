import { ButtonHTMLAttributes } from "react";

/**
 * Buttons — ui-design-doc section 5.1:
 * height 48px minimum, radius 12px, full-width on mobile,
 * purple hover → dark, loading spinner taaki double-click na ho.
 * Polish: press pe thoda scale + purple shadow (premium feel).
 */
export function buttonClasses(variant: "primary" | "secondary" = "primary"): string {
  const base =
    "inline-flex h-12 w-full items-center justify-center gap-2 rounded-btn px-6 text-[15px] font-semibold transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 sm:w-auto disabled:cursor-not-allowed disabled:scale-100 disabled:bg-disabled disabled:text-white disabled:shadow-none";
  return variant === "primary"
    ? `${base} bg-primary text-white shadow-btn hover:bg-primary-dark`
    : `${base} border border-primary bg-white text-primary hover:bg-primary/5`;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  loading?: boolean;
  loadingText?: string;
};

export default function Button({
  variant = "primary",
  loading = false,
  loadingText = "Processing...",
  className = "",
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${buttonClasses(variant)} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
        </svg>
      )}
      {loading ? loadingText : children}
    </button>
  );
}
