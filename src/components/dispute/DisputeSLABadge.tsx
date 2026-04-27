import { AlertCircle, CheckCircle2 } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";

interface DisputeSLABadgeProps {
  isOverdue: boolean;
}

export function DisputeSLABadge({ isOverdue }: DisputeSLABadgeProps) {
  if (isOverdue) {
    return (
      <StatusBadge
        color="red"
        label="SLA Breached"
        pulse
        icon={<AlertCircle className="w-3.5 h-3.5" />}
        data-testid="dispute-sla-badge"
      />
    );
  }

  return (
    <StatusBadge
      color="green"
      label="Within SLA"
      icon={<CheckCircle2 className="w-3.5 h-3.5" />}
      data-testid="dispute-sla-badge"
    />
  );
}
