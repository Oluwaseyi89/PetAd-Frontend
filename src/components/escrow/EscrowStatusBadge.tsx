
import { STATUS_META, type EscrowStatusBadgeProps } from "./escrowBadgeConstants";
import { StatusBadge } from "../ui/StatusBadge";

export function EscrowStatusBadge({ status }: EscrowStatusBadgeProps) {
  const meta = STATUS_META[status];

  return (
    <StatusBadge
      color={meta.color}
      label={meta.label}
      data-testid="escrow-status-badge"
    />
  );
}
