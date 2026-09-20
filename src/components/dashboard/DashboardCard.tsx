import type { IconType } from 'react-icons'
import type { ReactNode } from 'react'

interface DashboardCardProps {
  icon: IconType
  label: string
  value: string | number
  hint?: string
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning'
  action?: ReactNode
}

const colorClasses: Record<
  NonNullable<DashboardCardProps['color']>,
  string
> = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  accent: 'bg-accent/10 text-accent',
  success: 'bg-success/10 text-success',
  info: 'bg-info/10 text-info',
  warning: 'bg-warning/10 text-warning',
}

export function DashboardCard({
  icon: Icon,
  label,
  value,
  hint,
  color = 'primary',
  action,
}: DashboardCardProps) {
  return (
    <div className="card-edulearn flex items-start gap-4">
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colorClasses[color]}`}
      >
        <Icon className="h-6 w-6" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-base-content/60">{label}</p>
        <p className="mt-1 text-2xl font-extrabold tracking-tight">{value}</p>
        {hint && (
          <p className="mt-1 text-xs text-base-content/60">{hint}</p>
        )}
        {action && <div className="mt-3">{action}</div>}
      </div>
    </div>
  )
}