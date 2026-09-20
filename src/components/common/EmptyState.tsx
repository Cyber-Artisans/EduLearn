import type { IconType } from 'react-icons'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: IconType
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-base-200 text-base-content/50">
        <Icon className="h-7 w-7" />
      </span>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-sm text-base-content/60">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}