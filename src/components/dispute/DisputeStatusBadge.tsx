import type { DisputeStatus } from "../../types/dispute";
import { StatusBadge, type StatusBadgeColor } from "../ui/StatusBadge";

const STATUS_META: Record<
  DisputeStatus,
  { label: string; color: StatusBadgeColor }
> = {
  open: {
    label: "Open",
    color: "amber",
  },
  under_review: {
    label: "Under Review",
    color: "blue",
  },
  resolved: {
    label: "Resolved",
    color: "green",
  },
  closed: {
    label: "Closed",
    color: "gray",
  },
};

interface DisputeStatusBadgeProps {
  status: DisputeStatus;
}

export function DisputeStatusBadge({ status }: DisputeStatusBadgeProps) {
  const meta = STATUS_META[status];

  return (
    <StatusBadge
      color={meta.color}
      label={meta.label}
      data-testid="dispute-status-badge"
    />
  );
}
