import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "solid";
}

export function Card({ className, variant = "glass", ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-[2rem] border border-white/10 bg-white/70 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl transition dark:border-slate-700/80 dark:bg-slate-950/80",
        variant === "solid" && "bg-slate-950/95 dark:bg-slate-900/95",
        className,
      )}
      {...props}
    />
  );
}
