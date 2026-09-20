import { FiUserPlus } from 'react-icons/fi'
import type { RecentEnrollment } from '../../hooks/useInstructorStats'

interface RecentEnrollmentsListProps {
  items: RecentEnrollment[]
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.round(diff / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.round(days / 7)
  if (weeks < 4) return `${weeks}w ago`
  return new Date(iso).toLocaleDateString()
}

export function RecentEnrollmentsList({ items }: RecentEnrollmentsListProps) {
  if (items.length === 0) {
    return (
      <section className="card-edulearn">
        <h2 className="text-lg font-bold mb-4">Recent Enrollments</h2>
        <p className="text-sm text-base-content/60">
          Student enrollments will appear here once your course is published.
        </p>
      </section>
    )
  }

  return (
    <section className="card-edulearn">
      <h2 className="text-lg font-bold mb-5">Recent Enrollments</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.enrollment.id}
            className="flex items-center gap-3 rounded-xl p-2 hover:bg-base-200 transition-colors"
          >
            <span className="relative">
              <img
                src={item.studentAvatar}
                alt=""
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-success text-success-content ring-2 ring-base-100">
                <FiUserPlus className="h-3 w-3" />
              </span>
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">
                {item.studentName}
              </p>
              <p className="text-xs text-base-content/60 truncate">
                enrolled in <span className="font-medium">{item.courseTitle}</span>
              </p>
            </div>
            <span className="text-xs text-base-content/50 shrink-0">
              {formatRelative(item.at)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}