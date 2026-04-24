import type { AdoptionStatus } from '../../types/adoption'
import { StatusBadge, type StatusBadgeColor } from './StatusBadge'

interface AdoptionStatusBadgeProps {
  status: AdoptionStatus | string
}

const STATUS_CONFIG: Record<string, {
  label: string
  color: StatusBadgeColor
  tooltip: string
}> = {
  ESCROW_CREATED: {
    label: 'Escrow Created',
    color: 'gray',
    tooltip: 'Escrow has been created but not funded yet.',
  },
  ESCROW_FUNDED: {
    label: 'Escrow Funded',
    color: 'teal',
    tooltip: 'Funds have been deposited into escrow.',
  },
  SETTLEMENT_TRIGGERED: {
    label: 'Settlement Triggered',
    color: 'amber',
    tooltip: 'Settlement process has started.',
  },
  CUSTODY_ACTIVE: {
    label: 'Custody Active',
    color: 'green',
    tooltip: 'Pet custody is currently active.',
  },
  FUNDS_RELEASED: {
    label: 'Funds Released',
    color: 'green',
    tooltip: 'Funds have been released successfully.',
  },
  COMPLETED: {
    label: 'Completed',
    color: 'green',
    tooltip: 'The adoption lifecycle has been completed.',
  },
  CANCELLED: {
    label: 'Cancelled',
    color: 'gray',
    tooltip: 'The adoption was cancelled before completion.',
  },
  DISPUTED: {
    label: 'Disputed',
    color: 'red',
    tooltip: 'There is a dispute in the adoption.',
  },
  NOT_FOUND: {
    label: 'Not Found',
    color: 'gray',
    tooltip: 'Unknown adoption status.',
  },
}

export function AdoptionStatusBadge({ status }: AdoptionStatusBadgeProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.NOT_FOUND

  return <StatusBadge color={config.color} label={config.label} tooltip={config.tooltip} />
}
