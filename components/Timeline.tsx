import { motion } from "framer-motion";
import { statusOrder } from "@/utils/format";
import { ComplaintStatus } from "@/types/complaint";

const statusLabel = (status: ComplaintStatus) => {
  switch (status) {
    case "Submitted":
      return "Submission received";
    case "Under Review":
      return "Review in progress";
    case "In Progress":
      return "Action underway";
    case "Resolved":
      return "Complaint resolved";
    case "Rejected":
      return "Complaint rejected";
    default:
      return "Pending";
  }
};

export function Timeline({
  currentStatus,
}: {
  currentStatus: ComplaintStatus;
}) {
  return (
    <div className="space-y-6">
      {statusOrder.map((status) => {
        const active =
          statusOrder.indexOf(status) <= statusOrder.indexOf(currentStatus);
        return (
          <div key={status} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition ${
                  active
                    ? "border-sky-500 bg-sky-500"
                    : "border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950"
                }`}
              />
              {status !== "Rejected" && (
                <span className="mt-1 h-full w-px bg-slate-200 dark:bg-slate-800" />
              )}
            </div>
            <motion.div
              whileHover={{ x: 6 }}
              className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950/80"
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {status}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {statusLabel(status)}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
