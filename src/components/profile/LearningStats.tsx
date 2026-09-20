import { FiBookOpen, FiCheckCircle, FiClock, FiAward } from 'react-icons/fi'
import {
  useDashboardStats,
  formatLearningTime,
} from '../../hooks/useDashboardStats'

export function LearningStats() {
  const stats = useDashboardStats()

  const items = [
    {
      icon: FiBookOpen,
      label: 'Enrolled',
      value: stats.enrolledCount,
      color: 'text-primary',
    },
    {
      icon: FiCheckCircle,
      label: 'Completed',
      value: stats.completedCount,
      color: 'text-success',
    },
    {
      icon: FiClock,
      label: 'Learning time',
      value: formatLearningTime(stats.totalLearningMinutes),
      color: 'text-info',
    },
    {
      icon: FiAward,
      label: 'Certificates',
      value: stats.certificatesCount,
      color: 'text-accent',
    },
  ]

  return (
    <section className="card-edulearn">
      <h2 className="text-lg font-bold mb-5">Learning statistics</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="text-center">
            <span
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-base-200 ${color}`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-2 text-xl font-extrabold">{value}</p>
            <p className="text-xs text-base-content/60">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}