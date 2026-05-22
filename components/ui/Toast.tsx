"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export function ToastViewport() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed right-4 top-4 z-50 flex min-w-[280px] flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.96 }}
            className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-4 shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950/95"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {toast.title}
                </p>
                {toast.description ? (
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {toast.description}
                  </p>
                ) : null}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                aria-label="Dismiss notification"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
