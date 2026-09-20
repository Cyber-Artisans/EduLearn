import { FiBookOpen, FiCheckCircle, FiClock, FiAward } from 'react-icons/fi'
import { DashboardCard } from '../../components/dashboard/DashboardCard'
import { ContinueLearningCard } from '../../components/dashboard/ContinueLearningCard'
import { MyCoursesTabs } from '../../components/dashboard/MyCoursesTabs'
import { ActivityFeed } from '../../components/dashboard/ActivityFeed'
import { DashboardEmpty } from '../../components/dashboard/DashboardEmpty'
import { useAuth } from '../../hooks/useAuth'
import {
  useDashboardStats,
  formatLearningTime,
} from '../../hooks/useDashboardStats'

export default function DashboardPage() {
  const { user } = useAuth()
  const stats = useDashboardStats()

  const firstName = user?.name.split(' ')[0] ?? 'there'

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Welcome back, {firstName}
        </h1>
        <p className="text-base-content/60">
          Here's a snapshot of your learning progress.
        </p>
      </header>

      {stats.enrolledCount === 0 ? (
        <DashboardEmpty />
      ) : (
        <>
          {/* Overview cards */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <DashboardCard
              icon={FiBookOpen}
              label="Enrolled Courses"
              value={stats.enrolledCount}
              color="primary"
              hint={
                stats.inProgressCount > 0
                  ? `${stats.inProgressCount} in progress`
                  : 'Get started today'
              }
            />
            <DashboardCard
              icon={FiCheckCircle}
              label="Courses Completed"
              value={stats.completedCount}
              color="success"
              hint={
                stats.completedCount === stats.enrolledCount &&
                stats.enrolledCount > 0
                  ? 'All done — nice work!'
                  : `${stats.enrolledCount - stats.completedCount} remaining`
              }
            />
            <DashboardCard
              icon={FiClock}
              label="Learning Hours"
              value={formatLearningTime(stats.totalLearningMinutes)}
              color="info"
              hint="Time spent in lessons"
            />
            <DashboardCard
              icon={FiAward}
              label="Certificates"
              value={stats.certificatesCount}
              color="accent"
              hint={
                stats.certificatesCount > 0
                  ? 'View in Certificates'
                  : 'Complete a course to earn one'
              }
            />
          </section>

          {/* Continue Learning */}
          {stats.enrolled.filter((i) => !i.isComplete).length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold">Continue Learning</h2>
              </div>
              <div className="-mx-4 px-4 overflow-x-auto pb-2">
                <div className="flex gap-5 snap-x snap-mandatory">
                  {stats.enrolled
                    .filter((i) => !i.isComplete)
                    .slice(0, 6)
                    .map((item) => (
                      <ContinueLearningCard
                        key={item.course.id}
                        item={item}
                      />
                    ))}
                </div>
              </div>
            </section>
          )}

          {/* Two-column: My Courses + Activity */}
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <MyCoursesTabs
              all={stats.enrolled}
              inProgress={stats.inProgress}
              completed={stats.completed}
            />

            <div className="space-y-6">
              <ActivityFeed />
            </div>
          </div>
        </>
      )}
    </div>
  )
}