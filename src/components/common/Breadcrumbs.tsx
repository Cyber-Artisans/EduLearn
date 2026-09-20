import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

export interface Crumb {
  label: string
  to?: string
}

interface BreadcrumbsProps {
  items: Crumb[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex items-center gap-1 flex-wrap">
        {items.map((crumb, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${crumb.label}-${i}`} className="flex items-center gap-1">
              {crumb.to && !last ? (
                <Link
                  to={crumb.to}
                  className="text-base-content/60 hover:text-primary transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={
                    last
                      ? 'font-semibold text-base-content'
                      : 'text-base-content/60'
                  }
                  aria-current={last ? 'page' : undefined}
                >
                  {crumb.label}
                </span>
              )}
              {!last && (
                <FiChevronRight className="h-3.5 w-3.5 text-base-content/40" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}