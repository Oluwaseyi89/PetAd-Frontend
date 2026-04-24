import type { EscrowStatus } from "./types";
import type { StatusBadgeColor } from "../ui/StatusBadge";

export interface EscrowStatusBadgeProps {
  status: EscrowStatus;
}

export const STATUS_META: Record<
  EscrowStatus,
  { label: string; color: StatusBadgeColor }
> = {
  AWAITING_FUNDS: {
    label: "Awaiting Funds",
    color: "amber",
  },
  FUNDED: {
    label: "Funded",
    color: "blue",
  },
  IN_REVIEW: {
    label: "In Review",
    color: "teal",
  },
  DISPUTED: {
    label: "Disputed",
    color: "red",
  },
  SETTLED: {
    label: "Settled",
    color: "green",
  },
  SETTLEMENT_FAILED: {
    label: "Settlement Failed",
    color: "red",
  },
};
