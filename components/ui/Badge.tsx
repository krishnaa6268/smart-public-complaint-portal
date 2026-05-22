import clsx from "clsx";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "info" | "success" | "warning" | "danger" | "ghost";
}

export function Badge({ className, variant = "info", ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
        variant === "info" &&
          "bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-200",
        variant === "success" &&
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200",
        variant === "warning" &&
          "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-200",
        variant === "danger" &&
          "bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-200",
        variant === "ghost" &&
          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
        className,
      )}
      {...props}
    />
  );
}
