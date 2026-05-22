"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Sparkles,
  UserSquare,
} from "lucide-react";

const features = [
  {
    title: "Transparent tracking",
    description:
      "Real-time status updates keep every submission visible from registration to resolution.",
    icon: Globe2,
  },
  {
    title: "Citizen-first service",
    description:
      "A secure digital portal for complaint registration across essential city services.",
    icon: UserSquare,
  },
  {
    title: "Trusted authorities",
    description:
      "Every request is assigned to a specialised unit with contact details and timelines.",
    icon: ShieldCheck,
  },
  {
    title: "Speedy resolution",
    description:
      "Structured workflows and reminders help the city teams resolve issues quickly.",
    icon: CheckCircle2,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-red-950 text-slate-900 dark:bg-[#020617] dark:text-slate-100">
      <header className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm shadow-slate-900/5 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100">
            <Sparkles className="h-4 w-4 text-sky-500" />
            Smart Public Complaint Portal
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
          <Link
            href="/register"
            className="rounded-full bg-slate-950 px-4 py-2 font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
          >
            Register Complaint
          </Link>
          <Link
            href="/track"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            Track Complaint
          </Link>
          <Link
            href="/admin/login"
            className="rounded-full border border-sky-200 px-4 py-2 text-sky-700 transition hover:bg-sky-50 dark:border-sky-500/30 dark:text-sky-300 dark:hover:bg-slate-900"
          >
            Admin Login
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-200 bg-sky-50/70 px-4 py-2 text-sm font-semibold text-sky-700 backdrop-blur dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200">
              Government Service | Smart City Helpdesk
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-base font-semibold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-300">
                  Public complaint portal
                </p>
                <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-[-0.04em] text-slate-950 dark:text-white sm:text-6xl">
                  Report issues, track progress, and stay informed with a secure
                  municipal portal.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  Smart Public Complaint Portal helps citizens submit complaints
                  for water, electricity, roads, safety, and more. Built for
                  transparency, ease of use, and rapid response.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-700"
                >
                  Register a Complaint <ArrowRight size={16} />
                </Link>
                <Link
                  href="/track"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
                >
                  Track Existing Complaint
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_50px_120px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-950/80"
          >
            <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-100/80 p-8 shadow-inner shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900/80">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                Quick action dashboard
              </p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200/60 dark:bg-slate-950 dark:shadow-slate-900/40">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Complaint registration
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Submit with photo evidence, category selection and contact
                    details.
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200/60 dark:bg-slate-950 dark:shadow-slate-900/40">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Real-time tracking
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Check status updates, assigned authority, and latest
                    remarks.
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200/60 dark:bg-slate-950 dark:shadow-slate-900/40">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Responsive support
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Optimised for mobile, tablet, and desktop complaints
                    submission.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-24 rounded-[2rem] border border-white/80 bg-white/75 p-10 shadow-xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-950/80">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700 dark:text-sky-300">
                Trusted public service
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                A civic complaint portal designed for clarity, accountability
                and rapid response.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                The portal brings together complaint registration, status
                tracking and authority coordination on one page for citizens and
                administrators.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500/10 text-sky-700 dark:text-sky-200">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-24 grid gap-12 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/80 bg-slate-950/95 p-10 text-white shadow-xl shadow-slate-900/20 dark:bg-slate-950/95">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
              Complaint tracking
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Follow status from submission to completion.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Enter your reference number on the tracking page to view the
              complaint timeline, assigned authority details and latest remarks.
            </p>
            <div className="mt-8 space-y-4 rounded-[2rem] bg-slate-950/90 p-6 ring-1 ring-slate-800/50">
              <div className="flex items-center justify-between rounded-3xl bg-slate-900/90 p-5">
                <span className="text-sm uppercase tracking-[0.2em] text-sky-300">
                  Reference
                </span>
                <span className="text-sm font-semibold text-white">
                  CMP-2026-48392
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/80 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Status
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    Under Review
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Assigned Unit
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    Public Works Department
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/80 bg-white/90 p-10 shadow-xl shadow-slate-900/10 backdrop-blur dark:border-slate-700/80 dark:bg-slate-950/80">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 dark:text-slate-300">
              Citizen support
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Support when you need it most.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              The portal is a demo version for public service that still feels
              like a real city complaint system.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900/80">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Localised response
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Complaints are routed to the right authority immediately.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900/80">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Clear timelines
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Each complaint shows a projected resolution timeframe.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24 rounded-[2rem] border border-slate-200 bg-white/90 p-10 shadow-xl shadow-slate-900/10 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr]">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700 dark:text-sky-300">
                About the portal
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                A demo system with a production-quality experience.
              </h2>
              <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
                Smart Public Complaint Portal simulates a municipality complaint
                service using local browser storage. It is fully responsive,
                accessible, and built for modern citizen engagement.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/80">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    No real database
                  </p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    All data persists in your browser using LocalStorage.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/80">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Secure admin access
                  </p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Temporary admin login protects the dashboard workflow.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] bg-slate-950/95 p-8 text-white shadow-[0_25px_80px_rgba(15,23,42,0.25)]">
              <p className="text-sm uppercase tracking-[0.24em] text-sky-300">
                Service overview
              </p>
              <div className="mt-8 grid gap-4">
                <div className="rounded-3xl bg-slate-900/85 p-5">
                  <p className="text-sm text-slate-400">
                    Complaint categories supported
                  </p>
                  <p className="mt-3 text-lg font-semibold">
                    Water, Electricity, Garbage, Roads, Internet, Corruption,
                    Safety
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-900/85 p-5">
                  <p className="text-sm text-slate-400">Citizen workflow</p>
                  <p className="mt-3 text-lg font-semibold">
                    Register, confirm, track, and receive updates from
                    authorities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
