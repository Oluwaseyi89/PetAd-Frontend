import type { UserRole } from '../../types/auth'

interface RoleBadgeProps {
  role: UserRole
}

const ROLE_CONFIG: Record<UserRole, { label: string; textClass: string; bgClass: string }> = {
  ADMIN: {
    label: 'ADMIN',
    textClass: 'text-purple-700',
    bgClass: 'bg-purple-100',
  },
  SHELTER: {
    label: 'SHELTER',
    textClass: 'text-teal-700',
    bgClass: 'bg-teal-100',
  },
  USER: {
    label: 'USER',
    textClass: 'text-gray-700',
    bgClass: 'bg-gray-100',
  },
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const config = ROLE_CONFIG[role]

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.bgClass} ${config.textClass}`}
    >
      {config.label}
    </span>
  )
}
