import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiBookOpen } from 'react-icons/fi'
import { CourseCard } from '../course/CourseCard'
import { EmptyState } from '../common/EmptyState'
import type { EnrolledCourse } from '../../hooks/useDashboardStats'

type Tab = 'all' | 'in-progress' | 'completed'

interface MyCoursesTabsProps {
  all: EnrolledCourse[]
  inProgress: EnrolledCourse[]
  completed: EnrolledCourse[]
}

export function MyCoursesTabs({ all, inProgress, completed }: MyCoursesTabsProps) {
  const [tab, setTab] = useState<Tab>('all')

  const lists: Record<Tab, EnrolledCourse[]> = {
    all,
    'in-progress': inProgress,
    completed,
  }
  const current = lists[tab]

  const tabLabels: Record<Tab, string> = {
    all: `All (${all.length})`,
    'in-progress': `In Progress (${inProgress.length})`,
    completed: `Completed (${completed.length})`,
  }

  return (
    <section>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <h2 className="text-2xl font-bold">My Courses</h2>
        <div role="tablist" className="tabs tabs-boxed">
          {(Object.keys(tabLabels) as Tab[]).map((key) => (
            <button
              key={key}
              role="tab"
              type="button"
              className={`tab ${tab === key ? 'tab-active' : ''}`}
              onClick={() => setTab(key)}
              aria-selected={tab === key}
            >
              {tabLabels[key]}
            </button>
          ))}
        </div>
      </div>

      {current.length === 0 ? (
        <EmptyState
          icon={FiBookOpen}
          title={
            tab === 'completed'
              ? 'No completed courses yet'
              : tab === 'in-progress'
                ? 'No courses in progress'
                : 'No enrolled courses yet'
          }
          description="Browse the catalog and enroll in your first course to get started."
          action={
            <Link to="/courses" className="btn btn-primary">
              Explore Courses
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {current.map((item) => (
            <CourseCard key={item.course.id} course={item.course} />
          ))}
        </div>
      )}
    </section>
  )
}