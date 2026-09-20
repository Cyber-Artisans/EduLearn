import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  action?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  action,
}: SectionHeadingProps) {
  const alignment =
    align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div
      className={`flex flex-col gap-3 mb-12 ${alignment} ${
        action ? 'sm:flex-row sm:justify-between sm:items-end' : ''
      }`}
    >
      <div className={`flex flex-col gap-3 ${alignment}`}>
        {eyebrow && (
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight max-w-2xl">
          {title}
        </h2>
        {description && (
          <p className="text-base-content/70 max-w-2xl">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}