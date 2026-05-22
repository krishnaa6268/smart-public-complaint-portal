"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getComplaints,
  deleteComplaint,
  updateComplaint,
} from "@/lib/complaints";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import {
  categories,
  formatDate,
  statusColor,
  statusOrder,
} from "@/utils/format";
import { Complaint } from "@/types/complaint";
import { ChevronDown, Eye, Pencil, Trash, LogOut, Search } from "lucide-react";

const statusOptions = statusOrder;

export default function AdminDashboardPage() {
  const auth = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | string>("");
  const [categoryFilter, setCategoryFilter] = useState<"" | string>("");
  const [remark, setRemark] = useState("");
  const [selected, setSelected] = useState<Complaint | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.isAdmin) {
      router.push("/admin/login");
      return;
    }
    setComplaints(getComplaints());
  }, [auth.isAdmin, router]);

  const filteredComplaints = useMemo(() => {
    return complaints.filter((item) => {
      const query = search.trim().toLowerCase();
      const matchesSearch = query
        ? item.reference.toLowerCase().includes(query) ||
          item.fullName.toLowerCase().includes(query) ||
          item.title.toLowerCase().includes(query)
        : true;
      const matchesStatus = statusFilter ? item.status === statusFilter : true;
      const matchesCategory = categoryFilter
        ? item.category === categoryFilter
        : true;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [complaints, search, statusFilter, categoryFilter]);

  const total = complaints.length;
  const pending = complaints.filter(
    (item) => item.status !== "Resolved" && item.status !== "Rejected",
  ).length;
  const resolved = complaints.filter(
    (item) => item.status === "Resolved",
  ).length;
  const today = complaints.filter(
    (item) =>
      new Date(item.createdAt).toDateString() === new Date().toDateString(),
  ).length;

  const handleStatusChange = (reference: string, status: string) => {
    const updated = updateComplaint(reference, {
      status: status as Complaint["status"],
      remarks: [`Status updated to ${status}.`],
    });
    if (updated) {
      setComplaints(getComplaints());
      toast.addToast({
        title: "Status updated",
        description: `Complaint ${reference} is now ${status}.`,
        variant: "success",
      });
    }
  };

  const handleRemarkSubmit = (complaint: Complaint) => {
    if (!remark.trim()) return;
    const updated = updateComplaint(complaint.reference, {
      remarks: [...complaint.remarks, remark.trim()],
    });
    if (updated) {
      setComplaints(getComplaints());
      setRemark("");
      toast.addToast({
        title: "Remark added",
        description: "The complaint history has been updated.",
        variant: "success",
      });
    }
  };

  const handleDelete = (reference: string) => {
    deleteComplaint(reference);
    setComplaints(getComplaints());
    toast.addToast({
      title: "Complaint deleted",
      description: "This entry has been removed from local storage.",
      variant: "info",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mb-8 flex flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950/95 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-700 dark:text-sky-300">
            Admin dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold">
            Manage citizen complaints
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Search, filter and update complaint statuses directly in
            LocalStorage.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
            onClick={() => {
              auth.logout();
              router.push("/");
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            Total complaints
          </p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">
            {total}
          </p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            Pending
          </p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">
            {pending}
          </p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            Resolved
          </p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">
            {resolved}
          </p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
            Today
          </p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">
            {today}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_0.45fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                Filter complaints
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Quickly locate complaints by status, category or reference.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name or reference"
                className="min-w-[200px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
                Status
              </label>
              <select
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="">All statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
                Category
              </label>
              <select
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
              >
                <option value="">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden items-end justify-end sm:flex">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total matched: {filteredComplaints.length}
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  <th className="px-4 py-3">Reference</th>
                  <th className="px-4 py-3">Citizen</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredComplaints.map((complaint) => (
                  <tr
                    key={complaint.reference}
                    className="hover:bg-slate-50 dark:hover:bg-slate-900/80"
                  >
                    <td className="px-4 py-4 font-medium text-slate-900 dark:text-slate-100">
                      {complaint.reference}
                    </td>
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                      {complaint.fullName}
                    </td>
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                      {complaint.category}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`${statusColor(complaint.status)} inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]`}
                      >
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                      {formatDate(complaint.createdAt)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-full bg-slate-100 px-3 py-2 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                          onClick={() => setSelected(complaint)}
                        >
                          <Eye className="mr-2 h-4 w-4" /> View
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-full bg-sky-600 px-3 py-2 text-white transition hover:bg-sky-700"
                          onClick={() =>
                            handleStatusChange(
                              complaint.reference,
                              statusOptions[
                                (statusOptions.indexOf(complaint.status) + 1) %
                                  statusOptions.length
                              ],
                            )
                          }
                        >
                          <Pencil className="mr-2 h-4 w-4" /> Next
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-full bg-rose-600 px-3 py-2 text-white transition hover:bg-rose-700"
                          onClick={() => handleDelete(complaint.reference)}
                        >
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredComplaints.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                    >
                      No complaints match the selected filters.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="rounded-[2rem] bg-slate-950/95 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-sky-300">
              Active complaint
            </p>
            {selected ? (
              <div className="mt-6 space-y-4 text-sm text-slate-300">
                <div className="space-y-2 rounded-3xl bg-slate-900/95 p-4">
                  <p className="font-semibold text-white">{selected.title}</p>
                  <p>{selected.description}</p>
                </div>
                <div className="grid gap-3 rounded-3xl bg-slate-900/95 p-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      Reference
                    </p>
                    <p className="mt-1 font-semibold text-white">
                      {selected.reference}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      Citizen
                    </p>
                    <p className="mt-1 text-white">{selected.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      Authority
                    </p>
                    <p className="mt-1 text-white">{selected.authority.name}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-full bg-slate-800 px-3 py-2 text-sm text-white transition hover:bg-slate-700"
                      onClick={() => setPreviewImage(selected.image || null)}
                    >
                      <Eye className="mr-2 h-4 w-4" /> View image
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-full bg-slate-800 px-3 py-2 text-sm text-white transition hover:bg-slate-700"
                      onClick={() => setSelected(null)}
                    >
                      <ChevronDown className="mr-2 h-4 w-4" /> Clear
                    </button>
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-900/95 p-4">
                  <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-slate-500">
                    Add remark
                  </label>
                  <input
                    value={remark}
                    onChange={(event) => setRemark(event.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    placeholder="Enter note for the citizen"
                  />
                  <button
                    type="button"
                    className="mt-3 w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
                    onClick={() => handleRemarkSubmit(selected)}
                  >
                    Add remark
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl bg-slate-900/95 p-6 text-sm text-slate-300">
                Select a complaint from the table to review details, add
                remarks, or preview attached images.
              </div>
            )}
          </div>

          <div className="rounded-[2rem] bg-slate-950/95 p-6 text-sm text-slate-300">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Admin help
            </p>
            <p className="mt-3 leading-7">
              Use this dashboard to keep the portal current. Status changes and
              remarks update instantly in browser storage for this demo version.
            </p>
          </div>
        </aside>
      </div>

      {previewImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="relative max-h-full w-full max-w-3xl overflow-hidden rounded-[2rem] border border-slate-700 bg-slate-950 p-4 shadow-2xl">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute right-4 top-4 rounded-full bg-slate-900 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
            >
              Close
            </button>
            <img
              src={previewImage}
              alt="Complaint attachment"
              className="max-h-[80vh] w-full rounded-[1.5rem] object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
