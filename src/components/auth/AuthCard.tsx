import type { ReactNode } from 'react'

interface AuthCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body p-8">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-sm text-base-content/60">{subtitle}</p>
          )}
        </header>
        {children}
        {footer && (
          <div className="mt-6 border-t border-base-300 pt-5 text-center text-sm">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}