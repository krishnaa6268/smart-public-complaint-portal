"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { ToastViewport } from "@/components/ui/Toast";
import { useDarkMode } from "@/hooks/useDarkMode";

export function Providers({ children }: { children: React.ReactNode }) {
  useDarkMode();

  return (
    <AuthProvider>
      <ToastProvider>
        {children}
        <ToastViewport />
      </ToastProvider>
    </AuthProvider>
  );
}
