"use client";

import { useState } from "react";
import { findComplaintByReference } from "@/lib/complaints";
import { Timeline } from "@/components/Timeline";
import { formatDate } from "@/utils/format";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";

export default function TrackPage() {
  const [reference, setReference] = useState("");
  const [complaint, setComplaint] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = findComplaintByReference(reference.trim().toUpperCase());
    setComplaint(found || null);
    setNotFound(!found);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-10 sm:px-6 lg:px-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-950/90">
          <div className="space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700 dark:text-sky-300">
              Complaint tracker
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Track the status of your registered complaint
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Enter your complaint reference number to see the submission date,
              assigned authority and timeline progress.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="mt-10 grid gap-4 sm:grid-cols-[1fr_auto]"
          >
            <Input
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              placeholder="Enter reference number e.g. CMP-2026-48392"
            />
            <Button type="submit" className="min-w-[170px]" variant="primary">
              <Search size={16} /> Search
            </Button>
          </form>

          {notFound ? (
            <div className="mt-12 rounded-[2rem] border border-rose-100 bg-rose-50/80 p-8 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/80 dark:text-rose-200">
              <h2 className="text-xl font-semibold">Reference not found</h2>
              <p className="mt-2 text-sm text-rose-700 dark:text-rose-200">
                Please make sure the reference is correct and try again.
              </p>
            </div>
          ) : null}

          {complaint ? (
            <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_0.7fr]">
              <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-50/90 p-8 shadow-sm dark:border-slate-700 dark:bg-slate-950/90">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                      Reference
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                      {complaint.reference}
                    </p>
                  </div>
                  <StatusBadge status={complaint.status} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                      Submitted
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                      {formatDate(complaint.createdAt)}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                      Category
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                      {complaint.category}
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                    Complaint
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
                    {complaint.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {complaint.description}
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                    Assigned authority
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {complaint.authority.name}
                  </p>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    {complaint.authority.office}
                  </p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {complaint.authority.phone}
                  </p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Estimated resolution: {complaint.authority.eta}
                  </p>
                </div>

                {complaint.remarks?.length ? (
                  <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                      Latest remarks
                    </p>
                    <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                      {complaint.remarks.map(
                        (remark: string, index: number) => (
                          <li
                            key={index}
                            className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/70"
                          >
                            {remark}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-sm dark:border-slate-700 dark:bg-slate-950/90">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                  Timeline
                </p>
                <div className="mt-6">
                  <Timeline currentStatus={complaint.status} />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
