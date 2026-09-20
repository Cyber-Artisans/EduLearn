import type { IconType } from 'react-icons'

interface InstructorStatCardProps {
  icon: IconType
  label: string
  value: string | number
  hint?: string
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'info'
}

const colorClasses = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  accent: 'bg-accent/10 text-accent',
  success: 'bg-success/10 text-success',
  info: 'bg-info/10 text-info',
} as const

export function InstructorStatCard({
  icon: Icon,
  label,
  value,
  hint,
  color = 'primary',
}: InstructorStatCardProps) {
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
        {hint && <p className="mt-1 text-xs text-base-content/60">{hint}</p>}
      </div>
    </div>
  )
}