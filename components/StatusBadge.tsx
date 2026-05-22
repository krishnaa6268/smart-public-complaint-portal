import { statusColor } from "@/utils/format";
import { ComplaintStatus } from "@/types/complaint";

export function StatusBadge({ status }: { status: ComplaintStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${statusColor(status)}`}
    >
      {status}
    </span>
  );
}
