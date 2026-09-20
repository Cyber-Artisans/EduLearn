import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiBookOpen, FiSearch } from 'react-icons/fi'
import { EmptyState } from '../../components/common/EmptyState'
import { CourseCard } from '../../components/course/CourseCard'
import {
  useDashboardStats,
  type EnrolledCourse,
} from '../../hooks/useDashboardStats'

type Tab = 'all' | 'in-progress' | 'completed' | 'not-started'
type SortKey = 'recent' | 'alpha' | 'progress'

const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
  { key: 'not-started', label: 'Not Started' },
]

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'recent', label: 'Recently enrolled' },
  { key: 'alpha', label: 'A–Z' },
  { key: 'progress', label: 'Progress %' },
]

export default function MyCoursesPage() {
  const { enrolled, inProgress, completed } = useDashboardStats()

  const [tab, setTab] = useState<Tab>('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('recent')

  const notStarted = useMemo(
    () => enrolled.filter((i) => !i.isComplete && i.percent === 0),
    [enrolled],
  )

  const counts: Record<Tab, number> = {
    all: enrolled.length,
    'in-progress': inProgress.length,
    completed: completed.length,
    'not-started': notStarted.length,
  }

  const filtered = useMemo(() => {
    const base: EnrolledCourse[] =
      tab === 'all'
        ? enrolled
        : tab === 'in-progress'
          ? inProgress
          : tab === 'completed'
            ? completed
            : notStarted

    const q = query.trim().toLowerCase()
    const searched = q
      ? base.filter(
          (i) =>
            i.course.title.toLowerCase().includes(q) ||
            i.course.instructorName.toLowerCase().includes(q) ||
            i.course.categoryName.toLowerCase().includes(q),
        )
      : base

    return [...searched].sort((a, b) => {
      switch (sort) {
        case 'alpha':
          return a.course.title.localeCompare(b.course.title)
        case 'progress':
          return b.percent - a.percent
        case 'recent':
        default:
          return (
            new Date(b.enrollment.enrolledAt).getTime() -
            new Date(a.enrollment.enrolledAt).getTime()
          )
      }
    })
  }, [tab, enrolled, inProgress, completed, notStarted, query, sort])

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            My Courses
          </h1>
          <p className="mt-2 text-base-content/60">
            {enrolled.length > 0
              ? `${enrolled.length} ${
                  enrolled.length === 1 ? 'course' : 'courses'
                } in your library.`
              : 'Your enrolled courses will appear here.'}
          </p>
        </div>
        <Link to="/courses" className="btn btn-outline">
          Browse catalog
        </Link>
      </header>

      {enrolled.length === 0 ? (
        <EmptyState
          icon={FiBookOpen}
          title="You haven't enrolled in any courses yet"
          description="Find something that interests you and start learning today."
          action={
            <Link to="/courses" className="btn btn-primary">
              Explore Courses
            </Link>
          }
        />
      ) : (
        <>
          {/* Tabs */}
          <div
            role="tablist"
            className="tabs tabs-boxed w-fit max-w-full overflow-x-auto"
          >
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                type="button"
                aria-selected={tab === t.key}
                className={`tab whitespace-nowrap ${
                  tab === t.key ? 'tab-active' : ''
                }`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
                <span className="ml-2 badge badge-sm badge-ghost">
                  {counts[t.key]}
                </span>
              </button>
            ))}
          </div>

          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="flex-1 relative">
              <span className="sr-only">Search my courses</span>
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, instructor, or category…"
                className="input input-bordered w-full pl-9"
              />
            </label>

            <label className="flex items-center gap-2">
              <span className="text-sm text-base-content/60 hidden sm:inline">
                Sort by:
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="select select-bordered select-sm w-full max-w-48"
                aria-label="Sort my courses"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <EmptyState
              icon={FiSearch}
              title="No matching courses"
              description="Try a different search or switch tabs."
            />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((item) => (
                <CourseCard key={item.course.id} course={item.course} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}