"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const success = await auth.login(email.trim(), password);
    setLoading(false);
    if (success) {
      toast.addToast({
        title: "Welcome back",
        description: "Admin login successful.",
        variant: "success",
      });
      router.push("/admin/dashboard");
    } else {
      setError("Incorrect admin credentials. Please try again.");
      toast.addToast({
        title: "Login failed",
        description: "Email or password did not match.",
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950/90 p-10 shadow-2xl shadow-slate-900/50 backdrop-blur-xl">
        <div className="mb-8 space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">
            Secure admin access
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            Smart Public Complaint Portal
          </h1>
          <p className="text-sm leading-6 text-slate-300">
            Login to manage complaints, update statuses, and coordinate city
            responses.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Admin Email
            </label>
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="admin@gmail.com"
              className="bg-slate-900/90 text-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Password</label>
            <Input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="admin123"
              className="bg-slate-900/90 text-white"
            />
          </div>
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          <Button
            type="submit"
            className="w-full"
            variant="primary"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-400">
          Use temporary credentials for this demo.{" "}
          <Link href="/" className="text-sky-300 underline">
            Return to portal
          </Link>
        </div>
      </div>
    </div>
  );
}
