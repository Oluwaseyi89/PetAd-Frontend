import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DisputeStatusBadge } from "../DisputeStatusBadge";
import { DisputeSLABadge } from "../DisputeSLABadge";

describe("DisputeStatusBadge", () => {
  const cases = [
    { status: "open", label: "Open", variantClass: "status-badge--amber" },
    { status: "under_review", label: "Under Review", variantClass: "status-badge--blue" },
    { status: "resolved", label: "Resolved", variantClass: "status-badge--green" },
    { status: "closed", label: "Closed", variantClass: "status-badge--gray" },
  ] as const;

  it.each(cases)("renders $status with shared badge variant", ({ status, label, variantClass }) => {
    render(<DisputeStatusBadge status={status} />);

    const labelNode = screen.getByText(label);
    const pill = labelNode.closest(".status-badge") as HTMLElement | null;

    expect(pill).toBeTruthy();
    expect(pill?.className).toContain(variantClass);
  });
});

describe("DisputeSLABadge", () => {
  it("uses pulse variant when SLA is breached", () => {
    render(<DisputeSLABadge isOverdue />);

    const labelNode = screen.getByText("SLA Breached");
    const pill = labelNode.closest(".status-badge") as HTMLElement | null;

    expect(pill).toBeTruthy();
    expect(pill?.className).toContain("status-badge--red");
    expect(pill?.className).toContain("status-badge--pulse");
  });

  it("uses green variant when SLA is healthy", () => {
    render(<DisputeSLABadge isOverdue={false} />);

    const labelNode = screen.getByText("Within SLA");
    const pill = labelNode.closest(".status-badge") as HTMLElement | null;

    expect(pill).toBeTruthy();
    expect(pill?.className).toContain("status-badge--green");
  });
});
