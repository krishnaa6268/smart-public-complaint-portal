import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-sky-600 text-white hover:bg-sky-700",
        variant === "secondary" &&
          "bg-white/10 text-slate-900 dark:bg-slate-800 dark:text-white hover:bg-white/20",
        variant === "ghost" &&
          "bg-transparent text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
        className,
      )}
      {...props}
    />
  );
}
