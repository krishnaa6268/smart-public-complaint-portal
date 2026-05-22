import { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="border-b border-slate-200 bg-white/90 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <Link
              href="/"
              className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700 dark:text-sky-300"
            >
              Smart Public Complaint Portal
            </Link>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Secure admin access for city services.
          </div>
        </div>
      </div>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
