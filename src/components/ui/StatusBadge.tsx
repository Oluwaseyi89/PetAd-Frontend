import type { HTMLAttributes, ReactNode } from "react";

export type StatusBadgeColor =
  | "gray"
  | "blue"
  | "teal"
  | "green"
  | "amber"
  | "red";

type StatusBadgeSpanProps = Omit<HTMLAttributes<HTMLSpanElement>, "color">;

interface StatusBadgeProps extends StatusBadgeSpanProps {
  color: StatusBadgeColor;
  label: string;
  tooltip?: string;
  pulse?: boolean;
  icon?: ReactNode;
}

export function StatusBadge({
  color,
  label,
  tooltip,
  pulse = false,
  icon,
  className,
  ...spanProps
}: StatusBadgeProps) {
  const badgeClassName = [
    "status-badge",
    `status-badge--${color}`,
    pulse ? "status-badge--pulse" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const badge = (
    <span className={badgeClassName} {...spanProps}>
      {icon ? <span className="status-badge__icon">{icon}</span> : null}
      <span>{label}</span>
    </span>
  );

  if (!tooltip) {
    return badge;
  }

  return (
    <div className="group relative inline-flex">
      {badge}
      <div className="status-badge__tooltip-wrapper">
        <div className="status-badge__tooltip">{tooltip}</div>
      </div>
    </div>
  );
}
